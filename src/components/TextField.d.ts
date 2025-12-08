import React from 'react';
type TextFieldProps = {
    color?: string;
    focusColor?: string;
    width?: number;
    height?: number;
    backgroundColor?: string;
    font?: string;
    fontSize?: number;
    theme?: string;
    position?: [number, number, number];
    onChange?: (e: React.FormEvent<HTMLInputElement>) => void;
};
declare const TextField: ({ color, focusColor, width, height, backgroundColor, font, fontSize, theme, position, onChange }: TextFieldProps) => JSX.Element;
export default TextField;
