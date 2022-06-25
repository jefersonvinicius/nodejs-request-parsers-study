import { multipartParser } from '@app/parsers';

describe('multipartParser', () => {
  it('should parse multipart string (1 field)', () => {
    const buffer = [Buffer.from(multipartWith1Field())];
    const result = multipartParser(buffer);
    expect(result).toStrictEqual({ name: 'Jeferson' });
  });

  it('should parse multipart string (2 field)', () => {
    const buffer = [Buffer.from(multipartWith2Fields())];
    const result = multipartParser(buffer);
    expect(result).toStrictEqual({ name: 'Jeferson', outro: 'name' });
  });

  it('should parse multipart with multiline field string (2 field)', () => {
    const buffer = [Buffer.from(multipartWithMultilineField())];
    const result = multipartParser(buffer);
    expect(result).toStrictEqual({ name: 'Jeferson', multiline: 'mult\nline\ntext\ndata' });
  });

  it.todo('should parse multipart with file field');
  it.todo('should parse multipart with array field');
});

function multipartWith1Field() {
  return (
    '--X-INSOMNIA-BOUNDARY\r\n' +
    'Content-Disposition: form-data; name="name"\r\n' +
    '\r\n' +
    'Jeferson\r\n' +
    '--X-INSOMNIA-BOUNDARY--\r\n'
  );
}

function multipartWith2Fields() {
  return (
    '--X-INSOMNIA-BOUNDARY\r\n' +
    'Content-Disposition: form-data; name="name"\r\n' +
    '\r\n' +
    'Jeferson\r\n' +
    '--X-INSOMNIA-BOUNDARY\r\n' +
    'Content-Disposition: form-data; name="outro"\r\n' +
    '\r\n' +
    'name\r\n' +
    '--X-INSOMNIA-BOUNDARY--\r\n'
  );
}

function multipartWithMultilineField() {
  return (
    '--X-INSOMNIA-BOUNDARY\r\n' +
    'Content-Disposition: form-data; name="name"\r\n' +
    '\r\n' +
    'Jeferson\r\n' +
    '--X-INSOMNIA-BOUNDARY\r\n' +
    'Content-Disposition: form-data; name="multiline"\r\n' +
    '\r\n' +
    'mult\n' +
    'line\n' +
    'text\n' +
    'data\r\n' +
    '--X-INSOMNIA-BOUNDARY--\r\n'
  );
}

function multipartiWithFileField() {}
