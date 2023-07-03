import { useState } from 'react'
import { RoundedBox, Text } from "@react-three/drei"

export default function Button(props) {
    const [hover, setHover] = useState(false);
    
    const scale = props.scale || 1;
    const color = props.color || '#1976d2';
    const hoverColor = props.hoverColor || '#1d6bb8';
    // const size = [.85, .33, .15];
    // const hoverSize = [.85, .33, .2];
    const text = props.text || 'BUTTON';
    const fontSize = props.fontSize || .15;
    const fontColor = props.fontColor || '#fffff'
    // should default be null? 
    const handleClick = props.handleClick || null;

    return <>
        <mesh
            scale={scale}
            onPointerOver={(event) => setHover(true)}
            onPointerOut={(event) => setHover(false)}
            rotation-y={ hover ? Math.PI * .1 : 0}
            onClick={handleClick}
        >
            <RoundedBox 
                // args={hover ? hoverSize : size}
                args={[.85, .33, .15]}
            >
                <meshBasicMaterial color={hover ? hoverColor : color}/>
            </RoundedBox>
            <Text position-z={.1} fontSize={fontSize} color={fontColor}>{text}</Text>
        </mesh>
    </>
}

