import React, { useRef, useState } from 'react';
import { OrbitControls } from "@react-three/drei"
import * as THREE from "three";
import {useControls} from 'leva'
// import { DragControls } from 'three/examples/jsm/controls/DragControls.js'
import ReactDOM from "react-dom"
import { Canvas, useThree } from "react-three-fiber"
import { useGesture } from "@use-gesture/react"
import { useSpring, animated } from '@react-spring/three'

// export default function Dodecahedron() {
//   const { size, viewport } = useThree()
//   const aspect = size.width / viewport.width
//   const [spring, set] = useSpring(() => ({ scale: [1, 1, 1], position: [0, 0, 0], rotation: [0, 0, 0], config: { friction: 10 } }))
//   const bind = useGesture({
//     onDrag: ({ offset: [x, y] }) => set({ position: [x / aspect, -y / aspect, 0], rotation: [y / aspect, x / aspect, 0] }),
//     onHover: ({ hovering }) => set({ scale: hovering ? [1.2, 1.2, 1.2] : [1, 1, 1] })
//   })
//   return (
//     <animated.mesh {...spring} {...bind()} castShadow>
//       <sphereGeometry args={[1.4, 0]} />
//       <meshNormalMaterial />
//     </animated.mesh>
//   )
// }


export default function Slider() {

    const { size, viewport } = useThree()
    const aspect = size.width / viewport.width
    const [spring, set] = useSpring(() => ({ scale: [1, 1, 1], position: [0, 0, 0], rotation: [0, 0, 0],
      //  config:{friction: 1}
      }))
    const bind = useGesture({
      onDrag: ({ offset: [x, y] }) =>{
        console.log(x) //x here refers to cursors x postion
        set({ position: [x / aspect , 0, 0], rotation: [y / aspect, x / aspect, 0] })},
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
                <planeGeometry args ={[4,.25]} />
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