import React, { useRef, useState } from 'react';
import { OrbitControls, Shadow, Cylinder } from "@react-three/drei"
import { useSpring, animated, config } from '@react-spring/three'
import { MeshStandardMaterial } from 'three';
import Options from './options'

import { generate } from '../actions/actions';
import { useDispatch } from 'react-redux'

const metallicMaterial = new MeshStandardMaterial({
    color: 'silver',
    metalness: 1,
    roughness: .41,
  });

  const metallicMaterial2 = new MeshStandardMaterial({
    color: 'silver',
    metalness: 1,
    roughness: .2,
  });






export default function Switch() {

    const [active, setActive] = useState(false);

    const cube = useRef();
    const group = useRef();

    const { scale } = useSpring({
        scale: active ? 1.5 : 1,
        config: { tension: 1100, friction: 45 },
    })

    const animation = useSpring({
        'rotation-x': active ? Math.PI/5 : -Math.PI/5,
        config: { tension: 900, friction: 45 }
    })

    

    const clicked = () => {
        setActive(!active)
        if(!active) {
        //group.current.rotation.x += Math.PI/2
            setActive(!active)
        }

        if(active) {
        //group.current.rotation.x -= Math.PI/2
            setActive(!active)
        }

        // handleClick()
    }




    return (
        <>
            {/* <OrbitControls /> */}
            <ambientLight intensity={ 1 } />
            <directionalLight position={ [ -1, 2, 3 ] } intensity={ 1 } />
            <directionalLight position={ [ -8, -2, -2 ] } intensity={ 1 } />
            <directionalLight position={ [ -8, 7, 9 ] } intensity={ 1 } />
        <animated.group ref={ group } rotation-x={animation['rotation-x']} position-z={-.2}>
            <animated.mesh   onClick={clicked}
                ref={cube}
                rotation={[Math.PI / 2, 0, Math.PI]}
                position={[0, 0, 1.5]}
                material={metallicMaterial}
            >
                <capsuleGeometry args={[.35, 2.75, 7, 40]} />
                {/* <meshStandardMaterial  color={'silver'} /> */}
            </animated.mesh>
            <animated.mesh
                rotation={[Math.PI / 2, 0, Math.PI]}
                position={[0, 0, 1.5]}
                material={metallicMaterial}
            >
                <cylinderGeometry args={[.35, .357, 3, 40]} />
                {/* <meshStandardMaterial  color={'silver'} /> */}
            </animated.mesh>
            <animated.mesh
            material={metallicMaterial}
            >
                <sphereGeometry args={[ .65, 32, 32 ]}/>
                {/* <meshStandardMaterial  color={'silver'} /> */}
            </animated.mesh>
        </animated.group>
            <mesh
            material={metallicMaterial}
            >
                <torusGeometry args={[1.1, .4, 4, 200]} />
                {/* <meshStandardMaterial  color={'grey'} /> */}
            </mesh>
            {/* <mesh scale={5}>
                <planeGeometry />
                <meshStandardMaterial  color={'rgb(34, 40, 64)'} />
            </mesh>
            <mesh scale={2} position-z={.01} material={metallicMaterial2}>
                <planeGeometry />
                <meshBasicMaterial  color={'grey'} />
            </mesh> */}
        </>
    )
}