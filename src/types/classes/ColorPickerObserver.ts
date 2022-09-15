import ColorChangeEvent from "../events/ColorChangeEvent";
import IObserver from "../interfaces/IObserver";

class ColorPickerObserver implements IObserver<null> {
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