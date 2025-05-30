import { beforeEach, describe, expect, it, jest } from '@jest/globals';
import { SearchAnalysis } from '../src/main';

describe('SearchAnalysis', () => {
  let analysis: SearchAnalysis;

  beforeEach(() => {
    analysis = new SearchAnalysis();
  });

  describe('generateLists', () => {
    it('should generate the correct number of lists with expected sizes', () => {
      const sizes = [10, 100, 1000, 10000, 100000];
      expect(analysis['lists'].length).toBe(sizes.length);
      sizes.forEach((size, i) => {
        expect(analysis['lists'][i].length).toBe(size);
      });
    });
  });

  describe('sequentialSearch', () => {
    it('should return index when value is found', () => {
      const list = [10, 20, 30];
      const index = analysis['sequentialSearch'](list, 20);
      expect(index).toBe(1);
    });

    it('should return -1 when value is not found', () => {
      const list = [1, 2, 3];
      expect(analysis['sequentialSearch'](list, 5)).toBe(-1);
    });
  });

  describe('binarySearchRecursive', () => {
    const list = [1, 2, 3, 4, 5, 6];

    it('should return index when value is found', () => {
      expect(
        analysis['binarySearchRecursive'](list, 4, 0, list.length - 1)
      ).toBe(3);
    });

    it('should return -1 when value is not found', () => {
      expect(
        analysis['binarySearchRecursive'](list, 99, 0, list.length - 1)
      ).toBe(-1);
    });
  });

  describe('promptUser', () => {
    it('should return parsed number from user input', async () => {
      jest.resetModules();
      jest.mock('readline');

      const readline = await import('readline');
      const mockedRl = {
        question: jest.fn((_q: string, cb: (ans: string) => void) => cb('123')),
        close: jest.fn(),
      };

      (readline.createInterface as jest.Mock).mockReturnValue(mockedRl as any);

      const result = await (analysis as any).promptUser('Enter number:');
      expect(result).toBe(123);
    });

    it('should return NaN if input is not a number', async () => {
      jest.resetModules();
      jest.mock('readline');

      const readline = await import('readline');
      const mockedRl = {
        question: jest.fn((_q: string, cb: (ans: string) => void) => cb('abc')),
        close: jest.fn(),
      };

      (readline.createInterface as jest.Mock).mockReturnValue(mockedRl as any);

      const result = await (analysis as any).promptUser('Enter number:');
      expect(result).toBeNaN();
    });
  });

  describe('printTable', () => {
    it('should format and print table correctly', () => {
      const mockLog = jest.spyOn(console, 'log').mockImplementation(() => {});
      const mockResults = [
        {
          size: 10,
          foundSeq: 'Sim',
          timeSeq: '0.0001 ms',
          foundBin: 'Sim',
          timeBin: '0.00005 ms',
        },
      ];
      (analysis as any).printTable(mockResults);

      expect(mockLog).toHaveBeenCalledWith(
        expect.stringContaining('Resultado das buscas:')
      );
      expect(mockLog).toHaveBeenCalledWith(
        expect.stringMatching(
          /\|\s+10\s+\|\s+Sim\s+\|\s+0.0001 ms\s+\|\s+Sim\s+\|\s+0.00005 ms\s+\|/
        )
      );

      mockLog.mockRestore();
    });
  });

  describe('run', () => {
    it('should perform searches and print results when target is found', async () => {
      analysis['lists'] = [
        [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
        [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20],
        [
          1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
          21, 22, 23, 24, 25, 26, 27, 28, 29, 30,
        ],
        [
          1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
          21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37,
          38, 39, 40,
        ],
        [
          1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
          21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37,
          38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50,
        ],
      ];

      const promptMock = jest
        .spyOn(analysis as any, 'promptUser')
        .mockResolvedValue(5);

      const logSpy = jest.spyOn(console, 'log').mockImplementation(() => {});

      await analysis.run();

      expect(promptMock).toHaveBeenCalled();
      expect(logSpy).toHaveBeenCalledWith(
        expect.stringContaining('Resultado das buscas:')
      );
      expect(logSpy).toHaveBeenCalledWith(
        expect.stringMatching(/\|\s+10\s+\|\s+Sim\s+\|/)
      );

      logSpy.mockRestore();
    });

    it('should show "Não" when target is not found in any list', async () => {
      const logSpy = jest.spyOn(console, 'log').mockImplementation(() => {});

      await analysis.run();

      expect(logSpy).toHaveBeenCalledWith(
        expect.stringMatching(/\|\s+10\s+\|\s+Não\s+\|/)
      );
      logSpy.mockRestore();
    });

    it('should handle NaN input gracefully', async () => {
      const promptMock = jest
        .spyOn(analysis as any, 'promptUser')
        .mockResolvedValue(NaN);

      const logSpy = jest.spyOn(console, 'log').mockImplementation(() => {});

      await analysis.run();

      // ainda tenta executar, mas provavelmente todos serão "Não"
      expect(logSpy).toHaveBeenCalledWith(expect.stringMatching(/Não/));
      logSpy.mockRestore();
    });
  });
});
