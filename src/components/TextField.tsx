import { useState, useRef } from 'react'
import { Text, OrbitControls, Html, RoundedBox } from '@react-three/drei'
import { Mesh, MeshStandardMaterial } from 'three'


type TextFieldProps = {
    color?: string
    // width?: number;
    // height?: number;
    // backgroundColor?: string;
    // backgroundOpacity?: number;
    // padding?: number;
}

const inputStyles = {
    width: '750px',
    height: '200px',
    opacity: 0,
}

const TextField = ({color}: TextFieldProps): JSX.Element => {

  const [type, setType] = useState('Hello r3Dy');

  const planeRef = useRef<MeshStandardMaterial>(null!);
  const boxRef = useRef<Mesh>(null!);

  const boxHeight = 1.5;
  const boxWidth = 10;
  const boxDepth = 0.2;


const handleType = (e: React.FormEvent<HTMLInputElement>) => {
    // console.log('e:',e)
    setType(e.currentTarget.value);
}

const handleFocus = (): void => {
    console.log(planeRef);
    planeRef.current.color.set('lightblue');
}
const handleUnfocused = (): void => {
    planeRef.current.color.set('#D5DEEA');
}

  return (
    <>
    <OrbitControls />
    <directionalLight
          intensity={0.7}
          rotation={[-0.888, 0.368, 1.286]}
          position={[400, 320, 230]}
        />
    <hemisphereLight intensity={0.75} color="#eaeaea" />
        <group>
            <mesh castShadow receiveShadow>
                <Html center >
                    <input type="text" style={inputStyles} onChange={handleType} onFocus={handleFocus} onBlur={handleUnfocused} value={type}></input>
                </Html>
                <Text fontSize={0.5} castShadow position-x='-4.5' anchorX='left' color={ color ? color : 'black'} font='fonts/Inter-Bold.ttf' maxWidth={boxWidth - 0.5} textAlign='left' overflowWrap='break-word'>{ type }</Text>
            </mesh>
            <mesh position-z={ -.3 }  castShadow receiveShadow ref = { boxRef }>
            <RoundedBox args={ [boxWidth, boxHeight, boxDepth] } castShadow receiveShadow smoothness={4}> 
                <meshStandardMaterial color='#D5DEEA' ref={ planeRef } />
            </RoundedBox>
            </mesh>
        </group>

    </>
  )
}

export default TextField;