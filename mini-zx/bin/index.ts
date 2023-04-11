#!/usr/bin/env node

console.log("hi my name is zx");
console.log("-------------------");
console.log(process.argv.splice(2)); // 获取到文件的相对路径
import { resolve, extname } from "node:path";
import { createRequire } from "node:module";
import url from "node:url";

(async () => {
  const helloFilePath = "./hello.mjs";
  const origin = resolve(helloFilePath);
  const require = createRequire(resolve(helloFilePath));
  Object.assign(global, { require });
  const ext = extname(origin);
  console.log(ext);
  // import 需要的是一个fileURL, 不能直接是path (如果是 path 会怎么样?)
  await import(url.pathToFileURL(resolve(helloFilePath)).toString());
})();

function $(command: string) {
  console.log("command: ", command);
}
