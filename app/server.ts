import * as fs from 'fs';
import * as url from 'url';
import * as path from 'path';

import express from 'express';

import * as sm from 'source-map-support';
sm.install();

const app = express();

export const root = (function rootFn() {
    const frags: string[] = url.fileURLToPath(import.meta.url).split(/[\\/]/g).slice(0, -1).filter(i => i.length > 0);
    while (!fs.readdirSync(frags.join('/')).includes('package.json') && frags.length > 0)
        frags.pop();
    return frags.join('/');
})();
export const build = path.join(root, './build/final');

app.use(express.static(build));
app.get('/', (_, res) => res.sendFile('index.html', {root: build}));

app.listen(1920, () => console.log(`Listening on port 1920 at ${root}`));