class DLinkedList<T>{
    constructor(
        public value: T,
        public previous: DLinkedList<T> | null = null,
        public next: DLinkedList<T> | null = null
    ) { }
}

export default DLinkedList;