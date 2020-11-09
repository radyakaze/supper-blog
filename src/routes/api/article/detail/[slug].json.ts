import { detail } from '../_posts';
import { Request } from 'polka';
import { ServerResponse } from 'http';

export function get(req: Request, res: ServerResponse): void {
  const slug = req.params.slug;
  const content = detail(slug);

  if (content === null) {
    res.writeHead(404, {
      'Content-Type': 'application/json'
    });

    res.end(
      JSON.stringify({
        message: `Not found`
      })
    );
  } else {
    res.writeHead(200, {
      'Content-Type': 'application/json'
    });

    res.end(JSON.stringify(content));
  }
}
