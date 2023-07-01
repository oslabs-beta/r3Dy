import { useState, useRef, useEffect, SyntheticEvent } from 'react'
import { Text, OrbitControls, Html } from '@react-three/drei'
import * as THREE from 'three'


type TextFieldProps = {
    color?: string
    // width?: number;
    // height?: number;
    // backgroundColor?: string;
    // backgroundOpacity?: number;
    // padding?: number;
}

const inputStyles = {
    width: '650px',
    height: '200px',
    opacity: 0,
}

const TextField: React.FC<TextFieldProps> = ({
    color = 'black', 
    // width = 2, 
    // height = 1, 
    // backgroundColor = 'black', 
    // backgroundOpacity = 0.3, 
    // padding,
}) => {

  const [type, setType] = useState('Hello r3Dy');
//   const [typeState, setTypeState] = useState(false);
//   const textRef = useRef<HTMLDivElement | null>(null);
  const planeRef: object = useRef<THREE.MeshBasicMaterial>(null);

  const planeHeight = 1.5;
  const planeWidth = 6;


//   useEffect(() => {
//     console.log(textRef.current);
//   },[])

const handleType = (e: React.FormEvent<HTMLInputElement>) => {
    console.log('e:',e)
    setType(e.currentTarget.value);
}

const handleFocus = (): void => {
    console.log(planeRef);
    planeRef.current.color.set('lightblue');
}
const handleUnfocus = (): void => {
    planeRef.current.color.set('lightgrey');
}

  return (
    <>
    <OrbitControls />
        <group>
            <mesh>
                <Html center >
                    <input type="text" style={inputStyles} onChange={handleType} onFocus={handleFocus} onBlur={handleUnfocus} value={type}></input>
                </Html>
                <Text position-x='-2.5' anchorX='left' color={ color } font='fonts/Inter-Bold.ttf'>{ type }</Text>
            </mesh>
            <mesh position-z={ -.3 } >
                <planeGeometry args={ [planeWidth, planeHeight] }/>
                <meshBasicMaterial side={THREE.DoubleSide} color='lightgrey' ref={ planeRef }/>
            </mesh>
        </group>
    </>
  )
}

export default TextField;