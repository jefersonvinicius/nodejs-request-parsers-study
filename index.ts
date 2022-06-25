import http from 'http';
import { parseBody } from '@app/parsers';

const PORT = 3333;

const server = http.createServer(async (request, response) => {
  const body = await parseBody(request);

  response.write(JSON.stringify({ body }));
  return response.end();
});

server.listen(PORT, () => {
  console.log('Serving at http://localhost:' + PORT);
});
