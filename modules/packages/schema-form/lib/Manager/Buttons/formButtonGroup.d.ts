import React, { Component } from 'react';
import { IFormButtonGroupProps } from './grid';
export interface IOffset {
    top: number | string;
    right: number | string;
    bottom: number | string;
    left: number | string;
}
export interface IOffset {
    top: number | string;
    right: number | string;
    bottom: number | string;
    left: number | string;
}
export declare class FormButtonGroup extends Component<IFormButtonGroupProps> {
    static defaultProps: {
        span: number;
    };
    private isRegistered;
    stickyRef: React.RefObject<unknown>;
    private formNode;
    private onScrollHandler;
    private registerEvents;
    private cancelEvents;
    componentDidUpdate(): void;
    componentWillUnmount(): void;
    render(): JSX.Element;
    private getStickyBoundaryHandler;
}
