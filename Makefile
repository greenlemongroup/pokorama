SHELL := /bin/bash
PORT ?= 5173

.DEFAULT_GOAL := help

.PHONY: help init setup-hooks dev build preview lint tidy format format-check typecheck test clean

help:
	@echo "Available targets:"
	@echo "  make init       Install dependencies"
	@echo "  make dev        Start local dev server"
	@echo "  make build      Build production assets"
	@echo "  make preview    Preview production build locally"
	@echo "  make lint       Run ESLint"
	@echo "  make format     Format code with Prettier"
	@echo "  make tidy       Alias for make format"
	@echo "  make format-check Check formatting without modifying files"
	@echo "  make typecheck  Run TypeScript checks"
	@echo "  make test       Placeholder test target"
	@echo "  make setup-hooks Install git hooks path (.githooks)"
	@echo "  make clean      Remove generated build output"

init:
	npm install
	$(MAKE) setup-hooks

setup-hooks:
	git config core.hooksPath .githooks

dev:
	npm run dev -- --port $(PORT)

build:
	npm run build

preview:
	npm run preview

lint:
	npm run lint

format:
	npm run format

tidy:
	npm run format

format-check:
	npm run format:check

typecheck:
	npm run typecheck

test:
	npm run test

clean:
	rm -rf dist
