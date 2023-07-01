import React from 'react'
import { OrbitControls } from "@react-three/drei"
import { useRef, useState } from 'react';
import { useSpring, animated } from '@react-spring/three'


export default function Loader() {
  
  const [active, setActive] = useState(false);

  const cube = useRef();

  const { scale } = useSpring({ scale: active ? 1.5 : 1 })


  return (
    <>
    <OrbitControls makeDefault={ true }/>
    <animated.mesh scale={ 2 } ref={cube}>
        <boxGeometry />
        <meshBasicMaterial wireframe={ false } color={ 'red' } />
    </animated.mesh>
    </>
  )
}


