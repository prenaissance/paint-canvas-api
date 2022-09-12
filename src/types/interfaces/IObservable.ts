import { ColorTypeEnum } from "../events/ColorChangeEvent";
import { HistoryEnum } from "../events/HistoryEvent";
import { ToolsEnum } from "../events/ToolsEvent";

interface IObservable<T> {
    //should only dispatch event if type matches
    subscribe: (element: HTMLElement, type: T) => void;
}

export default IObservable;