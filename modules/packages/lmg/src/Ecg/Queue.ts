export default class Queue {
  B: number[] = [];
  capacity = 2048;

  EnQueue(C: any) {
    if (C == null) {
      return -1;
    }
    if (this.B.length >= this.capacity) {
      this.B.shift();
    }
    this.B.push(C);
  }
  DeQueue() {
    if (this.B.length == 0) {
      return null;
    } else {
      return this.B.shift();
    }
  }
  GetSize() {
    return this.B.length;
  }
  GetHead() {
    if (this.B.length == 0) {
      return null;
    } else {
      return this.B[0];
    }
  }
  MakeEmpty() {
    this.B.length = 0;
  }
  IsEmpty() {
    if (this.B.length == 0) {
      return true;
    } else {
      return false;
    }
  }
}