package waf

import (
	"strings"
	"sync"
	"sync/atomic"
	"time"
)

type RuleAction string

const (
	ActionAllow     RuleAction = "allow"
	ActionChallenge RuleAction = "challenge"
	ActionBlock     RuleAction = "block"
)

type FirewallMetrics struct {
	AllowedRequests    uint64
	ChallengedRequests uint64
	BlockedRequests    uint64
}

type Firewall struct {
	mu           sync.RWMutex
	blockedIPs   map[string]bool
	rateLimits   map[string]*clientRate
	metrics      FirewallMetrics
	maxPerMinute int
}

type clientRate struct {
	count     int
	resetTime time.Time
}

func NewFirewall(maxPerMinute int) *Firewall {
	return &Firewall{
		blockedIPs:   make(map[string]bool),
		rateLimits:   make(map[string]*clientRate),
		maxPerMinute: maxPerMinute,
	}
}

func (f *Firewall) BlockIP(ip string) {
	f.mu.Lock()
	defer f.mu.Unlock()
	f.blockedIPs[ip] = true
}

func (f *Firewall) EvaluateRequest(ip string, path string, userAgent string, body string) RuleAction {
	f.mu.Lock()
	defer f.mu.Unlock()

	// 1. IP Blacklist check
	if f.blockedIPs[ip] {
		atomic.AddUint64(&f.metrics.BlockedRequests, 1)
		return ActionBlock
	}

	// 2. WAF Injection and Malicious Pattern Signatures
	lowerBody := strings.ToLower(body)
	lowerPath := strings.ToLower(path)
	if strings.Contains(lowerBody, "' or 1=1") ||
		strings.Contains(lowerBody, "<script>") ||
		strings.Contains(lowerPath, "../") ||
		strings.Contains(lowerPath, "/etc/passwd") {
		atomic.AddUint64(&f.metrics.BlockedRequests, 1)
		return ActionBlock
	}

	// 3. Botnet User-Agent check
	lowerUA := strings.ToLower(userAgent)
	if strings.Contains(lowerUA, "sqlmap") || strings.Contains(lowerUA, "nikto") || strings.Contains(lowerUA, "masscan") {
		atomic.AddUint64(&f.metrics.BlockedRequests, 1)
		return ActionBlock
	}

	// 4. Rate Limiting Check
	now := time.Now()
	client, exists := f.rateLimits[ip]
	if !exists || now.After(client.resetTime) {
		f.rateLimits[ip] = &clientRate{count: 1, resetTime: now.Add(time.Minute)}
	} else {
		client.count++
		if client.count > f.maxPerMinute {
			atomic.AddUint64(&f.metrics.ChallengedRequests, 1)
			return ActionChallenge
		}
	}

	atomic.AddUint64(&f.metrics.AllowedRequests, 1)
	return ActionAllow
}

func (f *Firewall) GetMetrics() (allowed, challenged, blocked uint64) {
	return atomic.LoadUint64(&f.metrics.AllowedRequests),
		atomic.LoadUint64(&f.metrics.ChallengedRequests),
		atomic.LoadUint64(&f.metrics.BlockedRequests)
}
