import { Suit } from "./Suit";

export interface IProps extends React.HTMLProps<HTMLDivElement> {
    data: any;
    mutableSuitObject?: { suit: (Suit | any) };
    onReady: (suit: Suit) => void;
    itemHeight?: number;
    suitType?: 0 | 1 | 2,
    showEcg?: boolean
  }