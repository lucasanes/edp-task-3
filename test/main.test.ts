import { beforeEach, describe, expect, it } from '@jest/globals';

import { ChainedList } from '../src/main';

describe('ChainedList', () => {
  let list: ChainedList<number>;

  beforeEach(() => {
    list = new ChainedList<number>();
  });

  it('deve incluir elementos na lista', () => {
    list.include(10);
    list.include(20);
    list.include(30);
    expect(list.search(10)).not.toBeNull();
    expect(list.search(20)).not.toBeNull();
    expect(list.search(30)).not.toBeNull();
  });

  it('deve remover um elemento existente', () => {
    list.include(10);
    list.include(20);
    list.include(30);
    const removido = list.remove(20);
    expect(removido).toBe(true);
    expect(list.search(20)).toBeNull();
  });

  it('deve retornar false ao remover um elemento inexistente', () => {
    list.include(10);
    list.include(30);
    const removido = list.remove(20);
    expect(removido).toBe(false);
  });

  it('deve buscar um elemento existente', () => {
    list.include(10);
    list.include(20);
    const encontrado = list.search(20);
    expect(encontrado?.data).toBe(20);
  });
});
