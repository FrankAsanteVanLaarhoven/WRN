package cache

import (
	"sync"
	"time"
)

type CacheItem struct {
	Value      []byte
	Expiration time.Time
}

type RedisCache struct {
	mu    sync.RWMutex
	items map[string]CacheItem
	hits  uint64
	misses uint64
}

func NewRedisCache() *RedisCache {
	rc := &RedisCache{
		items: make(map[string]CacheItem),
	}
	// Background cleanup loop for expired items
	go func() {
		for {
			time.Sleep(30 * time.Second)
			rc.mu.Lock()
			now := time.Now()
			for k, v := range rc.items {
				if now.After(v.Expiration) {
					delete(rc.items, k)
				}
			}
			rc.mu.Unlock()
		}
	}()
	return rc
}

func (rc *RedisCache) Set(key string, val []byte, ttl time.Duration) {
	rc.mu.Lock()
	defer rc.mu.Unlock()
	rc.items[key] = CacheItem{
		Value:      val,
		Expiration: time.Now().Add(ttl),
	}
}

func (rc *RedisCache) Get(key string) ([]byte, bool) {
	rc.mu.Lock()
	defer rc.mu.Unlock()

	item, exists := rc.items[key]
	if !exists {
		rc.misses++
		return nil, false
	}

	if time.Now().After(item.Expiration) {
		delete(rc.items, key)
		rc.misses++
		return nil, false
	}

	rc.hits++
	return item.Value, true
}

func (rc *RedisCache) Delete(key string) {
	rc.mu.Lock()
	defer rc.mu.Unlock()
	delete(rc.items, key)
}

func (rc *RedisCache) GetStats() (hits, misses uint64, totalKeys int) {
	rc.mu.RLock()
	defer rc.mu.RUnlock()
	return rc.hits, rc.misses, len(rc.items)
}

