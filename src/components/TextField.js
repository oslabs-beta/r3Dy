import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState, useRef, useEffect } from 'react';
import { Text, Html, RoundedBox } from '@react-three/drei';
import { useSpring, animated, config } from '@react-spring/three';
import { useThree } from '@react-three/fiber';
const newShade = (hexColor, magnitude) => {
    hexColor = hexColor.replace(`#`, ``);
    if (hexColor.length === 6) {
        const decimalColor = parseInt(hexColor, 16);
        let r = (decimalColor >> 16) + magnitude;
        r > 255 && (r = 255);
        r < 0 && (r = 0);
        let g = (decimalColor & 0x0000ff) + magnitude;
        g > 255 && (g = 255);
        g < 0 && (g = 0);
        let b = ((decimalColor >> 8) & 0x00ff) + magnitude;
        b > 255 && (b = 255);
        b < 0 && (b = 0);
        return `#${(g | (b << 8) | (r << 16)).toString(16)}`;
    }
    else {
        return hexColor;
    }
};
const TextField = ({ color, focusColor, width, height, backgroundColor, font, fontSize, theme, position, onChange }) => {
    const [type, setType] = useState('');
    const [active, setActive] = useState(false);
    const [dist, setDist] = useState(0);
    const [caretIndex, setCaretIndex] = useState(0);
    const [showCaret, setShowCaret] = useState(true);
    const meshRef = useRef(null);
    const boxRef = useRef(null);
    const groupRef = useRef(null);
    const lightRef = useRef(null);
    const textRef = useRef(null);
    let fontColor = color ? color : 'black';
    let fontFocusColor = focusColor ? focusColor : '#3F37C9';
    let fontBackgroundColor = backgroundColor ? backgroundColor : '#F4FAFF';
    if (theme === 'dark') {
        fontColor = '#FFFFFF';
        fontFocusColor = '#4895EF';
        fontBackgroundColor = '#0D1B2A';
    }
    const backgroundColorSecondary = newShade(fontBackgroundColor, -50);
    if (height && height > 5)
        height = 5;
    const boxHeight = height ? height : 3;
    const boxWidth = width ? width : 15;
    const boxDepth = 0.4;
    const { camera } = useThree();
    const canvas = document.querySelector('canvas');
    useEffect(() => {
        const boxPositionZ = boxRef.current.position.z;
        const camDist = camPositionZ - boxPositionZ;
        setDist(camDist);
    }, [boxRef]);
    const vertFov = camera.fov * Math.PI / 180;
    const textHeight = 2 * Math.tan(vertFov / 2) * dist;
    const textWidth = textHeight * camera.aspect;
    const camPositionZ = camera.position.z;
    const textPixelHeight = canvas ? canvas.offsetHeight * (boxHeight / textHeight) : 0;
    const textPixelWidth = canvas ? canvas.offsetWidth * (boxWidth / textWidth) : 0;
    let displayText = '';
    const typeArray = type.split('');
    const typeWithCaret = [...typeArray.slice(0, caretIndex), '|', ...typeArray.slice(caretIndex)];
    displayText = showCaret ? typeWithCaret.join('') : type;
    const inputStyles = {
        width: `${textPixelWidth}px`,
        height: `${textPixelHeight}px`,
        opacity: 0,
    };
    const { rotationY, rotationX } = useSpring({
        rotationX: active ? -0.1 : 0,
        rotationY: active ? -0.2 : 0,
        config: config.wobbly,
    });
    const textPosition = -(Math.floor((boxWidth / 5))) * 2.2;
    const handleKeyUp = (e) => {
        if (e.currentTarget.selectionStart)
            setCaretIndex(e.currentTarget.selectionStart);
    };
    const handleType = (e) => {
        setType(e.currentTarget.value);
        if (onChange)
            onChange(e);
    };
    const handleFocus = () => {
        meshRef.current.color.set(backgroundColorSecondary);
        textRef.current.color = fontFocusColor;
        setShowCaret(true);
    };
    const handleUnfocused = () => {
        meshRef.current.color.set(fontBackgroundColor);
        textRef.current.color = fontColor;
        setShowCaret(false);
    };
    return (_jsxs(_Fragment, { children: [_jsx("directionalLight", { intensity: 0.7, position: [5, 2, 5], ref: lightRef, castShadow: true, "shadow-mapSize": [1024, 1024] }), _jsx("ambientLight", { intensity: 1, color: "#E6F0FF" }), _jsxs(animated.group, { ref: groupRef, "rotation-y": rotationY, "rotation-x": rotationX, position: position ? position : [0, 0, 0], children: [_jsxs("mesh", { castShadow: true, children: [_jsx(Html, { center: true, children: _jsx("input", { onKeyUp: handleKeyUp, type: "text", style: inputStyles, onChange: handleType, onFocus: () => {
                                        handleFocus();
                                        setActive(true);
                                    }, onBlur: () => {
                                        handleUnfocused();
                                        setActive(false);
                                    } }) }), _jsxs(Text, { ref: textRef, castShadow: true, fontSize: fontSize ? fontSize : 1, "position-x": textPosition, anchorX: 'left', color: fontColor, font: font ? font : undefined, maxWidth: boxWidth, textAlign: 'left', overflowWrap: 'break-word', children: [displayText, _jsx("meshBasicMaterial", { toneMapped: false })] })] }), _jsx("mesh", { receiveShadow: true, "position-z": -.3, ref: boxRef, children: _jsx(RoundedBox, { receiveShadow: true, args: [boxWidth, boxHeight, boxDepth], smoothness: 4, radius: 0.2, children: _jsx("meshStandardMaterial", { color: fontBackgroundColor, ref: meshRef }) }) })] })] }));
};
export default TextField;
