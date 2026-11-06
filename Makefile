# WRN Passport Coexistence & Enterprise Infrastructure
# Unified Root Makefile (Rust Kernel + Go Edge Gateway + UI Console)

.PHONY: all build test test-rust test-go build-rust build-go build-ui build-sdk run-daemon clean help

all: build test

build: build-rust build-go build-ui build-sdk
	@echo "\033[1;32m[✓] All backend, UI, and SDK components successfully built.\033[0m"

build-rust:
	@echo "[*] Building Rust Kernel Core..."
	cd backend/rust-kernel && cargo build --release

build-go:
	@echo "[*] Building Go Edge Gateway & wrn CLI..."
	cd backend/go-edge && make build

build-ui:
	@echo "[*] Building UI Console & PWA assets..."
	cd console && npm run build

build-sdk:
	@echo "[*] Compiling @wrn/sdk TypeScript client..."
	cd sdk/typescript && ../../console/node_modules/typescript/bin/tsc
	@echo "[*] Verifying Go SDK client..."
	cd sdk/go && go vet ./...

test: test-rust test-go
	@echo "\033[1;32m[✓] All military-grade security and unit tests passed.\033[0m"

test-rust:
	@echo "[*] Executing Rust RFC 9421 & Bounded Compartment test suite..."
	cd backend/rust-kernel && cargo test

test-go:
	@echo "[*] Executing Go WAF & Cache test suite..."
	cd backend/go-edge && make test

run-daemon:
	@echo "[*] Running WRN Kernel Security Daemon (14 SEC-01..14 fixtures)..."
	cd backend/rust-kernel && cargo run --release

clean:
	@echo "[*] Cleaning build artifacts..."
	cd backend/rust-kernel && cargo clean
	cd backend/go-edge && make clean
	rm -rf console/dist

