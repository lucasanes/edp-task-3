# Projeto EDP Task 3

Este projeto demonstra a implementação e comparação de algoritmos de busca (sequencial e binária) em TypeScript.

## Descrição

O projeto implementa uma classe `SearchAlgorithms` que contém:

- Geração de listas aleatórias de números
- Busca Sequencial
- Busca Binária
- Medição de tempo de execução

O programa gera listas de diferentes tamanhos (10, 100, 1000, 10000, 100000) e compara o tempo de execução entre os dois métodos de busca.

## Pré-requisitos

1. **Node.js** instalado
2. **ts-node** instalado globalmente:

```shell
npm install -g ts-node
```

## Instalação

```shell
npm install
```

## Execução

Para rodar o projeto:

```shell
npm start
```

Este comando executa o arquivo main.ts via `ts-node`. O programa irá:

1. Gerar listas de números aleatórios
2. Solicitar um número para buscar
3. Executar as buscas sequencial e binária
4. Mostrar os tempos de execução para cada tamanho de lista

## Testes

O projeto inclui testes unitários abrangentes que cobrem:

### Funcionalidades Testadas

- Geração de listas aleatórias
- Busca sequencial
- Busca binária
- Formatação de tabela de resultados
- Interação com usuário
- Execução completa do programa

### Executando os Testes

Para executar os testes:

```shell
npm run test
```

Para executar os testes com cobertura:

```shell
npm run test:cov
```

## Discussão

### Impacto do Tamanho da Lista nos Tempos de Execução

#### (a) Busca Sequencial

A busca sequencial é diretamente afetada pelo tamanho da lista de forma linear (O(n)). Isto significa que:

- O tempo de execução aumenta proporcionalmente ao tamanho da lista
- Para uma lista de tamanho n, no pior caso, serão necessárias n comparações
- Se dobrarmos o tamanho da lista, o tempo de busca aproximadamente dobra
- O tempo depende da posição do elemento:
  - Melhor caso: elemento no início (O(1))
  - Pior caso: elemento no final ou não existe (O(n))
  - Caso médio: n/2 comparações

#### (b) Busca Binária

A busca binária tem um comportamento logarítmico (O(log n)), o que significa:

- O tempo de execução aumenta de forma muito mais lenta que a busca sequencial
- Dobrar o tamanho da lista adiciona apenas uma comparação extra
- Para uma lista de 1000 elementos: máximo de 10 comparações
- Para uma lista de 1000000 elementos: máximo de 20 comparações
- Requer que a lista esteja ordenada

#### (c) Implicações Práticas

A escolha entre os algoritmos deve considerar:

**Quando Usar Busca Sequencial:**

- Em listas pequenas (menos de 100 elementos)
- Quando a lista não está ordenada e será pesquisada poucas vezes
- Quando os elementos são frequentemente encontrados no início da lista
- Em situações onde a simplicidade de implementação é mais importante que a performance

**Quando Usar Busca Binária:**

- Em listas grandes (mais de 1000 elementos)
- Quando a lista já está ordenada
- Em situações onde múltiplas buscas serão realizadas na mesma lista
- Quando o tempo de resposta é crítico

**Considerações Adicionais:**

- **Manutenção:** Busca sequencial é mais simples de manter e entender
- **Memória:** Busca binária recursiva pode consumir mais memória devido à pilha de chamadas
- **Ordenação:** O custo de ordenação deve ser considerado se a lista não estiver ordenada
- **Frequência de Atualizações:** Em listas que são frequentemente atualizadas, a busca sequencial pode ser mais prática

## Criadores

- Kauã Landi Fernando - 06009262
- Lucas Abrahão Anes - 06009881
- Murilo de Melo Mouteira - 06010561
