import { useState, useRef } from 'react'
import { RoundedBox, Text, OrbitControls, useHelper } from "@react-three/drei"
import * as THREE from 'three'
 
export default function Button(props) {
    const [hover, setHover] = useState(false);
    
    const scale = props.scale || 1;
    const color = props.color || '#1976d2';
    const hoverColor = props.hoverColor || '#1d6bb8';
    const text = props.text || 'BUTTON';
    const fontSize = props.fontSize || .5;
    const fontColor = props.fontColor || 'black'
    const handleClick = props.handleClick || null;

    // const directionalLight = useRef();
    // useHelper(directionalLight, THREE.DirectionalLightHelper, 1)

    return <>
        <OrbitControls />
        <directionalLight castShadow position={[-.5, 1 , 2]} intensity={1} />
        <ambientLight intensity={.5} />

        <mesh
            castShadow
            scale={scale}
            onPointerOver={(event) => setHover(true)}
            onPointerOut={(event) => setHover(false)}
            rotation-y={ hover ? Math.PI * .1 : 0}
            onClick={handleClick}
        >
            <RoundedBox castShadow args={[4, 1.5, .5]}>
                <meshStandardMaterial color={hover ? hoverColor : color}/>
            </RoundedBox>
            <Text font={'fonts/Inter-Bold.ttf'} position-z={.4} fontSize={fontSize} color={fontColor}>{text}</Text>
        </mesh>

        <mesh receiveShadow position-z={-.5} rotation-x ={Math.PI*2} scale={7}>
            <planeGeometry />
            <meshStandardMaterial color="#f0f0f0" />
        </mesh>
    </>
}