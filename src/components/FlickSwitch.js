import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useRef, useState } from 'react';
import { useSpring, animated } from '@react-spring/three';
import { MeshStandardMaterial } from 'three';
export default function FlickSwitch({ color, size, callback, positionX, positionY, positionZ }) {
    const [active, setActive] = useState(false);
    const cube = useRef(null);
    const group = useRef(null);
    const metallicMaterial = new MeshStandardMaterial({
        color: color ? color : 'silver',
        metalness: 1,
        roughness: .41,
    });
    const metallicMaterial2 = new MeshStandardMaterial({
        color: color ? color : 'silver',
        metalness: 1,
        roughness: .2,
    });
    const animation = useSpring({
        'rotation-x': active ? Math.PI / 5 : -Math.PI / 5,
        config: { tension: 900, friction: 45 }
    });
    function clicked() {
        if (callback) {
            setActive(!active);
            if (!active) {
                callback();
            }
        }
        if (!callback) {
            setActive(!active);
        }
    }
    return (_jsxs(_Fragment, { children: [_jsx("ambientLight", { intensity: 1 }), _jsx("directionalLight", { castShadow: true, position: [2, 8, 5], intensity: 1, "shadow-mapSize": 1024 }), _jsx("directionalLight", { castShadow: true, position: [-5, 5, 2], intensity: 1, "shadow-mapSize": 1024 }), _jsx("directionalLight", { castShadow: true, position: [5, -5, 2], intensity: 1 }), _jsxs(animated.group, { ref: group, "rotation-x": animation['rotation-x'], "position-z": positionZ ? positionZ - .2 : -.2, "position-x": positionX ? positionX : 0, "position-y": positionY ? positionY : 0, scale: size ? size : 1, children: [_jsx(animated.mesh, { onClick: clicked, ref: cube, rotation: [Math.PI / 2, 0, Math.PI], position: [0, 0, 1.5], material: metallicMaterial, receiveShadow: true, castShadow: true, children: _jsx("capsuleGeometry", { args: [.35, 2.75, 7, 40] }) }), _jsx(animated.mesh, { rotation: [Math.PI / 2, 0, Math.PI], position: [0, 0, 1.5], material: metallicMaterial, receiveShadow: true, castShadow: true, children: _jsx("cylinderGeometry", { args: [.35, .357, 3, 40] }) }), _jsx(animated.mesh, { material: metallicMaterial, receiveShadow: true, castShadow: true, children: _jsx("sphereGeometry", { args: [.65, 32, 32] }) })] }), _jsx("mesh", { material: metallicMaterial, scale: size ? size : 1, receiveShadow: true, castShadow: true, "position-z": positionZ ? positionZ : 0, "position-x": positionX ? positionX : 0, "position-y": positionY ? positionY : 0, children: _jsx("torusGeometry", { args: [1.1, .4, 4, 200] }) }), _jsxs("mesh", { scale: size ? size * 2 : 2, "position-z": positionZ ? positionZ + .01 : .01, "position-x": positionX ? positionX : 0, "position-y": positionY ? positionY : 0, material: metallicMaterial2, children: [_jsx("planeGeometry", {}), _jsx("meshBasicMaterial", { color: 'grey' })] })] }));
}
