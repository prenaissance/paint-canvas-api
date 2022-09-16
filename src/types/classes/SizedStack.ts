import DLinkedList from "./DLinkedList";

// 100% is less efficient than an array because of GC
// should have been implemented with simple linked list, but I'm too lazy to refactor
class SizedStack<T> implements Iterable<T> {
    private _start: DLinkedList<T> | null;
    private _end: DLinkedList<T> | null;
    private _length = 0;

    get length() {
        return this._length;
    }

    constructor(private readonly _maxLength = 20) { }

    static fromIterable<T>(itt: Iterable<T>, maxLength = 20) {
        const stack = new SizedStack<T>(maxLength);
        for (const element of itt) {
            stack.push(element);
        }

        return stack;
    }

    push(value: T) {
        const element = new DLinkedList(value);
        if (this._length) {
            element.previous = this._end;
            this._end!.next = element;
            this._end = element;

            if (this._length > this._maxLength) {
                this._start = this._start!.next;
                this._start!.previous = null;
                this._length--;
            }
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
        const returnValue = this._end!.value;
        this._end = this._end!.previous;
        this._end!.next = null;
        this._length--;

        return returnValue;
    }

    peek() {
        if (!this._length) {
            return null;
        }
        return this._end!.value;
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

export default SizedStack;