import { spawn } from "node:child_process";

// TODO: 了解一下 TemplateStringsArray
function $(pieces: TemplateStringsArray) {
  return new Promise((resolve, reject) => {
    const cmd = pieces[0];
    console.log(cmd);

    let child = spawn(cmd, {
      cwd: process.cwd(),
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
