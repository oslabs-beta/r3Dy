import { ReactElement, useState } from 'react'
import { RoundedBox, Text } from "@react-three/drei"

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
    
    const scale = props.scale || 1;
    const color = props.color || '#1976d2';
    const hoverColor = props.hoverColor || '#1f568c';
    const text = props.text || 'BUTTON';
    const fontSize = props.fontSize || .5;
    const fontColor = props.fontColor || '#ffffff'
    const handleClick = props.handleClick || undefined;

    const buttonWidth = text.length * fontSize * 1.1; 
    const buttonHeight = fontSize * 2.8; 

    return <>
        <ambientLight intensity={1}/>
        <directionalLight 
            position={[-.5, .8, 3]} 
            intensity={1} 
            castShadow 
            shadow-mapSize={2048}
        />
        <group
            scale={scale}
            onPointerOver={() => setHover(true)}
            onPointerOut={() => setHover(false)}
            rotation-y={ hover ? Math.PI * .13 : 0}
            onClick={handleClick}
        >
             <mesh >
                <RoundedBox castShadow args={[buttonWidth, buttonHeight, .5]}>
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
        </group>

        <mesh receiveShadow position-z={-1} rotation-x ={Math.PI*2} scale={1}>  
            <planeGeometry args={[6, 3]}/>
            <meshStandardMaterial color="#f0f0f0" />
        </mesh>
    </>
}