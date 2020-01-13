import _remove from 'lodash/remove';

describe('Array', () => {
  // given
  const
    files = [
      new File(['arquivoBits'], 'arquivo1.pdf'),
      new File(['arquivoBits'], 'arquivo2.pdf'),
      new File(['arquivoBits'], 'arquivo3.pdf'),
      new File(['arquivoBits'], 'arquivo4.pdf'),
      new File(['arquivoBits'], 'arquivo5.pdf'),
      new File(['arquivoBits'], 'arquivo6.pdf'),
    ],
    sourceArray = {
      arquivos: [
        {
          link: 'localhost:8080/arquivo/6481',
          name: 'apendice.pdf',
          pages: 30
        },
        {
          link: 'localhost:8080/arquivo/6482',
          name: 'anexo.pdf',
          pages: 50
        },
        files[0],
        {
          link: 'localhost:8080/arquivo/6481',
          name: 'embargoDeclaracao.pdf',
          pages: 30
        },
        files[1],
        files[2],
        files[3],
        files[4],
        {
          link: 'localhost:8080/arquivo/6482',
          name: 'liminar.pdf',
          pages: 50
        },
        files[5],
      ]
    },
    expectArray = {
      arquivos: [
        {
          link: 'localhost:8080/arquivo/6481',
          name: 'apendice.pdf',
          pages: 30
        },
        {
          link: 'localhost:8080/arquivo/6482',
          name: 'anexo.pdf',
          pages: 50
        },
        {
          link: 'localhost:8080/arquivo/6481',
          name: 'embargoDeclaracao.pdf',
          pages: 30
        },
        {
          link: 'localhost:8080/arquivo/6482',
          name: 'liminar.pdf',
          pages: 50
        },
      ]
    };

  // when
  const fileList = _remove(sourceArray.arquivos, a => a instanceof File);

  // then
  it('should remove an element', () => {
    expect(sourceArray.arquivos).toEqual(expectArray.arquivos);
  });

  it('should return without removed element', () => {
    expect(fileList).toEqual(files);
  });
});
