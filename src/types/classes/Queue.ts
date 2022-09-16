import DLinkedList from "./DLinkedList";

class Queue<T> implements Iterable<T> {
    private _start: DLinkedList<T> | null = null;
    private _end: DLinkedList<T> | null = null;
    private _length = 0;

    get length() {
        return this._length;
    }

    push(value: T) {
        const element = new DLinkedList(value);
        if (this._length) {
            this._end!.next = element;
            this._end = element;
        }
        else {
            this._end = this._start = element;
        }
        this._length++;
    }

    pop() {
        if (!this._length) {
            return null;
        }
        const returnValue = this._start!.value;
        if (this._length === 1) {
            this._end = this._start = null;
        }
        else {
            this._start = this._start!.next;
            this._start!.previous = null;
        }
        this._length--;

        return returnValue;
    }

    peek() {
        if (!this._length) {
            return null;
        }
        return this._start!.value;
    }

    empty() {
        return this._length === 0;
    }

    *[Symbol.iterator](): Iterator<T, any, undefined> {
        let current = this._start;
        while (current) {
            yield current.value;
            current = current.next;
        }

        return this[Symbol.iterator];
    }
}

export default Queue;