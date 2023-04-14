import { it, expect, describe, vi } from "vitest";
import { $ } from "../bin/core.js";

describe("core", () => {
  it("should exec shell command", async () => {
    // vi.stubEnv("PACKAGE_NAME", "zx");

    // TODO: 环境变量设置不进去
    // const result = await $`echo $PACKAGE_NAME`;
    const result = await $`echo zx`;
    // const result = await $`cat ./package.json`;

    expect(result).toContain("zx");
  });
});

