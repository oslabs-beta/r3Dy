import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useRef, useState } from 'react';
import { useGLTF, OrthographicCamera } from "@react-three/drei";
import { useSpring, animated, interpolate } from '@react-spring/three';
import { MeshStandardMaterial, Vector3, MeshPhysicalMaterial } from 'three';
export default function SlideSwitch(props) {
    const [active, setActive] = useState(false);
    const { nodes } = useGLTF("https://raw.githubusercontent.com/alecjessen/r3dy-static/main/switch.gltf");
    nodes.Text_2.material.color.r = 1;
    nodes.Text_2.material.color.g = 0;
    nodes.Text_2.material.color.b = 0;
    nodes.Text_2.material.roughness = .2;
    nodes.Text_2.material.metalness = 0.3;
    nodes.Text_2.material.emissive.r = 0.1;
    nodes.Text.material.emissive.g = .0;
    nodes.Text.material.color.g = 1;
    nodes.Text.material.color.b = 0;
    const slider = useRef(null);
    function clicked() {
        setActive(!active);
        return props.callback ? props.callback() : null;
    }
    const slideAnimation = useSpring({
        position: active ? [-4, 6.186, 4.592] : [-54.685, 6.186, 4.592],
        config: {
            tension: props.tension ? props.tension * 1600 : 1600,
            friction: 70,
        },
    });
    const rectangleMaterial = new MeshStandardMaterial({ color: props.mainColor ? props.mainColor : '#1B263B', roughness: 0.4, metalness: .2 });
    const slideMaterial = new MeshPhysicalMaterial({ color: props.slideColor ? props.slideColor : '#4CC9F0', roughness: .4, metalness: .5, clearcoat: 1 });
    const onMaterial = new MeshPhysicalMaterial({ color: props.onColor ? props.onColor : '#4CC9F0', roughness: .4, metalness: .5, clearcoat: 1 });
    const offMaterial = new MeshPhysicalMaterial({ color: props.offColor ? props.offColor : '#778DA9', roughness: .4, metalness: .5, clearcoat: 1 });
    const slideAnimationPosition = interpolate(slideAnimation.position, (x, y, z) => new Vector3(x, y, z));
    return (_jsx("group", Object.assign({}, props, { dispose: null, children: _jsxs("group", { scale: props.size ? .055 * props.size : .055, "rotation-y": .01, "position-x": props.positionX ? props.positionX + 2 : 2, "position-y": props.positionY ? props.positionY : 0, "position-z": props.positionZ ? props.positionZ : 0, children: [_jsx("pointLight", { intensity: 1, decay: 3, distance: 110, position: [-290, 170, 170] }), _jsx("pointLight", { intensity: 1, decay: 3, distance: 110, position: [230, 170, 170] }), _jsx("pointLight", { intensity: 1, decay: 4, distance: 210, position: [0, -170, 220] }), _jsx("mesh", { castShadow: true, receiveShadow: true, geometry: nodes.Text_2.geometry, material: offMaterial, position: [4.551, 7.283, 7.538] }), _jsx("mesh", { castShadow: true, receiveShadow: true, geometry: nodes.Text.geometry, material: onMaterial, position: [-60.549, 7.283, 7.203] }), _jsx(animated.mesh, { castShadow: true, receiveShadow: true, geometry: nodes.Rectangle.geometry, material: slideMaterial, position: slideAnimationPosition, scale: [0.921, 1.152, 0.908], ref: slider, onClick: clicked }), _jsx("mesh", { castShadow: true, receiveShadow: true, geometry: nodes.Boolean.geometry, material: rectangleMaterial, position: [-29.329, 6.069, 7], scale: [0.828, 1, 1] }), _jsx(OrthographicCamera, { makeDefault: false, far: 100000, near: 0, position: [-61.515, 77.981, 995.055], rotation: [-0.078, -0.062, -0.005] })] }) })));
}
useGLTF.preload("https://raw.githubusercontent.com/alecjessen/r3dy-static/main/switch.gltf");
