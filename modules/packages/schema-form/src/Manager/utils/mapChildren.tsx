import { Children, ReactElement, PropsWithChildren, ComponentProps, cloneElement } from 'react';

const checkTarget = (target: ReactElement, key: string, value: string | number): boolean => {
  const type = target.type as any;

  return !!type && type[key] === value;
};
type EleType = ReactElement<ComponentProps<PropsWithChildren<any>>>;

export const mapChildren = () => {
  let index = 0;
  const inner = (
    node: EleType,
    key: string,
    value: string | number,
    fn: (ele: EleType, index: number) => object
  ): Array<EleType> => {
    //Children.map 会改变key
    const map = Children.map || Array.prototype.map.call.bind(Array.prototype.map);
    return map(Children.count(node) === 1 ? [node] : node, _ => {
      const isTarget = checkTarget(_, key, value);

      if (isTarget) {
        return cloneElement(_, fn(_, index++));
      } else {
        const { props } = _;
        if (props && props.children) {
          return cloneElement(_, {}, ...inner(props.children, key, value, fn));
        } else {
          return _;
        }
      }
    });
  };
  return inner;
};
