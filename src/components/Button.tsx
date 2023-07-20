/* eslint-disable @typescript-eslint/no-explicit-any */
import { ReactElement, useState, useRef } from 'react'
import { RoundedBox, Text } from "@react-three/drei"
import { useSpring, animated, config } from '@react-spring/three'
import React from 'react';
type ButtonProps = {
    scale?: number;
    color?: string;
    activeColor?: string;
    font?: string;
    text?: string;
    fontSize?: number;
    fontColor?: string;
    handleClick?: any;
    position?: [number, number, number];
}
 
export default function Button(props: ButtonProps): ReactElement {

    const buttonRef = useRef() as any; 

    const [hover, setHover] = useState(false);
    
    const position = props.position || [0,0,0];
    const scale = props.scale || 2;
    const color = props.color || '#3F37C9';
    const activeColor = props.activeColor || '#272275';
    const text = props.text || 'BUTTON';
    const fontSize = props.fontSize || .5;
    const fontColor = props.fontColor || '#ffffff'
    const handleClick = props.handleClick || undefined;
    const font = props.font || undefined;
    const buttonWidth = text.length * fontSize * 1.1; 
    const buttonHeight = fontSize * 2.7; 

  const {rotationY, rotationX} = useSpring({ 
    rotationX: hover ? -0.15 : 0,
    rotationY: hover ? -0.25 : 0,
    config: config.wobbly,
  })

  if (buttonRef.current) {
    buttonRef.current.position.x = position[0];
    buttonRef.current.position.y = position[1];
    buttonRef.current.position.z = position[2];
  }


    return <>
    <group ref={buttonRef} >
        <ambientLight intensity={1}/>
        <animated.group
            scale={scale}
            onPointerOver={() => setHover(true)}
            onPointerOut={() => setHover(false)}
            onPointerDown={() => setHover(true)}
            onPointerUp={() => setHover(false)}
            onClick={handleClick}
            rotation-y={rotationY} 
            rotation-x={rotationX}
        >
             <mesh >
                <RoundedBox args={[buttonWidth, buttonHeight, .5]} radius={.2}>
                    <meshStandardMaterial color={hover ? activeColor : color}/>
                </RoundedBox>
            </mesh>
            <Text 
                font={font} 
                fontSize={fontSize} 
                color={fontColor} 
                position-z={.3}
            >
                <meshBasicMaterial toneMapped={false}/>
                {text}
            </Text>
        </animated.group>
        </group>
    </>
}