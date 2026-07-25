import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import type { Plugin } from 'vite';

const pluginDir = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(pluginDir, '../..');
const heroDir = path.join(repoRoot, 'assets/hero');
const mediaUrlPrefix = '/media/hero';

const videoExtensions = new Set(['.mp4', '.webm']);
const mimeTypes: Record<string, string> = {
  '.mp4': 'video/mp4',
  '.webm': 'video/webm',
};

function isVideoFile(name: string) {
  return videoExtensions.has(path.extname(name).toLowerCase());
}

function safeHeroFilePath(urlPath: string): string | null {
  const base = path.basename(decodeURIComponent(urlPath.split('?')[0] || ''));
  if (!base || base.includes('..')) return null;

  const filePath = path.join(heroDir, base);
  if (!filePath.startsWith(heroDir)) return null;
  if (!fs.existsSync(filePath) || !fs.statSync(filePath).isFile()) return null;
  if (!isVideoFile(base)) return null;

  return filePath;
}

/** Serve repo `assets/hero/` in dev; copy into dist on build when files exist locally. */
export function heroMediaPlugin(): Plugin {
  let resolvedOutDir = '';

  return {
    name: 'gerald-hero-media',
    configResolved(config) {
      resolvedOutDir = path.resolve(config.root, config.build.outDir, 'media/hero');
    },
    configureServer(server) {
      server.middlewares.use(mediaUrlPrefix, (req, res, next) => {
        const filePath = safeHeroFilePath(req.url || '');
        if (!filePath) {
          next();
          return;
        }

        const ext = path.extname(filePath).toLowerCase();
        res.setHeader('Content-Type', mimeTypes[ext] || 'application/octet-stream');
        res.setHeader('Content-Length', String(fs.statSync(filePath).size));

        if (req.method === 'HEAD') {
          res.statusCode = 200;
          res.end();
          return;
        }

        fs.createReadStream(filePath).pipe(res);
      });
    },
    closeBundle() {
      if (!fs.existsSync(heroDir)) return;

      const videos = fs.readdirSync(heroDir).filter(isVideoFile);
      if (videos.length === 0) return;

      fs.mkdirSync(resolvedOutDir, { recursive: true });
      for (const name of videos) {
        fs.copyFileSync(path.join(heroDir, name), path.join(resolvedOutDir, name));
      }
    },
  };
}
