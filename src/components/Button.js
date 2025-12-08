import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState, useRef } from 'react';
import { RoundedBox, Text } from "@react-three/drei";
import { useSpring, animated, config } from '@react-spring/three';
export default function Button(props) {
    const buttonRef = useRef();
    const [hover, setHover] = useState(false);
    const position = props.position || [0, 0, 0];
    const scale = props.scale || 2;
    const color = props.color || '#3F37C9';
    const activeColor = props.activeColor || '#272275';
    const text = props.text || 'BUTTON';
    const fontSize = props.fontSize || .5;
    const fontColor = props.fontColor || '#ffffff';
    const handleClick = props.handleClick || undefined;
    const font = props.font || undefined;
    const buttonWidth = text.length * fontSize * 1.1;
    const buttonHeight = fontSize * 2.7;
    const { rotationY, rotationX } = useSpring({
        rotationX: hover ? -0.15 : 0,
        rotationY: hover ? -0.25 : 0,
        config: config.wobbly,
    });
    if (buttonRef.current) {
        buttonRef.current.position.x = position[0];
        buttonRef.current.position.y = position[1];
        buttonRef.current.position.z = position[2];
    }
    return _jsx(_Fragment, { children: _jsxs("group", { ref: buttonRef, children: [_jsx("ambientLight", { intensity: 1 }), _jsxs(animated.group, { scale: scale, onPointerDown: () => setHover(true), onPointerUp: () => setHover(false), onClick: handleClick, "rotation-y": rotationY, "rotation-x": rotationX, children: [_jsx("mesh", { children: _jsx(RoundedBox, { args: [buttonWidth, buttonHeight, .5], radius: .2, children: _jsx("meshStandardMaterial", { color: hover ? activeColor : color }) }) }), _jsxs(Text, { font: font, fontSize: fontSize, color: fontColor, "position-z": .3, children: [_jsx("meshBasicMaterial", { toneMapped: false }), text] })] })] }) });
}
