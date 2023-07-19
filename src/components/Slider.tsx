import { Text, RoundedBox } from "@react-three/drei"
// import { DragControls } from 'three/examples/jsm/controls/DragControls.js'
import { useThree, useFrame } from "@react-three/fiber"
import { useGesture } from "@use-gesture/react"
import { useSpring, animated } from '@react-spring/three'
import { useState, useRef } from "react";
import React from "react";


type SliderProps = {
    maxValue?: number;
    value?: number;
    steps?: number;
    onChange?: React.Dispatch<React.SetStateAction<number>>;
}

export default function Slider({maxValue, value, steps, onChange}:SliderProps) {
    const max = maxValue ? maxValue: 10 //max value
    const spacing = steps ? steps: 2//increments
    const spaces = max/spacing // how many ticks there are
    const xIncrements = Math.round(12/(spaces+1)*10) //Hown many x values the ticks are space out
    const [slider, setSlider] = useState(0)
    let change:any;
    if(onChange){
        change = onChange
    } else{
        change = setSlider
    }
    const [outline, setOutline] = useState(false)

    const valueArray:number[] = []
        for (let i = 0; i<spaces+1; i++){
            valueArray.push(max-i*spacing)
        }
    valueArray.sort((a,b)=>{return a-b})

    const { size, viewport } = useThree()
    const aspect = size.width / viewport.width
    const [spring, set] = useSpring(() => ({ scale: [1, 1, 1], position: [0, 0, 0], rotation: [0, 0, 0],
      //  config:{friction: 1}
      }))
    const bind:any = useGesture({
      onDrag: ({ offset: [x, y] }) =>{
        const newX = Math.round(x/aspect*10)
        if(spaces%2!==0){
            if(newX % xIncrements === 0 && newX !== 0 ){
                if(newX/xIncrements<0 && (newX/xIncrements + (spaces+1)/2)>=0){
                    change(valueArray[newX/xIncrements + (spaces+1)/2])
                    set({ position: [x/ aspect, y*0, 0]})
                }else if (newX/xIncrements>0 && (newX/xIncrements + (spaces+1)/2 - 1) < valueArray.length){
                    change(valueArray[newX/xIncrements + (spaces+1)/2 - 1])
                    set({ position: [x/ aspect, y*0, 0]})

                }
            }
        } else{
            if(newX % xIncrements === 0 && (newX/xIncrements + spaces/2)>=0 && (newX/xIncrements + spaces/2) < valueArray.length){
                change(valueArray[newX/xIncrements + spaces/2])
                set({ position: [x/ aspect, y*0, 0]})
            }
        }
    },
      onHover: ({ hovering }) => {
        hovering? setOutline(true) : setOutline(false)
        set({scale: hovering ?  [1.2,1.2,1.2]:[1.0,1.0,1.0]})
    }
    })
    const wireframeRef = useRef<any>();
    useFrame(()=>{
        if(outline){
            wireframeRef.current ? wireframeRef.current.rotation.y += .01 : null
        }
    })

    // const {position} = useControls({
    //     position:{
    //         value:-6,
    //         min: -6,
    //         max: 6,
    //         step: 1
    //     }
    // })
    return(
    <>
    {/* <OrbitControls makeDefault={ true }/> */}
        <group  >
            {/* <primitive object={new THREE.AxesHelper(10)} /> */}
            
            {/* <mesh position={[0,0,-2]} scale={ 4 }>
                <planeGeometry args ={[3.9,.25]} />
                <meshBasicMaterial wireframe={ false } color={ '#3F37C9' } />
            </mesh> */}
            {outline && <animated.mesh {...spring as any} {...bind()} ref={wireframeRef} scale={1.3}  castShadow>
                <sphereGeometry args ={[1,32,16]} />
                <meshBasicMaterial wireframe={ true } color={ 'white' } />
            </animated.mesh>}
            <animated.mesh {...spring as any} {...bind()} castShadow>
                <sphereGeometry args ={[1,32,16]} />
                <meshBasicMaterial wireframe={ false } color={ '#3F37C9' } />
            </animated.mesh>
            <RoundedBox args={[3.9, .2, 0]} position={[0,0,-2]} radius={0.1} scale={4}>
                <meshBasicMaterial color={"#3F37C9"} />
            </RoundedBox> 
            <animated.mesh  {...spring as any} {...bind()}>
                <Text fontSize={.5}  castShadow position-y={1.5}  color={'#3F37C9'} font={'fonts/Inter-Bold.ttf'}  overflowWrap='break-word'>{value? value:slider}</Text>
                <meshBasicMaterial wireframe={ false } color={ '#3F37C9' } />
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