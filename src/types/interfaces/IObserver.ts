interface IObserver<T> {
    //should only dispatch event if type matches
    subscribe: (element: HTMLElement, type: T) => void;
}

export default IObserver;