#!/usr/bin/env node

import { resolve } from "node:path";
import { createRequire } from "node:module";
import url from "node:url";
// import "./globals.js";
export * from "./globals.js";

(async () => {
  const helloFilePath = "./hello.mjs";
  const origin = resolve(helloFilePath);
  const require = createRequire(origin);
  Object.assign(global, { require });
  // import 需要的是一个fileURL, 不能直接是path (如果是 path 会怎么样?)
  await import(url.pathToFileURL(origin).toString());
})();
