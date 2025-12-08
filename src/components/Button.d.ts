import { ReactElement } from 'react';
type ButtonProps = {
    scale?: number;
    color?: string;
    activeColor?: string;
    font?: string;
    text?: string;
    fontSize?: number;
    fontColor?: string;
    handleClick?: any;
    position?: [number, number, number];
};
export default function Button(props: ButtonProps): ReactElement;
export {};
