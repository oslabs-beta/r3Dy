import { useState, useRef, useEffect} from 'react'
import { useHelper, Text, OrbitControls, Html, RoundedBox} from '@react-three/drei'
import { Mesh, Group, DirectionalLight, DirectionalLightHelper, MeshStandardMaterial, Vector3, MathUtils } from 'three'
import { useSpring, animated, config } from '@react-spring/three'
import { useThree } from 'react-three-fiber'

//DEFINE TYPE FOR COMPONENT PROPS
type TextFieldProps = {
    color?: string
    width?: number;
    height?: number;
    backgroundColor?: string;
    text? : string
    font?: string
}

type InputField = {
  width: string,
  height: string,
  opacity: number
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
const TextField = ({color, width, height, backgroundColor, text, font}: TextFieldProps): JSX.Element => {
  
  // STATES
  const [type, setType] = useState(text ? text : 'Hello World');
  const [active, setActive] = useState(false);
  const [dist, setDist] = useState(0);
  
  // REFS

  const meshRef = useRef<MeshStandardMaterial>(null!);
  const boxRef = useRef<Mesh>(null!);
  const groupRef = useRef<Group>(null!);
  const lightRef = useRef<DirectionalLight>(null!);


  // HELPER TO DISPLAY LIGHT POSITION
  // useHelper(lightRef, DirectionalLightHelper, 2)

  // SET MAXIMUM HEIGHT FOR TEXT FIELD TO 5
  if (height && height > 5) height = 5;

  // DEFAULT DIMENSIONS OF BOX GEO
  const boxHeight = height ? height : 1.5;
  const boxWidth = width ? width : 10;
  const boxDepth = 0.2;


  // GET CAMERA AND CANVAS INFO
  const camera = useThree(state => state.camera)
  const canvas = document.querySelector('canvas')

  // USE EFFECT TO GET CURRENT BOX POSITION AND SET CAM DISTANCE
  useEffect(() => {
    const boxPositionZ: number = boxRef.current.position.z;
    const camDist: number = camPositionZ - boxPositionZ;
    setDist(camDist);
  },[boxRef])

  // MATH TO GET TEXT WIDTH AND HEIGHT
  const vertFov = camera.fov * Math.PI / 180;
  const textHeight = 2 * Math.tan(vertFov / 2) * dist
  const textWidth = textHeight * camera.aspect
  const camPositionZ: number = camera.position.z


  const textPixelHeight = canvas?.offsetHeight * (boxHeight / textHeight)
  const textPixelWidth = canvas?.offsetWidth * (boxWidth / textWidth)

  // DEFAULT STYLE FOR INPUT
const inputStyles: InputField = {
  width: `${textPixelWidth}px`,
  height: `${textPixelHeight}px`,
  opacity: 0,
}

  // DEFINE SECONDARY BACKGROUND COLOR FOR CLICK EFFECT, ONLY IF BACKGROUND COLOR IS PROVIDED
  let backgroundColorSecondary: string;
  if (backgroundColor) {
   backgroundColorSecondary = newShade(backgroundColor, -50);
  }

  const defaultBG = '#F4FAFF'
  const defaultSecondaryBG = '#DDDFE1'

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
  
  const handleFocus = (e: React.FormEvent<HTMLInputElement>): void => {
    meshRef.current.color.set(backgroundColor ? backgroundColorSecondary : defaultSecondaryBG);
    console.log(e.currentTarget.selectionEnd)
  }

  const handleUnfocused = (): void => {
    meshRef.current.color.set(backgroundColor ? backgroundColor : defaultBG);
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
    <ambientLight intensity={1} color="#FFFFFF" />
        <animated.group ref= { groupRef } rotation-y={rotationY} rotation-x={rotationX} >
            <mesh castShadow>
                <Html center >
                    <input ref={inputRef} type="text" style={inputStyles} onChange={handleType} onFocus={(e: React.FormEvent<HTMLInputElement>) => {
                        handleFocus(e)
                        setActive(true)
                        }} onBlur={() => {
                            handleUnfocused()
                            setActive(false)
                            }} value={type}></input>
                </Html>
                <Text castShadow fontSize={0.5} position-x={textPosition} anchorX='left' color={ color ? color : 'black'} font={font ? font : 'fonts/Inter-Bold.ttf'} maxWidth={boxWidth} textAlign='left' overflowWrap='break-word'>{ type }</Text>
            </mesh>
            <mesh receiveShadow position-z={ -.3 } ref = { boxRef }>
            <RoundedBox receiveShadow args={ [boxWidth, boxHeight, boxDepth] } smoothness={4}> 
                <meshStandardMaterial color={ backgroundColor ? backgroundColor : defaultBG} ref={ meshRef } />
            </RoundedBox>
            </mesh>
        </animated.group>
    </>
  )
}

export default TextField;