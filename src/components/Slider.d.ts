import React from "react";
type SliderProps = {
    maxValue?: number;
    value?: number;
    steps?: number;
    onChange?: React.Dispatch<React.SetStateAction<number>>;
};
export default function Slider({ maxValue, value, steps, onChange }: SliderProps): import("react/jsx-runtime").JSX.Element;
export {};
