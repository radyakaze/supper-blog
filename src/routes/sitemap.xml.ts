import { posts } from './api/article/_posts';
import { url } from '~/site.config.json';
import { Request } from 'polka';
import { ServerResponse } from 'http';

export function get(req: Request, res: ServerResponse): void {
  res.writeHead(200, {
    'Content-Type': 'text/xml'
  });

  let xml: string[] = [
    '<?xml version="1.0" encoding="UTF-8" ?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    '  <url>',
    `    <loc>${url}</loc>`,
    `    <lastmod>${posts[0].date.iso}</lastmod>`,
    '    <priority>1.0</priority>',
    '  </url>',
    '  <url>',
    `    <loc>${url}/archive</loc>`,
    `    <lastmod>${posts[0].date.iso}</lastmod>`,
    '    <priority>0.8</priority>',
    '  </url>'
  ];

  posts.forEach((post) => {
    const postUrl = [
      '  <url>',
      `    <loc>${url}/${post.slug}</loc>`,
      `    <lastmod>${post.date.iso}</lastmod>`,
      '    <priority>0.8</priority>',
      '  </url>'
    ];

    xml = [...xml, ...postUrl];
  });

  xml.push('</urlset>');

  res.end(xml.join('\n'));
}
