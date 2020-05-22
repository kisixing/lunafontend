export default class Queue {
    B: number[];
    capacity: number;
    constructor(capacity?: number);
    EnQueue(C: any): number;
    DeQueue(): number;
    GetSize(): number;
    GetHead(): number;
    MakeEmpty(): void;
    IsEmpty(): boolean;
}
