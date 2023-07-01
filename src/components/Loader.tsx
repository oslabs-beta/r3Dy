import React from 'react'
import { OrbitControls } from "@react-three/drei"
import { useRef, useState } from 'react';
import { useSpring, animated } from '@react-spring/three'


export default function Loader() {
  
  const [active, setActive] = useState(false);

  const cube = useRef();



  return (
    <>
    <OrbitControls makeDefault={ true }/>
    <animated.mesh scale={ 2 } onClick={handleClick} ref={cube}>
        <boxGeometry />
        <meshBasicMaterial wireframe={ false } color={ 'red' } />
    </animated.mesh>
    </>
  )
}


