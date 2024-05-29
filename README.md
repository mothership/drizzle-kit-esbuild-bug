# Drizzle-Kit / ESBuild-Register Bug 

**Repro steps**

```
$ pnpm i
```

TSConfig compiles the decorators just fine: 

```
$ pnpm echo-config
DatabaseConfig {
  DATABASE_DATABASE: 'db1',
  DATABASE_HOST: 'localhost',
  DATABASE_PORT: 5432,
  DATABASE_SSL: false,
  DATABASE_USER: 'admin',
  DATABASE_PASSWORD: 'password'
}
```

See that esbuild will fail to compile the decorators / experimentalDecorators setting from the tsconfig is not respected:

```
> drizzle-esbuild-bug@0.0.1 migration:generate 
> pnpm drizzle-kit generate --config ./src/drizzle.config.ts

drizzle-kit: v0.21.4
drizzle-orm: v0.30.10

Reading config file './dev/drizzle-esbuild-bug/src/drizzle.config.ts'
node:internal/process/promises:289
            triggerUncaughtException(err, true /* fromPromise */);
            ^

Error: Transform failed with 6 errors:
./dev/drizzle-esbuild-bug/src/config.ts:39:2: ERROR: Transforming JavaScript decorators to the configured target environment ("es2021") is not supported yet
./dev/drizzle-esbuild-bug/src/config.ts:43:2: ERROR: Transforming JavaScript decorators to the configured target environment ("es2021") is not supported yet
./dev/drizzle-esbuild-bug/src/config.ts:47:2: ERROR: Transforming JavaScript decorators to the configured target environment ("es2021") is not supported yet
./dev/drizzle-esbuild-bug/src/config.ts:52:2: ERROR: Transforming JavaScript decorators to the configured target environment ("es2021") is not supported yet
./dev/drizzle-esbuild-bug/src/config.ts:57:2: ERROR: Transforming JavaScript decorators to the configured target environment ("es2021") is not supported yet
```
