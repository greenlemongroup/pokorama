SHELL := /bin/bash
PORT ?= 5173

.DEFAULT_GOAL := help

.PHONY: help init dev build preview lint typecheck test clean

help:
	@echo "Available targets:"
	@echo "  make init       Install dependencies"
	@echo "  make dev        Start local dev server"
	@echo "  make build      Build production assets"
	@echo "  make preview    Preview production build locally"
	@echo "  make lint       Run ESLint"
	@echo "  make typecheck  Run TypeScript checks"
	@echo "  make test       Placeholder test target"
	@echo "  make clean      Remove generated build output"

init:
	npm install

dev:
	npm run dev -- --port $(PORT)

build:
	npm run build

preview:
	npm run preview

lint:
	npm run lint

typecheck:
	npm run typecheck

test:
	npm run test

clean:
	rm -rf dist
