# Default environment (can be overridden per project)
ENV ?= dev

# Default targets that projects can override
.PHONY: build test deploy lint clean

build:
	npm run build

test:
	@echo "Running default test command"
	@echo "Override this target in your project if necessary."

deploy:
	@echo "No deploy target defined. Override this in your project Makefile."

lint:
	@echo "Running linting..."
	@echo "Override this if your project has specific linting rules."

clean:
	@echo "Cleaning up..."
	@rm -rf build dist

# Utility functions
help:
	@echo "Available commands:"
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-20s\033[0m %s\n", $$1, $$2}'

.DEFAULT_GOAL := help
