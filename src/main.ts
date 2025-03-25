export class Knot<T> {
  data: T;
  next: Knot<T> | null;

  constructor(data: T) {
    this.data = data;
    this.next = null;
  }
}

export class ChainedList<T> {
  ptList: Knot<T> | null;

  constructor() {
    this.ptList = null;
  }

  include(data: T): void {
    const newKnot = new Knot(data);
    if (this.ptList === null) {
      this.ptList = newKnot;
    } else {
      let current = this.ptList;
      while (current.next !== null) {
        current = current.next;
      }
      current.next = newKnot;
    }
  }

  search(data: T): Knot<T> | null {
    let current = this.ptList;
    while (current !== null) {
      if (current.data === data) {
        return current;
      }
      current = current.next;
    }
    return null;
  }

  remove(data: T): boolean {
    if (this.ptList === null) {
      return false;
    }

    if (this.ptList.data === data) {
      this.ptList = this.ptList.next;
      return true;
    }

    let current = this.ptList;
    while (current.next !== null) {
      if (current.next.data === data) {
        current.next = current.next.next;
        return true;
      }
      current = current.next;
    }

    return false;
  }

  show(): void {
    let current = this.ptList;
    const elements: T[] = [];
    while (current !== null) {
      elements.push(current.data);
      current = current.next;
    }
    console.log([...elements, 'None'].join(' -> '));
  }
}

const list = new ChainedList();
list.include(10);
list.include(20);
list.include(30);
list.show();
console.log(list.search(20));
console.log(list.remove(20));
list.show();
