import fs from 'fs-extra';
import {build} from 'esbuild';

build({
    entryPoints: [process.argv.includes('--use-ts') ? './build/out/index.js' : './app/index.tsx'],
    bundle: true,
    outfile: './build/final/app.js',
    tsconfig: 'tsconfig.json',
    define: {'process.env.NODE_ENV': '"development"'},
    resolveExtensions: ['.jsx','.js','.tsx','.ts'],
    minify: true,
    sourcemap: true
}).then(status => console.log("Completed:", status)).catch(err => console.error(err));
fs.copySync('./static/', './build/final/');