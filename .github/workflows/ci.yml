name: CI

on:
  push:
    branches:
      - main

  pull_request:
    branches:
      - main

jobs:
  lint:
    runs-on: ubuntu-latest

    strategy:
      matrix:
        node_version: [18, 20, 22]

    steps:
      - name: Checkout Repo
        uses: actions/checkout@v4

      - name: Setup pnpm
        uses: pnpm/action-setup@v4.0.0

      - name: Setup Node.js environment
        uses: actions/setup-node@v4.0.2
        with:
          node-version: ${{ matrix.node_version }}
          cache: pnpm

      - name: Setup
        run: npm i -g @antfu/ni

      - name: Install
        run: nci

      - name: Lint
        run: nr lint
