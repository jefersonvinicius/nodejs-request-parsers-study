import { jsonParser } from '@app/parsers';

describe('jsonParser', () => {
  it('should parse json string', () => {
    const buffer = [Buffer.from('{"a": "1", "b": 2,"c": true}')];
    expect(jsonParser(buffer)).toStrictEqual({ a: '1', b: 2, c: true });
  });
});
