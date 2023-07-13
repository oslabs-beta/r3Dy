import { ReactElement, useState } from 'react'
import { RoundedBox, Text } from "@react-three/drei"
import { useSpring, animated, config } from '@react-spring/three'

type ButtonProps = {
    scale?: number,
    color?: string,
    hoverColor?: string,
    text?: string,
    fontSize?: number,
    fontColor?: string,
    handleClick?: any // check this
}
 
export default function Button(props: ButtonProps): ReactElement {
    const [hover, setHover] = useState(false);
    
    const scale = props.scale || 2;
    const color = props.color || '#3F37C9';
    const hoverColor = props.hoverColor || '#272275';
    const text = props.text || 'BUTTON';
    const fontSize = props.fontSize || .5;
    const fontColor = props.fontColor || '#ffffff'
    const handleClick = props.handleClick || undefined;

    const buttonWidth = text.length * fontSize * 1.1; 
    const buttonHeight = fontSize * 2.7; 

  const {rotationY, rotationX} = useSpring({ 
    rotationX: hover ? -0.1 : 0,
    rotationY: hover ? -0.2 : 0,
    config: config.wobbly,
  })

    return <>
        <ambientLight intensity={1}/>
        <animated.group
            scale={scale}
            onPointerOver={() => setHover(true)}
            onPointerOut={() => setHover(false)}
            onClick={handleClick}
            rotation-y={rotationY} 
            rotation-x={rotationX}
        >
             <mesh >
                <RoundedBox args={[buttonWidth, buttonHeight, .5]} radius={.2}>
                    <meshStandardMaterial color={hover ? hoverColor : color}/>
                </RoundedBox>
            </mesh>
            <Text 
                font={'fonts/Inter-Bold.ttf'} 
                fontSize={fontSize} 
                color={fontColor} 
                position-z={.3}
            >
                <meshBasicMaterial toneMapped={false}/>
                {text}
            </Text>
        </animated.group>
    </>
}