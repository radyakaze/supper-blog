import { posts as allPost } from './api/article/_posts';
import { url, title, description, author } from '~/site.config.json';
import { Request } from 'polka';
import { ServerResponse } from 'http';
import dayjs from 'dayjs';

export function get(req: Request, res: ServerResponse): void {
  res.writeHead(200, {
    'Content-Type': 'text/xml'
  });

  const dateFormat = 'ddd, DD MMM YYYY HH:mm:ss ZZ';

  const posts = allPost.slice(0, 15);

  let xml: string[] = [
    '<?xml version="1.0" encoding="utf-8"?>',
    '<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">',
    '<channel>',
    `<title>${title}</title>`,
    '<language>id</language>',
    `<description>${description}</description>`,
    `<link>${url}/</link>`,
    `<lastBuildDate>${dayjs(posts[0].date.iso).locale('en').format(dateFormat)}</lastBuildDate>`,
    `<atom:link href="${url}/rss.xml" rel="self" type="application/atom+xml" />`,
    `<webMaster>${author.email} (${author.name})</webMaster>`,
    `<managingEditor>${author.email} (${author.name})</managingEditor>`,
  ];

  posts.forEach((post) => {
    const postUrl = [
      '<item>',
      `<title>${post.title}</title>`,
      `<link>${url}/${post.slug}</link>`,
      `<author>${author.email} (${author.name})</author>`,
      `<guid isPermaLink="true">${url}/${post.slug}</guid>`,
      `<pubDate>${dayjs(post.date.iso).locale('en').format(dateFormat)}</pubDate>`,
      `<description>${post.summary.replace(/(<([^>]+)>)/gi, '')}...</description>`,
      '</item>'
    ];

    xml = [...xml, ...postUrl];
  });

  xml.push('</channel>')
  xml.push('</rss>');

  res.end(xml.join('\n'));
}
