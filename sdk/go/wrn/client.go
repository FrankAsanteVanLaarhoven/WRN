package wrn

import (
	"bytes"
	"encoding/json"
	"fmt"
	"io"
	"net/http"
	"time"
)

// Client is the official Go SDK client for WRN Cloud
type Client struct {
	Endpoint   string
	APIKey     string
	HTTPClient *http.Client
}

// NewClient initializes a new WRN Go Client
func NewClient(endpoint, apiKey string) *Client {
	if endpoint == "" {
		endpoint = "http://127.0.0.1:8080"
	}
	return &Client{
		Endpoint: endpoint,
		APIKey:   apiKey,
		HTTPClient: &http.Client{
			Timeout: 10 * time.Second,
		},
	}
}

func (c *Client) request(method, path string, body interface{}, target interface{}) error {
	var bodyReader io.Reader
	if body != nil {
		data, err := json.Marshal(body)
		if err != nil {
			return err
		}
		bodyReader = bytes.NewReader(data)
	}

	url := fmt.Sprintf("%s%s", c.Endpoint, path)
	req, err := http.NewRequest(method, url, bodyReader)
	if err != nil {
		return err
	}

	req.Header.Set("Content-Type", "application/json")
	req.Header.Set("X-WRN-SDK", "go-v0.2.0")
	if c.APIKey != "" {
		req.Header.Set("Authorization", "Bearer "+c.APIKey)
	}

	resp, err := c.HTTPClient.Do(req)
	if err != nil {
		return err
	}
	defer resp.Body.Close()

	if resp.StatusCode >= 400 {
		respBody, _ := io.ReadAll(resp.Body)
		return fmt.Errorf("WRN API Error [%d]: %s", resp.StatusCode, string(respBody))
	}

	if target != nil {
		return json.NewDecoder(resp.Body).Decode(target)
	}
	return nil
}

// ExecuteStepFunctions triggers full state flow execution
func (c *Client) ExecuteStepFunctions(input map[string]interface{}) (map[string]interface{}, error) {
	var result map[string]interface{}
	err := c.request("POST", "/api/v1/step-functions/execute", input, &result)
	return result, err
}

// GitPush triggers the automated 5-phase Cloud CI/CD deployment
func (c *Client) GitPush(remote, branch string) (map[string]interface{}, error) {
	var result map[string]interface{}
	err := c.request("POST", "/api/v1/git/push", map[string]string{
		"remote": remote,
		"branch": branch,
	}, &result)
	return result, err
}

// QueryDatabase executes an SQL query on PostgreSQL, MySQL, or TablesDB
func (c *Client) QueryDatabase(sql, engine string) (map[string]interface{}, error) {
	var result map[string]interface{}
	err := c.request("POST", "/api/v1/databases/query", map[string]string{
		"sql":    sql,
		"engine": engine,
	}, &result)
	return result, err
}

