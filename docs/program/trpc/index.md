---
author: "Choi Yang"
date: 2023-05-28
---

# tRPC 是什么？与 REST 和 GraphQL 有啥关系 | 你可能不再需要传统的 API！

<VideoLink bvId='BV17z4y1z7xa' >tRPC 是什么？与 REST 和 GraphQL 有啥关系 | 你可能不再需要传统的 API！</VideoLink>

## 什么是 tRPC

tRPC 是一个基于 TypeScript 的 RPC 框架，它的目标是让前后端的开发者可以像调用本地函数一样调用远程函数，而不用关心底层的网络通信细节。

tRPC 的目标是让前后端的开发者可以像调用本地函数一样调用远程函数，而不用关心底层的网络通信细节。

<CloudinaryImg publicId='program/iShot_2023-06-04_20.54.29_jhvnxf' alt='trpc'/>

相关特点可以从 [tRPC 官网](https://trpc.io/)

直接看到，这里就不搬运官网内容了。

## 本文内容

本文会带你实现一个极简的 tRPC 项目，实现 `examples-minimal`。

> 相关源码如下：

[examples-minimal 项目源码](https://github.com/chonext/trpc-practice/tree/main/examples-minimal)

tRPC 分为几个包，所以你可以只安装你需要的，确保在代码库的适当部分安装所需的包。

首先安装 `@trpc/server` 和 `@trpc/client` 包，这两个包分别使用于服务端和客户端。

```bash
npm install @trpc/server @trpc/client
```

## 编写后端逻辑

我们不打算把项目弄复杂了，因此对于后端数据库而言，我们使用虚拟的，用一个数组即可，如下代码所示：

`server/db.ts`

```typescript
type User = { id: string; name: string; email: string; password: string };

// Imaginary database
const users: User[] = [];
export const db = {
  user: {
    findMany: async () => users,
    findById: async (id: string) => users.find((user) => user.id === id),
    create: async (data: { name: string; email: string; password: string }) => {
      const user = { id: String(users.length + 1), ...data };
      users.push(user);
      return user;
    },
  },
};
```

在模拟的 `db` 对象中有一些数据的操作方法，如 `findById` 和 `create`，这些方法会在后面的代码中用到，也如字面意思一样，`findById` 用于根据 `id` 查找用户，`create` 用于创建用户。

接下来创建 `server/trpc.ts` 文件，如下代码所示：

```typescript
import { initTRPC } from "@trpc/server";

/**
 * Initialization of tRPC backend
 * Should be done only once per backend!
 */
const t = initTRPC.create();

/**
 * Export reusable router and procedure helpers
 * that can be used throughout the router
 */
export const router = t.router;
export const publicProcedure = t.procedure;
```

在 `server/trpc.ts` 文件中，我们初始化了 tRPC 后端，然后导出了 `router` 和 `publicProcedure` 两个变量，这两个变量会在后面的代码中用到。

接着，有了前面铺垫，就是编写后端逻辑了，我们在 `server/index.ts` 文件中编写后端逻辑，如下代码所示：

```typescript 31
import { db } from "./db";
import { publicProcedure, router } from "./trpc";
import { createHTTPServer } from "@trpc/server/adapters/standalone";
import z from "zod";

const appRouter = router({
  userList: publicProcedure.query(async () => {
    // Retrieve users from a datasource, this is an imaginary database
    const users = await db.user.findMany();
    return users;
  }),
  userById: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ input }) => {
      const { id } = input;
      const user = await db.user.findById(id);
      return user;
    }),
  userCreate: publicProcedure
    .input(
      z.object({ name: z.string(), email: z.string(), password: z.string() })
    )
    .mutation(async ({ input }) => {
      const user = await db.user.create(input);
      return user;
    }),
});

// Export type router type signature,
// NOT the router itself.
export type AppRouter = typeof appRouter;

const server = createHTTPServer({
  router: appRouter,
});

server.listen(3000);
```

这里我们导入了 `db`、`publicProcedure` 和 `router`，然后创建了 `appRouter`，`appRouter` 是一个对象，它包含了 `userList`、`userById` 和 `userCreate` 三个属性，这三个属性分别对应了 `publicProcedure.query`、`publicProcedure.query` 和 `publicProcedure.mutation`，这三个属性的值都是一个函数，这个函数的返回值就是我们需要的数据。

值得注意的是，代码的第 31 行我标注了一下，这里导出的是 `AppRouter` 类型，而不是 `appRouter` 对象，这是因为 `appRouter` 对象中的 `userList`、`userById` 和 `userCreate` 三个属性的类型都是 `Procedure`，而 `Procedure` 是一个泛型，它的第一个参数是输入类型，第二个参数是输出类型，因此我们需要导出 `AppRouter` 类型，这样在后面的代码中才能使用 `AppRouter` 类型。

也就是我们在前端调用后端 api 的时候可以直接通过 `.` 就可以获得对应的属性和方法了。

到此，我们后端的逻辑差不多写完了，将对应的 `appRouter` 传入 `createHTTPServer` 函数中，然后监听 3000 端口即可，下面我们即将编写前端逻辑，来调用后端的接口试一试。

## 编写前端逻辑

由于前端只用负责调用 api，所以代码其实也很简单，如 `client/index.ts` 所示：

```typescript
import { createTRPCProxyClient, httpBatchLink } from "@trpc/client";
import type { AppRouter } from "../server";
//     👆 **type-only** import

// Pass AppRouter as generic here. 👇 This lets the `trpc` object know
// what procedures are available on the server and their input/output types.
const trpc = createTRPCProxyClient<AppRouter>({
  links: [
    httpBatchLink({
      url: "http://localhost:3000",
    }),
  ],
});

async function main() {
  const createdUser = await trpc.userCreate.mutate({
    name: "一百个Chocolate",
    email: "chocolate@qq.com",
    password: "Chocolate",
  });
  console.log("createdUser: ", createdUser);
  const userCreated = await trpc.userById.query({ id: "1" });
  console.log("userCreated: ", userCreated);
  const users = await trpc.userList.query();
  console.log("Users:", users);
}

main();
```

这里我们导入了 `createTRPCProxyClient` 和 `httpBatchLink`，然后创建了 `trpc` 对象，`trpc` 对象就是我们用来调用后端 api 的对象，它的属性和方法就是后端 `appRouter` 对象中的 `userList`、`userById` 和 `userCreate` 三个属性，这三个属性的类型都是 `Procedure`，所以我们可以直接通过 `.` 来调用这三个属性。

### 编写 script 脚本

为了让我们前后端代码跑起来，还需要修改一下项目的 script 脚本，如下：

```json
{
  // xxx
  "scripts": {
    "client:dev": "esno client",
    "server:dev": "esno server"
  }
  // ...
}
```

这里我是使用的 `esno` 来执行我们的 ts 文件。也需要安装一下：

```bash
npm install esno
```

> `esno` 是一个命令行工具，它可以直接执行 ts 文件，而不需要我们先编译成 js 文件，然后再执行 js 文件，这样就可以省去编译的过程了。

那么我们就可以在终端中执行 `npm run client:dev` 和 `npm run server:dev` 来分别启动前端和后端了，这里需要注意一下，我们需要先执行 `npm run server:dev`，然后再执行 `npm run client:dev`，因为前端需要调用后端的接口，所以后端必须先启动起来，否则前端就会报错。

当然，这里其实也可以使用 `wait-port` 以及 `npm-run-all` 来实现前后端一起启动，我们会在进阶篇来介绍，这里就先不展示了。

我们来看看打印结果：

<CloudinaryImg publicId='program/iShot_2023-06-04_21.24.18_h7hzpm' alt='console'/>

可以看到，我们成功的调用了后端的接口，获取到了数据。

## 总结

到此，我们就完成了一个简单的 tRPC 项目，我们使用 tRPC 来创建了一个后端 api，然后在前端使用 tRPC 来调用后端的接口，获取到了数据。

这里我们使用的是 `httpBatchLink`，也就是 http 协议，当然 tRPC 还支持其他的协议，比如 `wsLink`、`grpcLink`、`reactQueryLink` 等等，可以从官网文档中进一步学习。

## 文章参考

[tRPC 官方文档](https://trpc.io/docs/)

[Learn tRPC In 45 Minutes](https://www.youtube.com/watch?v=UfUbBWIFdJs)