enum HistoryEnum {
    undo = "undo",
    redo = "redo"
}

type HistoryEventData = {
    type: HistoryEnum;
    stackLength: number;
};

class HistoryEvent extends CustomEvent<HistoryEventData>{ };

export default HistoryEvent;
export { HistoryEnum, HistoryEventData };