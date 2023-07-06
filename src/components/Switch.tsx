import React, { useRef, useState } from 'react';
import { OrbitControls, Shadow, Cylinder } from "@react-three/drei"
import { useSpring, animated, config } from '@react-spring/three'
import { MeshStandardMaterial } from 'three';
import { SoftShadows } from "@react-three/drei"
 
 
 
 
type SwitchProps = {
    color?: string;
    size?: number;
    callback?: any;
}
 
 
 
 
export default function Switch({color, size, callback}: SwitchProps) {
 
    const [active, setActive] = useState(false);
 
    const cube = useRef();
    const group = useRef();
 
    const metallicMaterial = new MeshStandardMaterial({
        color: color ? color: 'silver',
        metalness: 1,
        roughness: .41,
      });
 
      const metallicMaterial2 = new MeshStandardMaterial({
        color: color ? color : 'silver',
        metalness: 1,
        roughness: .2,
      });
 
    const { scale } = useSpring({
        scale: active ? 1.5 : 1,
        config: { tension: 1100, friction: 45 },
    })
 
    const animation = useSpring({
        'rotation-x': active ? Math.PI/5 : -Math.PI/5,
        config: { tension: 900, friction: 45 }
    })
 
 
    function clicked(): void {
        setActive(!active)
        if(!active) {
        //group.current.rotation.x += Math.PI/2
            setActive(!active)
        }
 
        if(active) {
        //group.current.rotation.x -= Math.PI/2
            setActive(!active)
        }
 
        callback()
    }
 
 
 
 
    return (
        <>
            {/* <OrbitControls /> */}
            <ambientLight intensity={ 1 } />
            <directionalLight castShadow position={[2, 8, 5]} intensity={1} shadow-mapSize={1024} />
            <directionalLight castShadow position={ [ -5, 5, 2 ] } intensity={ 1 } shadow-mapSize={1024}/>
            <directionalLight castShadow position={ [ 5, -5, 2 ] } intensity={ 1 } />
            {/* <directionalLight position={ [ -8, 7, 9 ] } intensity={ 1 } /> */}
        <animated.group ref={ group } rotation-x={animation['rotation-x']} position-z={-.2} scale={size ? size : 1}>
            <animated.mesh   
            onClick={clicked}
                ref={cube}
                rotation={[Math.PI / 2, 0, Math.PI]}
                position={[0, 0, 1.5]}
                material={metallicMaterial}
                receiveShadow castShadow
            >
                <capsuleGeometry args={[.35, 2.75, 7, 40]} />
 
            </animated.mesh>
            <animated.mesh
                rotation={[Math.PI / 2, 0, Math.PI]}
                position={[0, 0, 1.5]}
                material={metallicMaterial}
                receiveShadow castShadow
            >
                <cylinderGeometry args={[.35, .357, 3, 40]} />
 
            </animated.mesh>
            <animated.mesh
            material={metallicMaterial}
            receiveShadow castShadow
            >
                <sphereGeometry args={[ .65, 32, 32 ]}/>
            </animated.mesh>
        </animated.group>
            <mesh
            material={metallicMaterial}
            scale={size ? size : 1}
            receiveShadow castShadow
            >
                <torusGeometry args={[1.1, .4, 4, 200]} />
            </mesh>
            {/* <mesh scale={5}>
                <planeGeometry />
                <meshStandardMaterial  color={'rgb(34, 40, 64)'} />
            </mesh> */}
            <mesh scale={size ? size*2 : 2} position-z={.01} material={metallicMaterial2}>
                <planeGeometry />
                <meshBasicMaterial  color={'grey'} />
            </mesh>
        </>
    )
}