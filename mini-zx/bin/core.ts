import { spawn } from "node:child_process";

// TODO: 了解一下 TemplateStringsArray
function $(pieces: TemplateStringsArray) {
  return new Promise((resolve, reject) => {
    const cmd = pieces[0];

    let child = spawn(cmd, {
      cwd: process.cwd(),
      // TODO: 作为一个库应该兼容 win 和 linux , mac 需要处理兼容性问题
      // win 需要指定 powershell, true 默认是 cmd
      shell: "powershell.exe",
      stdio: ["pipe", "pipe", "pipe"],
    });

    let stdout = "";

    child.stdout.on("data", (chunk) => {
      stdout += chunk;
    });

    child.on("close", () => {
      console.log(stdout);
      resolve(stdout);
    });
  });
}

export { $ };
