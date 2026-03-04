import { defineConfig, type Plugin } from 'vite';
import { resolve } from 'path';
import pkg from './package.json';

function devRssProxyPlugin(): Plugin {
  return {
    name: 'dev-rss-proxy',
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        if (!req.url) return next();
        const reqUrl = new URL(req.url, 'http://localhost');
        if (reqUrl.pathname !== '/api/rss-proxy') return next();

        const target = reqUrl.searchParams.get('url');
        if (!target) {
          res.statusCode = 400;
          res.setHeader('Content-Type', 'application/json; charset=utf-8');
          res.end(JSON.stringify({ error: 'Missing url parameter' }));
          return;
        }

        let parsedTarget: URL;
        try {
          parsedTarget = new URL(target);
        } catch {
          res.statusCode = 400;
          res.setHeader('Content-Type', 'application/json; charset=utf-8');
          res.end(JSON.stringify({ error: 'Invalid url parameter' }));
          return;
        }

        const controller = new AbortController();
        const timeout = setTimeout(() => controller.abort(), 15000);

        try {
          const upstream = await fetch(parsedTarget.href, {
            signal: controller.signal,
            headers: {
              'User-Agent': 'WorldMonitor-Dev-RSS-Proxy/1.0',
              Accept: 'application/rss+xml, application/xml, text/xml, */*',
            },
          });
          const body = await upstream.text();

          res.statusCode = upstream.status;
          res.setHeader('Access-Control-Allow-Origin', '*');
          res.setHeader('Cache-Control', 'no-store');
          res.setHeader('Content-Type', upstream.headers.get('content-type') || 'application/xml; charset=utf-8');
          res.end(body);
        } catch (error) {
          res.statusCode = 502;
          res.setHeader('Content-Type', 'application/json; charset=utf-8');
          res.end(JSON.stringify({ error: 'Failed to fetch feed', details: String(error) }));
        } finally {
          clearTimeout(timeout);
        }
      });
    },
  };
}

export default defineConfig({
  plugins: [devRssProxyPlugin()],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
  },
  define: {
    __APP_VERSION__: JSON.stringify(pkg.version),
  },
  server: {
    host: '0.0.0.0',
    port: 4173,
  },
});
