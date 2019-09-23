import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { IFormButtonGroupProps } from './grid';
import Sticky from 'react-stikky';
import Context from '../Context';
import { Button } from '@lianmed/components';
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

const isElementInViewport = (
  rect: ClientRect,
  {
    offset = 0,
    threshold = 0,
  }: {
    offset?: IOffset | number;
    threshold?: number;
  } = {}
) => {
  const { top, right, bottom, left, width, height } = rect;
  const intersection = {
    t: bottom,
    r: window.innerWidth - left,
    b: window.innerHeight - top,
    l: right,
  };

  const elementThreshold = {
    x: threshold * width,
    y: threshold * height,
  };

  return (
    intersection.t >= ((offset as IOffset).top || (offset as number) + elementThreshold.y) &&
    intersection.r >= ((offset as IOffset).right || (offset as number) + elementThreshold.x) &&
    intersection.b >= ((offset as IOffset).bottom || (offset as number) + elementThreshold.y) &&
    intersection.l >= ((offset as IOffset).left || (offset as number) + elementThreshold.x)
  );
};

export class FormButtonGroup extends Component<IFormButtonGroupProps> {
  public static defaultProps = {
    span: 24,
  };
  private isRegistered = false;
  public stickyRef = React.createRef();
  private formNode: HTMLElement;
  private onScrollHandler() {
    const stickyIns = this.stickyRef.current as any;

    return stickyIns.onScrollHandler(stickyIns);
  }
  private registerEvents() {
    const { scrollWrapper } = this.props;
    if (this.isRegistered || !scrollWrapper) return;

    this.isRegistered = true;
    const current = scrollWrapper.current;
    if (current) {
      current.addEventListener('scroll', this.onScrollHandler());
    }
  }
  private cancelEvents() {
    const { scrollWrapper } = this.props;
    if (this.isRegistered || !scrollWrapper) return;

    this.isRegistered = true;
    const current = scrollWrapper.current;
    if (current) {
      current.removeEventListener('scroll', this.onScrollHandler());
    }
  }
  componentDidUpdate() {
    this.registerEvents();
  }

  componentWillUnmount() {
    this.cancelEvents();
  }
  public render() {
    const { style } = this.props;
    return (
      <div>
        <Context.Consumer>
          {({ FormRef, submit } = {}) => {
            if (!FormRef) {
              return;
            }
            return (
              <Sticky
                ref={this.stickyRef}
                edge={'bottom'}
                triggerDistance={this.props.triggerDistance}
                zIndex={this.props.zIndex}
                getStickyBoundary={this.getStickyBoundaryHandler(FormRef)}
                style={{
                  borderTop: '1px solid #eee',
                  background: (style && style.background) || '#fff',
                  padding: (style && style.padding) || '8px 10px',
                  boxShadow: '0px -1px 1px 0px #ddd',
                  borderRadius: '2px',
                  display: 'flex',
                  justifyContent: 'flex-end',
                }}
              >
                <Button interval={2000} onClick={submit} size="small" type="primary">
                  提交
                </Button>
              </Sticky>
            );
          }}
        </Context.Consumer>
      </div>
    );
  }

  private getStickyBoundaryHandler(ref) {
    return () => {
      // eslint-disable-next-line react/no-find-dom-node
      this.formNode = this.formNode || (ReactDOM.findDOMNode(ref.current) as HTMLElement);
      if (this.formNode) {
        return isElementInViewport(this.formNode.getBoundingClientRect());
      }
      return true;
    };
  }
}
