import React, { useRef, useState } from 'react';
import { OrbitControls } from "@react-three/drei"
import * as THREE from "three";
import { useControls } from 'leva'
// import { DragControls } from 'three/examples/jsm/controls/DragControls.js'
import ReactDOM from "react-dom"
import { Canvas, useThree } from "react-three-fiber"
import { useGesture } from "@use-gesture/react"
import { useSpring, animated } from '@react-spring/three'


export default function Slider() {
    const [value, setValue] = useState(0);
    let max = .5 //max value
    let spacing = .1 //increments
    let spaces = max/spacing // how many ticks there are
    let xIncrements = Math.round(12/(spaces+1)*10) //Hown many x values the ticks are space out
    console.log(xIncrements)
    const valueArray= []
        for (let i = 0; i<spaces+1; i++){
            valueArray.push(max-i*spacing)
        }
    console.log(valueArray)
    valueArray.sort((a,b)=>{return a-b})
    console.log(valueArray)
    // let valueArrayIndex = valueArray.length

    const { size, viewport } = useThree()
    const aspect = size.width / viewport.width
    const [spring, set] = useSpring(() => ({ scale: [1, 1, 1], position: [0, 0, 0], rotation: [0, 0, 0],
      //  config:{friction: 1}
      }))
    const bind = useGesture({
      onDrag: ({ offset: [x, y] }) =>{
        // console.log(Math.round(x/aspect*10)/10) //x here refers to cursors x postion
        const newX = Math.round(x/aspect*10)
        if(spaces%2!==0){
            if(newX % xIncrements === 0 && newX !== 0){
                // console.log('hello')
                // console.log(newX)
                if(newX/xIncrements<0){
                    console.log(newX/xIncrements + (spaces+1)/2)

                }else{
                    console.log(newX/xIncrements + (spaces+1)/2 - 1)
                }
                set({ position: [x/ aspect, 0, 0], rotation: [y / aspect, x / aspect, 0] })
                // console.log(newX/xIncrements)
            }
        } else{
            if(newX % xIncrements === 0){
                // console.log('hello')
                console.log(newX/xIncrements + spaces/2)
                set({ position: [x/ aspect, 0, 0], rotation: [y / aspect, x / aspect, 0] })
                // setValue(max/spacing/xIncrements)
                // console.log(max/spacing/xIncrements)
            }
        }
    },
      onHover: ({ hovering }) => set({ scale: hovering ? [1.2, 1.2, 1.2] : [1, 1, 1] })
    })

    const {position} = useControls({
        position:{
            value:-6,
            min: -6,
            max: 6,
            step: 1
        }
    })

    return(
    <>
    {/* <OrbitControls makeDefault={ true }/> */}
        <group>
            <primitive object={new THREE.AxesHelper(10)} />

            <mesh scale={ 3 }>
                <planeGeometry args ={[3.9,.25]} />
                <meshBasicMaterial wireframe={ false } color={ 'red' } />
            </mesh>
            <animated.mesh scale={ 1 } position-x = {position} {...spring} {...bind()} castShadow>
                <sphereGeometry args ={[1,32,16]} />
                <meshBasicMaterial wireframe={ false } color={ 'aqua' } />
            </animated.mesh>
        </group>
    </>
    )
}
{/* <Canvas 
    camera = { {
      near:.1,
      far:200,
      position: [0, 1, 8]
    } }
    >
      <Slider />
    </Canvas> */}