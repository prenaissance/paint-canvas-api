import ColorChangeEvent, { ColorTypeEnum } from "../events/ColorChangeEvent";
import IObservable from "../interfaces/IObservable";

class ColorPickerObserver implements IObservable<null> {
    private readonly _subscribers: HTMLElement[] = [];

    subscribe(element: HTMLElement) {
        this._subscribers.push(element);
    };

    dispatch(color: string) {
        const event = new ColorChangeEvent("colorchange", { detail: { color } });
        this._subscribers.forEach((element) => {
            element.dispatchEvent(event);
        });
    }
}

export default ColorPickerObserver;