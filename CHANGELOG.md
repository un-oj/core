# Changelog

## 0.3.0 (2025-06-02)

### ⚠️ Breaking Changes

- The `Tag` generic of `Problem` doesn't allow `number[]` anymore. Use `TagInfo[]` instead
- `DEFAULT_BASE_URL` of each platform is moved out of the class. You can directly import it from the platform module
- **luogu:** `Problem#tags` is now `TagInfo[]` instead of `number[]`

### 🚀 Features

- Add Hydro platform
- Add LeetCode platform
- Add Lyrio platform
- Add `Platform#getContest` to get contest information
- **luogu:** Support `Platform#getContest`

### 🩹 Bug Fixes

- **atcoder:** Compat with new memory limit format
- **luogu:** Correct problem description when some of its sections aren't complete. Non-existing sections are now `''` instead of `null`

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
