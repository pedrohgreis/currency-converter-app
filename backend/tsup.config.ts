import { defineConfig } from 'tsup'

export default defineConfig({
  entry: ['src/app.ts', 'src/server.ts'],
  format: ['cjs'],
  target: 'es2020',
  outDir: 'dist',
  clean: true,
  
  external: ['@prisma/client', '.prisma'],
  noExternal: [],
})