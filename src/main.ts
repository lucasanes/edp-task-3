export class SearchAnalysis {
  private listSizes: number[] = [10, 100, 1000, 10000, 100000];
  private lists: number[][] = [];

  constructor() {
    this.generateLists();
  }

  private generateLists(): void {
    for (const size of this.listSizes) {
      const set = new Set<number>();
      while (set.size < size) {
        set.add(Math.floor(Math.random() * 1000000));
      }
      this.lists.push(Array.from(set));
    }
  }

  private sequentialSearch(list: number[], target: number): number {
    for (let i = 0; i < list.length; i++) {
      if (list[i] === target) {
        return i;
      }
    }
    return -1;
  }

  private binarySearchRecursive(
    list: number[],
    target: number,
    left: number,
    right: number
  ): number {
    if (left > right) return -1;
    const mid = Math.floor((left + right) / 2);
    if (list[mid] === target) return mid;
    if (target < list[mid]) {
      return this.binarySearchRecursive(list, target, left, mid - 1);
    } else {
      return this.binarySearchRecursive(list, target, mid + 1, right);
    }
  }

  public async run(): Promise<void> {
    const target = await this.promptUser(
      'Digite um número inteiro para buscar em todas as listas: '
    );
    const results: {
      size: number;
      foundSeq: string;
      timeSeq: string;
      foundBin: string;
      timeBin: string;
    }[] = [];

    for (let i = 0; i < this.listSizes.length; i++) {
      const size = this.listSizes[i];
      const list = this.lists[i];

      const seqStart = performance.now();
      const seqIndex = this.sequentialSearch(list, target);
      const seqEnd = performance.now();
      const seqTime = (seqEnd - seqStart).toFixed(4);

      const sortedList = [...list].sort((a, b) => a - b);
      const binStart = performance.now();
      const binIndex = this.binarySearchRecursive(
        sortedList,
        target,
        0,
        sortedList.length - 1
      );
      const binEnd = performance.now();
      const binTime = (binEnd - binStart).toFixed(4);

      results.push({
        size: size,
        foundSeq: seqIndex !== -1 ? 'Sim' : 'Não',
        timeSeq: `${seqTime} ms`,
        foundBin: binIndex !== -1 ? 'Sim' : 'Não',
        timeBin: `${binTime} ms`,
      });
    }

    this.printTable(results);
  }

  private printTable(results: any[]): void {
    console.log('\nResultado das buscas:\n');
    console.log(
      `| Tamanho da Lista | Encontrado Seq | Tempo Seq     | Encontrado Bin | Tempo Bin     |`
    );
    console.log(
      `|------------------|----------------|---------------|----------------|---------------|`
    );
    for (const row of results) {
      console.log(
        `| ${row.size.toString().padEnd(16)} | ${row.foundSeq.padEnd(14)} | ${row.timeSeq.padEnd(13)} | ${row.foundBin.padEnd(14)} | ${row.timeBin.padEnd(13)} |`
      );
    }
  }

  private async promptUser(question: string): Promise<number> {
    const readline = await import('readline');
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    return new Promise((resolve) => {
      rl.question(question, (answer) => {
        rl.close();
        resolve(Number(answer.trim()));
      });
    });
  }
}

// Executar
const analysis = new SearchAnalysis();
analysis.run();
