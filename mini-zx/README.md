# mini-zx

[_](https://app.heptabase.com/w/b1d37c4b02d6e93f8628cdac360bde066f124b279cd2b50ab57410740300a34f?id=6b388a5f-6c0a-4971-942f-617ca34a10d3)

## implement plan

- [x] 实现 shebang 那样可调用
- [x] 执行 hello.mjs 里面的代码
- [x] 实现 $`command`
- [x] 重新组织当前的代码结构
- [x] 当调用 command 的时候 ，command 本身的 stdout 是在哪里执行的

## note

### shebang

这是一个特殊的 shebang 声明，它使用了 zx 这个命令行工具作为脚本的解释器。因此，这个脚本可以被认为是一个使用 zx 执行的 Node.js 脚本。在 Unix 和 Linux 系统中，shebang 是一个用于指定脚本解释器的特殊语法，通常放在脚本文件的第一行。

```js
#!/usr/bin/env zx
```

### spawn

主要用于异步地衍生子进程，不会阻塞Node.js事件循环

### TemplateStringsArray

TemplateStringsArray是JavaScript中的一个数据类型，用于保存使用模板字符串语法定义的字符串字面量。它是一个只读的类数组对象，可以通过在模板字符串中使用标记函数来创建。

在使用模板字符串时，可以使用标记函数来自定义字符串的输出。标记函数是一个接收模板字符串和插值表达式的函数，它会将它们组合在一起并返回最终的字符串。

当使用标记函数时，函数的第一个参数将是一个TemplateStringsArray对象，它包含了所有的模板字符串和插值表达式。接下来的参数将是所有的插值表达式的值。这些参数的数量与插值表达式的数量相同，并且它们按照模板字符串中的顺序排列。

以下是一个使用模板字符串和标记函数的简单示例：

```javascript
function myTag(strings, ...values) { console.log(strings); // 输出 ["Hello ", "!"] console.log(values); // 输出 ["World"] return strings[0] + values[0] + strings[1]; } const greeting = myTag`Hello ${"World"}!`; console.log(greeting); // 输出 "Hello World!"
```

在上面的示例中，myTag函数是一个标记函数。当使用myTag函数来处理模板字符串时，它会将TemplateStringsArray对象和值数组作为参数传递给函数。

TemplateStringsArray对象是只读的，因此您不能更改它的值。它具有一些有用的属性和方法，例如：

- `raw`: 包含原始字符串字面量的数组，未经过任何转义或处理。
- `length`: 包含模板字符串中的字符串数量，与插值表达式数量相同。
- `toString()`: 返回所有字符串和插值表达式连接在一起的结果字符串。

下面是一个使用TemplateStringsArray对象的示例，它演示了如何使用raw属性来访问原始字符串：

```javascript
function myTag(strings, ...values) { console.log(strings.raw[0]); // 输出 "Hello\\nWorld" } myTag`Hello\nWorld`;
```

在上面的示例中，我们使用了 `raw` 属性来访问原始的字符串字面量。这对于需要处理特殊字符的情况非常有用。

### createRequire

`createRequire` 是 Node.js 12 引入的一个函数，用于创建一个类似于 `require` 函数的实例，该实例可以用于动态地加载 Node.js 模块。

在 Node.js 中，`require` 函数用于加载模块。但是在 ECMAScript 模块中，由于其具有静态结构，不能像 CommonJS 模块那样使用 `require` 动态加载模块。因此，Node.js 引入了 `createRequire` 函数，以便在 ECMAScript 模块中动态加载模块。

使用 `createRequire` 函数，您可以创建一个 `require` 实例，并将其用于加载模块，例如：

```js
import { createRequire } from 'node:module'; const require = createRequire(import.meta.url); const lodash = require('lodash');
```

在上面的示例中，我们首先使用 `createRequire` 函数创建一个 `require` 实例，并将其分配给变量 `require`。然后，我们可以使用这个 `require` 实例加载 `lodash` 模块，就像在 CommonJS 模块中一样。

请注意，`createRequire` 函数只能在 Node.js 环境中使用，并且仅在 Node.js 12 或更高版本中可用。如果您使用的是早期版本的 Node.js，则不能使用此函数。

### & 是 shell command  后台运行符号

在Shell命令中，&符号通常用作后台运行符号，它允许您在后台运行一个命令或进程，而不必等待它完成。当您在命令行输入一个命令并在最后加上&符号时，该命令将在后台运行，控制台将立即返回，而您可以继续输入其他命令。例如：

```bash
$ sleep 10 &
```

在上面的命令中， `sleep` 命令将在后台运行10秒钟，控制台将立即返回，而您可以继续输入其他命令。如果您省略&符号，则该命令将在前台运行，而且您将需要等待该命令完成，才能继续输入其他命令。

除了作为后台运行符号之外，&符号在Shell命令中还有其他用途。例如，在命令中使用&符号可以将多个命令连接起来，以便在一个命令行中一次性运行它们。例如：

```bash
$ command1 & command2
```

在上面的命令中，`command1` 和 `command2` 将同时在后台运行。这对于需要同时运行多个命令的情况非常有用。

## tsconfig.json

### NodeNext

tsconfig 里面的 "module": "NodeNext“ 这里的 NodeNext 是指的是 esm 嘛？

是的，`"module": "NodeNext"` 是指将 TypeScript 配置为使用 ECMAScript 模块（ESM）。NodeNext 是一种模块解析策略，它遵循 Node.js 在 ESM 支持方面的最新进展。当您将 `module` 设置为 `NodeNext` 时，TypeScript 会按照 Node.js 支持的 ESM 语法和解析规则进行编译。

这意味着，在这种配置下，您的 TypeScript 代码将编译为 ESM，而不是默认的 CommonJS（CJS）格式。您需要确保使用了一个支持 ESM 的 Node.js 版本（例如，12.17.0 或更高），并且在项目的 `package.json` 文件中设置了 `"type": "module"`。

这样，您的项目将使用 ESM 进行构建和运行，使您能够充分利用 ESM 提供的功能，如顶层 `await` 和动态 `import()`。

