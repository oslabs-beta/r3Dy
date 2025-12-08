import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { useGLTF, PerspectiveCamera, useMatcapTexture } from "@react-three/drei";
import { MeshDistanceMaterial, MeshMatcapMaterial, MeshPhysicalMaterial } from "three";
export default function HexagonLoader(props) {
    const position = props.position || [0, 0, 0];
    const scale = props.scale ? props.scale / 85 : 0.01;
    const loader = useRef();
    const material = props.material || MeshMatcapMaterial;
    const speed = props.speed || 5;
    const rotationAxis = props.rotationAxis || 'y';
    const rotationDirection = props.rotationDirection || 'positive';
    const easeAnimation = props.easeAnimation || false;
    const wireframe = props.wireframe || false;
    let matcapIndex = props.matcapIndex || 34;
    const matcapSize = props.matcapSize || 1024;
    const theme = props.theme || 'light';
    let color = props.color || 'whitesmoke';
    if (!props.color) {
        if (theme === 'light') {
            color = 'whitesmoke';
            matcapIndex = 21;
        }
        else {
            color = 'grey';
            matcapIndex = 21;
        }
    }
    const [matcap] = useMatcapTexture(matcapIndex, matcapSize);
    let materialAll;
    if (material === MeshMatcapMaterial)
        materialAll = new material({ color: color, matcap: matcap });
    else if (material === MeshDistanceMaterial || material === MeshPhysicalMaterial)
        materialAll = new material({ color: color });
    else
        materialAll = new material({ color: color, wireframe: wireframe });
    useFrame((state, delta) => {
        const rotationSpeed = easeAnimation ? Math.abs(Math.sin(state.clock.elapsedTime) / Math.PI) - (0.0004 * state.clock.elapsedTime) : 1;
        if (loader.current) {
            if (rotationAxis === "x" || rotationAxis === "y" || rotationAxis === "z") {
                if (rotationDirection === 'negative' && easeAnimation) {
                    loader.current.rotation[rotationAxis] += delta * rotationSpeed * -speed;
                }
                else if (rotationDirection === 'positive' && easeAnimation) {
                    loader.current.rotation[rotationAxis] += delta * rotationSpeed * speed;
                }
                if (rotationDirection === 'negative' && !easeAnimation) {
                    loader.current.rotation[rotationAxis] += (delta * rotationSpeed * -speed) / Math.PI;
                }
                else if (rotationDirection === 'positive' && !easeAnimation) {
                    loader.current.rotation[rotationAxis] += (delta * rotationSpeed * speed) / Math.PI;
                }
            }
        }
    });
    if (loader.current) {
        loader.current.position.x = position[0];
        loader.current.position.y = position[1];
        loader.current.position.z = position[2];
    }
    const { nodes } = useGLTF("https://raw.githubusercontent.com/alecjessen/r3dy-static/main/hexagonLoader.gltf");
    return (_jsxs("group", { scale: scale, ref: loader, children: [_jsx("ambientLight", {}), _jsx("mesh", { castShadow: true, receiveShadow: true, geometry: nodes.Pentagon_7.geometry, position: [-0.019, 1.957, -61.235], material: materialAll }), _jsx("mesh", { castShadow: true, receiveShadow: true, geometry: nodes.Pentagon_6.geometry, position: [-0.019, 1.957, 66.482], material: materialAll }), _jsx("mesh", { castShadow: true, receiveShadow: true, geometry: nodes.Pentagon.geometry, material: materialAll }), _jsx("directionalLight", { intensity: 2, rotation: [-0.506, 0.629, 0.756] }), _jsx(PerspectiveCamera, { makeDefault: false, far: 100000, near: 70, fov: 45, position: [0, 0, -1000], rotation: [-Math.PI, 0, Math.PI] })] }));
}
useGLTF.preload("https://raw.githubusercontent.com/alecjessen/r3dy-static/main/hexagonLoader.gltf");
