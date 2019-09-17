import React from 'react';

import { ColProps } from 'antd/es/col';

export interface IFormButtonGroupProps {
  sticky?: boolean;
  style?: React.CSSProperties;
  itemStyle?: React.CSSProperties;
  className?: string;
  align?: 'left' | 'right' | 'start' | 'end' | 'top' | 'bottom' | 'center';
  triggerDistance?: number;
  zIndex?: number;
  span?: ColSpanType;
  offset?: ColSpanType;
  scrollWrapper?: React.RefObject<any>;
  [a: string]: any;
}

type ColSpanType = number | string;

export interface ColSize {
  span?: ColSpanType;
  offset?: ColSpanType;
}

export interface IRowProps {
  prefix?: string;
  pure?: boolean;
  wrap?: boolean;
  fixed?: boolean;
  hidden?: boolean;
  className?: string;
  fixedWidth?: string | number;
  style?: React.CSSProperties;
  component?: keyof JSX.IntrinsicElements | React.ComponentType<any>;
  gutter?: string;
  align?: string | number;
  justify?: string | number;
  children: React.ReactNode;
}

export interface IColProps extends ColProps {
  prefix?: string;
  pure?: boolean;
  className?: string;
  fixedSpan?: string | number;
  fixedOffset?: string | number;
  hidden?: boolean;
  align?: any;
  component?: keyof JSX.IntrinsicElements | React.ComponentType<any>;
  children?: React.ReactNode;
  xxs?: ColSpanType | ColSize;
  xs?: ColSpanType | ColSize;
  s?: ColSpanType | ColSize;
  m?: ColSpanType | ColSize;
  l?: ColSpanType | ColSize;
  xl?: ColSpanType | ColSize;
}
