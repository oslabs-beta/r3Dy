import React from 'react';
import SlideSwitch from './SlideSwitch'
import FlickSwitch from './FlickSwitch'

 
type SwitchProps = {
    color?: string;
    mainColor?: string;
    size?: number;
    callback?: any;
    slideColor?: string;
    tension?: number;
    model?: number;
}


export default function Loader(props: SwitchProps) {
    const model: number = props.model || 1
    if (model === 1) {
        return <SlideSwitch {...props} />
    } else if (model === 2) {
        return <FlickSwitch {...props} />
    } else {
        return <ChipLoader {...props} />
    }
}

