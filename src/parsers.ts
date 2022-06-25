import { IncomingMessage } from 'http';

export async function parseBody(request: IncomingMessage) {
  const raw = await getRawBody(request);
  const contentType = request.headers['content-type'];

  if (contentType?.startsWith('multipart/form-data')) {
    console.log({ raw, rawString: raw.toString() });
    return multipartParser(raw);
  }
  return jsonParser(raw);
}

export function jsonParser(body: Buffer[]) {
  return JSON.parse(body.toString());
}

export function multipartParser(body: Buffer[]) {
  const result: Record<string, any> = {};
  const lines = body
    .toString()
    .split('\r\n')
    .filter((line) => !!line);

  const target = 'name=';
  for (let index = 0; index < lines.length; index++) {
    const line = lines[index];
    if (line.startsWith('Content-Disposition:')) {
      const start = line.indexOf(target) + target.length + 1;
      console.log({ start, l: line[start] });
      const field = line.substring(start, line.indexOf('"', start));
      const value = lines[++index];
      result[field] = value;
    }
  }
  return result;
}

function getRawBody(request: IncomingMessage) {
  return new Promise<Buffer[]>((resolve, reject) => {
    const body: Buffer[] = [];
    request.on('data', (chunk: Buffer) => body.push(chunk));
    request.on('end', () => resolve(body));
    request.on('error', (error) => reject(error));
  });
}
