import Draw from "../../Draw";
import { Suit } from "../Suit";
import ScrollEl from "../../ScrollBar/ScrollEl";
export declare class DrawSelect extends Draw {
    selectrpstart: number;
    selectend: number;
    selectrpend: number;
    selectflag: boolean;
    suit: Suit;
    selectstart: number;
    selectstartposition: number;
    selectingBar: ScrollEl;
    startingBar: ScrollEl;
    endingBar: ScrollEl;
    get selectingBarPoint(): number;
    get $selectrpend(): number;
    set $selectrpend(value: number);
    get $selectrpstart(): number;
    set $selectrpstart(value: number);
    constructor(canvas: HTMLCanvasElement, suit: Suit, width?: number, height?: number);
    init(): void;
    showselect: (start?: number, end?: number) => void;
    selectBasedOnStartingBar(isLeft?: boolean): void;
    updateSelectCur(): void;
    createBar(): void;
}
