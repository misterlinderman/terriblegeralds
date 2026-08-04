import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
var pluginDir = path.dirname(fileURLToPath(import.meta.url));
var repoRoot = path.resolve(pluginDir, '../..');
var heroDir = path.join(repoRoot, 'assets/hero');
var mediaUrlPrefix = '/media/hero';
var videoExtensions = new Set(['.mp4', '.webm']);
var mimeTypes = {
    '.mp4': 'video/mp4',
    '.webm': 'video/webm',
};
function isVideoFile(name) {
    return videoExtensions.has(path.extname(name).toLowerCase());
}
function safeHeroFilePath(urlPath) {
    var base = path.basename(decodeURIComponent(urlPath.split('?')[0] || ''));
    if (!base || base.includes('..'))
        return null;
    var filePath = path.join(heroDir, base);
    if (!filePath.startsWith(heroDir))
        return null;
    if (!fs.existsSync(filePath) || !fs.statSync(filePath).isFile())
        return null;
    if (!isVideoFile(base))
        return null;
    return filePath;
}
/** Serve repo `assets/hero/` in dev; copy into dist on build when files exist locally. */
export function heroMediaPlugin() {
    var resolvedOutDir = '';
    return {
        name: 'gerald-hero-media',
        configResolved: function (config) {
            resolvedOutDir = path.resolve(config.root, config.build.outDir, 'media/hero');
        },
        configureServer: function (server) {
            server.middlewares.use(mediaUrlPrefix, function (req, res, next) {
                var filePath = safeHeroFilePath(req.url || '');
                if (!filePath) {
                    next();
                    return;
                }
                var ext = path.extname(filePath).toLowerCase();
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
        closeBundle: function () {
            if (!fs.existsSync(heroDir))
                return;
            var videos = fs.readdirSync(heroDir).filter(isVideoFile);
            if (videos.length === 0)
                return;
            fs.mkdirSync(resolvedOutDir, { recursive: true });
            for (var _i = 0, videos_1 = videos; _i < videos_1.length; _i++) {
                var name = videos_1[_i];
                fs.copyFileSync(path.join(heroDir, name), path.join(resolvedOutDir, name));
            }
        },
    };
}
