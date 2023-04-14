#!/usr/bin/env node

import { $ } from './core.js';
// import { resolve, extname } from "node:path";
// import { createRequire } from "node:module";
// import url from "node:url";

// (async () => {
//   const helloFilePath = "./hello.mjs";
//   const origin = resolve(helloFilePath);
//   const require = createRequire(origin);
//   Object.assign(global, { require });
//   const ext = extname(origin);
//   console.log(ext);
//   // import 需要的是一个fileURL, 不能直接是path (如果是 path 会怎么样?)
//   await import(url.pathToFileURL(origin).toString());
// })();


export { $ };
