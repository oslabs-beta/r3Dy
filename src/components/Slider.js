import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { Text, RoundedBox } from "@react-three/drei";
import { useThree, useFrame } from "@react-three/fiber";
import { useGesture } from "@use-gesture/react";
import { useSpring, animated } from '@react-spring/three';
import { useState, useRef } from "react";
export default function Slider({ maxValue, value, steps, onChange }) {
    const max = maxValue ? maxValue : 10;
    const spacing = steps ? steps : 2;
    const spaces = max / spacing;
    const xIncrements = Math.round(12 / (spaces + 1) * 10);
    const [slider, setSlider] = useState(0);
    let change;
    if (onChange) {
        change = onChange;
    }
    else {
        change = setSlider;
    }
    const [outline, setOutline] = useState(false);
    const valueArray = [];
    for (let i = 0; i < spaces + 1; i++) {
        valueArray.push(max - i * spacing);
    }
    valueArray.sort((a, b) => { return a - b; });
    const { size, viewport } = useThree();
    const aspect = size.width / viewport.width;
    const [spring, set] = useSpring(() => ({ scale: [1, 1, 1], position: [0, 0, 0], rotation: [0, 0, 0],
    }));
    const bind = useGesture({
        onDrag: ({ offset: [x, y] }) => {
            const newX = Math.round(x / aspect * 10);
            if (spaces % 2 !== 0) {
                if (newX % xIncrements === 0 && newX !== 0) {
                    if (newX / xIncrements < 0 && (newX / xIncrements + (spaces + 1) / 2) >= 0) {
                        change(valueArray[newX / xIncrements + (spaces + 1) / 2]);
                        set({ position: [x / aspect, y * 0, 0] });
                    }
                    else if (newX / xIncrements > 0 && (newX / xIncrements + (spaces + 1) / 2 - 1) < valueArray.length) {
                        change(valueArray[newX / xIncrements + (spaces + 1) / 2 - 1]);
                        set({ position: [x / aspect, y * 0, 0] });
                    }
                }
            }
            else {
                if (newX % xIncrements === 0 && (newX / xIncrements + spaces / 2) >= 0 && (newX / xIncrements + spaces / 2) < valueArray.length) {
                    change(valueArray[newX / xIncrements + spaces / 2]);
                    set({ position: [x / aspect, y * 0, 0] });
                }
            }
        },
        onHover: ({ hovering }) => {
            hovering ? setOutline(true) : setOutline(false);
            set({ scale: hovering ? [1.2, 1.2, 1.2] : [1.0, 1.0, 1.0] });
        }
    });
    const wireframeRef = useRef();
    useFrame(() => {
        if (outline) {
            wireframeRef.current ? wireframeRef.current.rotation.y += .01 : null;
        }
    });
    return (_jsx(_Fragment, { children: _jsxs("group", { children: [outline && _jsxs(animated.mesh, Object.assign({}, spring, bind(), { ref: wireframeRef, scale: 1.3, castShadow: true, children: [_jsx("sphereGeometry", { args: [1, 32, 16] }), _jsx("meshBasicMaterial", { wireframe: true, color: 'white' })] })), _jsxs(animated.mesh, Object.assign({}, spring, bind(), { castShadow: true, children: [_jsx("sphereGeometry", { args: [1, 32, 16] }), _jsx("meshBasicMaterial", { wireframe: false, color: '#3F37C9' })] })), _jsx(RoundedBox, { args: [3.9, .2, 0], position: [0, 0, -2], radius: 0.1, scale: 4, children: _jsx("meshBasicMaterial", { color: "#3F37C9" }) }), _jsxs(animated.mesh, Object.assign({}, spring, bind(), { children: [_jsx(Text, { fontSize: .5, castShadow: true, "position-y": 1.5, color: '#3F37C9', font: 'fonts/Inter-Bold.ttf', overflowWrap: 'break-word', children: value ? value : slider }), _jsx("meshBasicMaterial", { wireframe: false, color: '#3F37C9' })] }))] }) }));
}
{
}
