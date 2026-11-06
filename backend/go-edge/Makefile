.PHONY: all build test run lint clean

all: test build

build:
	go build -o bin/wrn-edge-server cmd/server/main.go
	go build -o bin/wrn cmd/wrn/main.go

test:
	go test -v ./...

run: build
	./bin/wrn-edge-server

lint:
	go vet ./...

clean:
	rm -rf bin

