# Changelog

## 0.2.0 (2025-05-04)

More platforms are [on the roadmap](https://github.com/un-oj/core/issues/3). Contributions are welcome!

### ⚠️ Breaking Changes

- Base interface `Problem` is more loose now, and every platform exports its own `Problem`. Checkout the current docs for more details
- Custom error classes are changed to reduce complexity. Checkout the current docs for more details
- Remove `name` property from all platforms
- **luogu:** `Problem#tags` is now `number[]` instead of `string[]`

### 🚀 Features

- Add AtCoder platform
- Add MXOJ platform

### 🩹 Bug Fixes

- Abstract class `Platform` now returns rejected promises instead of directly throwing when methods are not implemented

## 0.1.0 (2025-04-26)

🚀 Let's go!
