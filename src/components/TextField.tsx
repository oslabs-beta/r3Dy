/* eslint-disable @typescript-eslint/no-non-null-assertion */
import React from 'react';
import { useState, useRef, useEffect} from 'react'
import { Text, Html, RoundedBox} from '@react-three/drei'
import { Mesh, Group, DirectionalLight,  MeshStandardMaterial, PerspectiveCamera } from 'three'
import { useSpring, animated, config } from '@react-spring/three'
import { useThree } from '@react-three/fiber'


//DEFINE TYPE FOR COMPONENT PROPS
type TextFieldProps = {
    color?: string,
    focusColor?: string,
    width?: number,
    height?: number,
    backgroundColor?: string,
    font?: string,
    fontSize?: number,
    theme?: string,
    position?: [number, number, number];
    onChange?: (e: React.FormEvent<HTMLInputElement>) => void
}

type InputField = {
  width: string,
  height: string,
  opacity: number
}

interface DreiText extends Text {
  color?: string;
}

// HELP FUNC TO CONVERT STRING COLOR TO HEX CODE
// const getHexColor = (colorStr: string): string => {
//     const a = document.createElement('div');
//     a.style.color = colorStr;
//     const colors = window.getComputedStyle( document.body.appendChild(a) ).color.match(/\d+/g).map(function(a){ return parseInt(a,10); });
//     document.body.removeChild(a);
//     return '#' + (((1 << 24) + (colors[0] << 16) + (colors[1] << 8) + colors[2]).toString(16));
// }

// CREATES DARKER COLOR SHADE TO DISPLAY ON CLICK
const newShade = (hexColor: string, magnitude: number): string => {
    // if (!hexColor.includes('#')) {
    //     hexColor = getHexColor(hexColor);
    // }
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
const TextField = ({color, focusColor, width, height, backgroundColor, font, fontSize, theme, position, onChange}: TextFieldProps): JSX.Element => {
  
  // STATES
  const [type, setType] = useState('');
  const [active, setActive] = useState(false);
  const [dist, setDist] = useState(0);
  const [caretIndex, setCaretIndex] = useState(0);
  const [showCaret, setShowCaret] = useState(true);
  
  // REFS
  const meshRef = useRef<MeshStandardMaterial>(null!);
  const boxRef = useRef<Mesh>(null!);
  const groupRef = useRef<Group>(null!);
  const lightRef = useRef<DirectionalLight>(null!);
  const textRef = useRef<DreiText>(null!);

  // THEMES

  let fontColor = color ? color : 'black';
  let fontFocusColor = focusColor ? focusColor : '#3F37C9';
  let fontBackgroundColor = backgroundColor ? backgroundColor : '#F4FAFF';
  if (theme === 'dark') {
    fontColor = '#FFFFFF';
    fontFocusColor = '#4895EF';
    fontBackgroundColor = '#0D1B2A';
  }

  // DEFINE SECONDARY BACKGROUND COLOR FOR CLICK EFFECT, ONLY IF BACKGROUND COLOR IS PROVIDED
  const backgroundColorSecondary: string = newShade(fontBackgroundColor, -50);

  // HELPER TO DISPLAY LIGHT POSITION
  // useHelper(lightRef, DirectionalLightHelper, 2)

  // SET MAXIMUM HEIGHT FOR TEXT FIELD TO 5
  if (height && height > 5) height = 5;

  // DEFAULT DIMENSIONS OF BOX GEO
  const boxHeight = height ? height : 3;
  const boxWidth = width ? width : 15;
  const boxDepth = 0.4;

  // GET CAMERA AND CANVAS INFO
  const { camera }: { camera: PerspectiveCamera } = useThree();
  const canvas: HTMLCanvasElement | null = document.querySelector('canvas')

  // USE EFFECT TO GET CURRENT BOX POSITION AND SET CAM DISTANCE
  useEffect((): void => {
    const boxPositionZ: number = boxRef.current.position.z;
    const camDist: number = camPositionZ - boxPositionZ;
    setDist(camDist);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[boxRef])

  // MATH TO GET TEXT WIDTH AND HEIGHT
  const vertFov = camera.fov * Math.PI / 180;
  const textHeight = 2 * Math.tan(vertFov / 2) * dist
  const textWidth = textHeight * camera.aspect
  const camPositionZ: number = camera.position.z

  const textPixelHeight: number = canvas ? canvas.offsetHeight * (boxHeight / textHeight) : 0
  const textPixelWidth: number = canvas ? canvas.offsetWidth * (boxWidth / textWidth) : 0

  //BUILD 3D TEXT - USING TYPE AND CARET INDEX
  let displayText = '';
  const typeArray: string[] = type.split('');
  const typeWithCaret: string[] = [...typeArray.slice(0, caretIndex) , '|' , ...typeArray.slice(caretIndex)];
  displayText = showCaret ? typeWithCaret.join('') : type;

  // DEFAULT STYLE FOR INPUT
  const inputStyles: InputField = {
    width: `${textPixelWidth}px`,
    height: `${textPixelHeight}px`,
    opacity: 0,
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
  const handleKeyUp = (e: React.FormEvent<HTMLInputElement>): void => {
    if (e.currentTarget.selectionStart) setCaretIndex(e.currentTarget.selectionStart);
  }

  const handleType = (e: React.FormEvent<HTMLInputElement>) => {
    setType(e.currentTarget.value);
    if (onChange) onChange(e);
  }
  
  const handleFocus = (): void => {
    meshRef.current.color.set(backgroundColorSecondary);
    textRef.current.color = fontFocusColor
    setShowCaret(true);
  }

  const handleUnfocused = (): void => {
    meshRef.current.color.set(fontBackgroundColor);
    textRef.current.color = fontColor
    setShowCaret(false);
  }
  
  return (
    <>
    {/* <OrbitControls /> */}
    <directionalLight
          intensity={0.7}
          position={[5, 2, 5]}
          ref={lightRef}
          castShadow
          shadow-mapSize={[ 1024, 1024 ]}
        />
    <ambientLight intensity={1} color="#E6F0FF" />
        <animated.group ref= { groupRef } rotation-y={rotationY} rotation-x={rotationX} position={position ? position : [0,0,0]} >
            <mesh castShadow >
                <Html center >
                    <input onKeyUp={handleKeyUp} type="text" style={inputStyles} onChange={handleType} onFocus={() => {
                        handleFocus()
                        setActive(true)
                        }} onBlur={() => {
                            handleUnfocused()
                            setActive(false)
                            }}></input>
                </Html>
                  <Text ref={textRef} castShadow fontSize={fontSize ? fontSize: 1} position-x={textPosition} anchorX='left' color={ fontColor } font={font ? font : undefined} maxWidth={boxWidth} textAlign='left' overflowWrap='break-word'>
                  { displayText }
                  <meshBasicMaterial toneMapped={false}/>
                  </Text>
            </mesh>
            <mesh receiveShadow position-z={ -.3 } ref = { boxRef }>
            <RoundedBox receiveShadow args={ [boxWidth, boxHeight, boxDepth] } smoothness={4} radius={0.2}> 
                <meshStandardMaterial color={ fontBackgroundColor } ref={ meshRef } />
            </RoundedBox>
            </mesh>
        </animated.group>
    </>
  )
}

export default TextField;
