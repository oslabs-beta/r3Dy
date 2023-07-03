import { useState, useRef } from 'react'
import { Text, OrbitControls, Html, RoundedBox } from '@react-three/drei'
import { Mesh, MeshStandardMaterial, Group } from 'three'
import { useSpring, animated, config } from '@react-spring/three'

//DEFINE TYPE FOR COMPONENT PROPS
type TextFieldProps = {
    color?: string
    width?: number;
    height?: number;
    backgroundColor?: string;
    text? : string
    font?: string
}

// DEFAULT STYLE FOR INPUT
const inputStyles = {
    width: '750px',
    height: '200px',
    opacity: 0,
}

// HELP FUNC TO CONVERT STRING COLOR TO HEX CODE
const getHexColor = (colorStr: string): string => {
    const a = document.createElement('div');
    a.style.color = colorStr;
    const computedStyle = window.getComputedStyle(a);
    const colorValues = computedStyle.color.match(/\d+/g);
    let colors: number[];
    if (colorValues) {
      colors = colorValues.map((value) => parseInt(value, 10));
      document.body.removeChild(a);
      return '#' + (((1 << 24) + (colors[0] << 16) + (colors[1] << 8) + colors[2]).toString(16).substr(1));
    }
    return '#CED4DA'
}

// CREATES DARKER COLOR SHADE TO DISPLAY ON CLICK
const newShade = (hexColor: string, magnitude: number): string => {
    if (!hexColor.includes('#')) {
        hexColor = getHexColor(hexColor);
    }
    hexColor = hexColor.replace(`#`, ``);
    if (hexColor.length === 6) {
        const decimalColor = parseInt(hexColor, 16);
        let r = (decimalColor >> 16) + magnitude;
        r > 255 && (r = 255);
        r < 0 && (r = 0);
        let g = (decimalColor & 0x0000ff) + magnitude;
        g > 255 && (g = 255);
        g < 0 && (g = 0);
        let b = ((decimalColor >> 8) & 0x00ff) + magnitude;
        b > 255 && (b = 255);
        b < 0 && (b = 0);
        return `#${(g | (b << 8) | (r << 16)).toString(16)}`;
    } else {
        return hexColor;
    }
};

// COMPONENT FUNC DEFINITION START
const TextField = ({color, width, height, backgroundColor, text, font}: TextFieldProps): JSX.Element => {
  
  // STATES
  const [type, setType] = useState(text ? text : 'Hello World');
  const [active, setActive] = useState(false);
  
  // REFS
  const meshRef = useRef<MeshStandardMaterial>(null!);
  const boxRef = useRef<Mesh>(null!);
  const groupRef = useRef<Group>(null!);

  // SET MAXIMUM HEIGHT FOR TEXT FIELD TO 5
  if (height && height > 5) height = 5;

  // DEFAULT DIMENSIONS OF BOX GEO
  const boxHeight = height ? height : 1.5;
  const boxWidth = width ? width : 10;
  const boxDepth = 0.2;

  // DEFINE SECONDARY BACKGROUND COLOR FOR CLICK EFFECT, ONLY IF BACKGROUND COLOR IS PROVIDED
  let backgroundColorSecondary: string;
  if (backgroundColor) {
   backgroundColorSecondary = newShade(backgroundColor, -50);
  }

  // SET ROTATION Y AND X VALUES FOR GROUP
  const {rotationY, rotationX} = useSpring({ 
    rotationX: active ? -0.1 : 0,
    rotationY: active ? -0.2 : 0,
    config: config.wobbly,
  })

  // SOME MATH TO ADJUST POSITION OF TEXT ON BOX GEO DEPENDING ON WIDTH
  const textPosition = -(Math.floor((boxWidth / 5))) * 2.2


  // HANDLE FUNCTIONS
  const handleType = (e: React.FormEvent<HTMLInputElement>) => {
    setType(e.currentTarget.value);
  }
  
  const handleFocus = (): void => {
    meshRef.current.color.set(backgroundColor ? backgroundColorSecondary : '#CED4DA');
  }

  const handleUnfocused = (): void => {
    meshRef.current.color.set(backgroundColor ? backgroundColor : '#F8F9FA');
  }

  return (
    <>
    <OrbitControls />
    <directionalLight
          intensity={0.7}
          rotation={[-0.888, 0.368, 1.286]}
          position={[400, 320, 230]}
        />
    <hemisphereLight intensity={0.75} color="#F8F9FA" />
        <animated.group ref= { groupRef } rotation-y={rotationY} rotation-x={rotationX} >
            <mesh castShadow receiveShadow>
                <Html center >
                    <input type="text" style={inputStyles} onChange={handleType} onFocus={() => {
                        handleFocus()
                        setActive(true)
                        }} onBlur={() => {
                            handleUnfocused()
                            setActive(false)
                            }} value={type}></input>
                </Html>
                <Text fontSize={0.5} castShadow position-x={textPosition} anchorX='left' color={ color ? color : 'black'} font={font ? font : 'fonts/Inter-Bold.ttf'} maxWidth={boxWidth - 0.5} textAlign='left' overflowWrap='break-word'>{ type }</Text>
            </mesh>
            <mesh position-z={ -.3 }  castShadow receiveShadow ref = { boxRef }>
            <RoundedBox args={ [boxWidth, boxHeight, boxDepth] } castShadow receiveShadow smoothness={4}> 
                <meshStandardMaterial color={ backgroundColor ? backgroundColor : '#F8F9FA'} ref={ meshRef } />
            </RoundedBox>
            </mesh>
        </animated.group>

    </>
  )
}

export default TextField;