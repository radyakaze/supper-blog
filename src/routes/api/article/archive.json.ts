import { archive } from './_posts';
import { Request } from 'polka';
import { ServerResponse } from 'http';

export function get(req: Request, res: ServerResponse): void {
  res.writeHead(200, {
    'Content-Type': 'application/json'
  });

  res.end(JSON.stringify(archive()));
}
