# UnOJ

Unified Online Judge information collector.

## Usage

Install `un-oj` from NPM, or `@un-oj/core` from JSR.

<!-- eslint-disable -->
```ts
import Codeforces from '../src/platforms/codeforces';

const cf = new Codeforces();

console.log(await cf.getProblem('1A'));
```
<!-- eslint-enable -->

Documents are available on JSR.

## Compataility

UnOJ uses internal APIs, or parses HTML from some OJ, which may be changed at
any time. If you encountered any problems, feel free to open an issue.

## Acknowledgements

- [洛谷 API 文档](https://0f-0b.github.io/luogu-api-docs/)
