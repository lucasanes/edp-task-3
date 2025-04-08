import { performance } from 'perf_hooks';
import * as readline from 'readline';

export class SearchAlgorithms {
  private numbers: number[];

  constructor() {
    this.numbers = [];
  }

  public generateRandomList(size: number): void {
    const numbersSet = new Set<number>();
    while (numbersSet.size < size) {
      numbersSet.add(Math.floor(Math.random() * 1000000));
    }
    this.numbers = Array.from(numbersSet);
  }

  public getNumbers(): number[] {
    return this.numbers;
  }

  public sequentialSearch(target: number): number {
    for (let i = 0; i < this.numbers.length; i++) {
      if (this.numbers[i] === target) {
        return i;
      }
    }
    return -1;
  }

  public binarySearch(target: number): number {
    const sortedNumbers = [...this.numbers].sort((a, b) => a - b);
    return this.binarySearchRecursive(
      sortedNumbers,
      target,
      0,
      sortedNumbers.length - 1
    );
  }

  private binarySearchRecursive(
    list: number[],
    target: number,
    left: number,
    right: number
  ): number {
    if (left > right) {
      return -1;
    }

    const mid = Math.floor((left + right) / 2);

    if (list[mid] === target) {
      return mid;
    }

    if (list[mid] > target) {
      return this.binarySearchRecursive(list, target, left, mid - 1);
    }

    return this.binarySearchRecursive(list, target, mid + 1, right);
  }

  public measureExecutionTime(func: () => void): number {
    const start = performance.now();
    func();
    const end = performance.now();
    return end - start;
  }
}

async function main() {
  const searchAlgorithms = new SearchAlgorithms();
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  const sizes = [10, 100, 1000, 10000, 100000];

  console.log('Gerando listas...');

  const target = await new Promise<number>((resolve) => {
    rl.question('\nDigite um número para buscar: ', (answer) => {
      resolve(parseInt(answer));
    });
  });

  console.log('\nResultados da busca:\n');
  console.log('Tamanho\t\tBusca Sequencial (ms)\tBusca Binária (ms)');
  console.log('-'.repeat(80));

  for (const size of sizes) {
    searchAlgorithms.generateRandomList(size);

    const sequentialTime = searchAlgorithms.measureExecutionTime(() => {
      searchAlgorithms.sequentialSearch(target);
    });

    const binaryTime = searchAlgorithms.measureExecutionTime(() => {
      searchAlgorithms.binarySearch(target);
    });

    console.log(
      `${size}\t\t${sequentialTime.toFixed(4)}\t\t\t${binaryTime.toFixed(4)}`
    );
  }

  rl.close();
}

if (require.main === module) {
  main().catch(console.error);
}
