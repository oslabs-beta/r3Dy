import { OrbitControls, Text } from "@react-three/drei"
import * as THREE from "three";
import {useControls} from 'leva'
// import { DragControls } from 'three/examples/jsm/controls/DragControls.js'
import ReactDOM from "react-dom"
import { Canvas, useThree } from "react-three-fiber"
import { useGesture } from "@use-gesture/react"
import { useSpring, animated } from '@react-spring/three'

type SliderProps = {
    maxValue?: number
    value: number;
    steps?: number;
    onChange: React.Dispatch<React.SetStateAction<number>>;
}

export default function Slider({maxValue, value, steps, onChange}:SliderProps) {
    const max = maxValue ? maxValue: 10 //max value
    const spacing = steps ? steps: 2//increments
    const spaces = max/spacing // how many ticks there are
    const xIncrements = Math.round(12/(spaces+1)*10) //Hown many x values the ticks are space out
    console.log(xIncrements)
    const valueArray:number[] = []
        for (let i = 0; i<spaces+1; i++){
            valueArray.push(max-i*spacing)
        }
    console.log(valueArray)
    valueArray.sort((a,b)=>{return a-b})
    console.log(valueArray)

    const { size, viewport } = useThree()
    const aspect = size.width / viewport.width
    const [spring, set] = useSpring(() => ({ scale: [1, 1, 1], position: [0, 0, 0], rotation: [0, 0, 0],
      //  config:{friction: 1}
      }))
    const bind = useGesture({
      onDrag: ({ offset: [x, y] }) =>{
        const newX = Math.round(x/aspect*10)
        if(spaces%2!==0){
            if(newX % xIncrements === 0 && newX !== 0){
                if(newX/xIncrements<0){
                    onChange(valueArray[newX/xIncrements + (spaces+1)/2])
                }else{
                    onChange(valueArray[newX/xIncrements + (spaces+1)/2 - 1])
                }
                set({ position: [x/ aspect, 0, 0]})
            }
        } else{
            if(newX % xIncrements === 0){
                onChange(valueArray[newX/xIncrements + spaces/2])
                set({ position: [x/ aspect, 0, 0]})
            }
        }
    },
      onHover: ({ hovering }) => set({ scale: hovering ? [1.2, 1.2, 1.2] : [1, 1, 1] })
    })
    // console.log(spring.position)

    const {position} = useControls({
        position:{
            value:-6,
            min: -6,
            max: 6,
            step: 1
        }
    })
// console.log(...spring)
    return(
    <>
    {/* <OrbitControls makeDefault={ true }/> */}
        <group>
            <primitive object={new THREE.AxesHelper(10)} />
            
            <mesh scale={ 3 }>
                <planeGeometry args ={[3.9,.25]} />
                <meshBasicMaterial wireframe={ false } color={ 'red' } />
            </mesh>
            <animated.mesh  {...spring} {...bind()} castShadow>
                <sphereGeometry args ={[1,32,16]} />
                <meshBasicMaterial wireframe={ false } color={ 'aqua' } />
            </animated.mesh>
            <animated.mesh  {...spring} {...bind()}>
                <Text fontSize={.5}  castShadow position-y={1.5}  color={'black'} font={'fonts/Inter-Bold.ttf'}  overflowWrap='break-word'>{value}</Text>
                <meshBasicMaterial wireframe={ false } color={ 'black' } />
            </animated.mesh>
        </group>
    </>
    )
}
{/*  const [slider, setSlider] = useState(0);
  return (
    <Canvas 
    camera = { {
      near:.1,
      far:200,
      position: [0, 1, 8]
    } }
    >
      <Slider 
      onChange={setSlider}
      // maxValue={10}
      // steps={2}
      value={slider} />
    </Canvas>
  ) */}