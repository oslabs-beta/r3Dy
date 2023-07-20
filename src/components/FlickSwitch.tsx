/* eslint-disable @typescript-eslint/no-non-null-assertion */
import  { useRef, useState } from 'react';
import { useSpring, animated} from '@react-spring/three'
import { MeshStandardMaterial, Group, Mesh, Material, BufferGeometry } from 'three';
import React from 'react';
 
 
 //typing for the passable props
 
type SwitchProps = {
    color?: string;
    size?: number;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    callback?: any;
    positionX?: number;
    positionY?: number;
    positionZ?: number;
}
 
 
 
 
export default function FlickSwitch({color, size, callback, positionX, positionY, positionZ}: SwitchProps) {
 //state to handle the flicking of the switch as well as turning on the callback
    const [active, setActive] = useState(false);
 //use refs to select certain portions of the switch to be animated
    const cube = useRef<Mesh<BufferGeometry, Material | Material[]>>(null!);
  const group = useRef<Group>(null!);
 //color used for the switch
    const metallicMaterial = new MeshStandardMaterial({
        color: color ? color: 'silver',
        metalness: 1,
        roughness: .41,
      });
 //older material used before. Can ignore
      const metallicMaterial2 = new MeshStandardMaterial({
        color: color ? color : 'silver',
        metalness: 1,
        roughness: .2,
      });
 //how the switch 'flicks'
    const animation = useSpring({
        'rotation-x': active ? Math.PI/5 : -Math.PI/5,
        config: { tension: 900, friction: 45 }
    })
 
 //onClick function that is used to set state as well as invoke the callback
    function clicked(): void {
        if (callback) {
          setActive(!active);
          if (!active) {
            callback();
          }
        }
        if (!callback) {
            setActive(!active)
        }
      }
 
 
 //this is where the actual switch is created and deployed. 

 //all of the lights are used to illuminate the scene and to create satisfying shadows. play with the positions to see different angles. Even try commenting out some to see what it looks like with less light sources. 

 //the animated group is the portion of the switch that moves when it is clicked. 

 //below are the base of the switch. They are the outer ring and a dark plane that is used to fill in some empty spots. 

 //please checkout THREE.js and react-three-fiber documentation as well. They will give you more insight on how you could further customize these meshes, materials, lights and cameras. 

 
 
    return (
        <>
            {/* <OrbitControls /> */}
            <ambientLight intensity={ 1 } />
            <directionalLight castShadow position={[2, 8, 5]} intensity={1} shadow-mapSize={1024} />
            <directionalLight castShadow position={ [ -5, 5, 2 ] } intensity={ 1 } shadow-mapSize={1024}/>
            <directionalLight castShadow position={ [ 5, -5, 2 ] } intensity={ 1 } />
            {/* <directionalLight position={ [ -8, 7, 9 ] } intensity={ 1 } /> */}
        <animated.group ref={ group } rotation-x={animation['rotation-x']} position-z={positionZ ? positionZ - .2 : -.2} position-x={positionX ? positionX : 0} position-y={positionY ? positionY : 0} scale={size ? size : 1} >
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
            position-z={positionZ ? positionZ : 0}
            position-x={positionX ? positionX : 0}
            position-y={positionY ? positionY : 0}
            >
                <torusGeometry args={[1.1, .4, 4, 200]} />
            </mesh>
            {/* <mesh scale={5}>
                <planeGeometry />
                <meshStandardMaterial  color={'rgb(34, 40, 64)'} />
            </mesh> */}
            <mesh scale={size ? size*2 : 2} position-z={positionZ ? positionZ + .01 : .01} position-x={positionX ? positionX : 0} position-y={positionY ? positionY : 0} material={metallicMaterial2}>
                <planeGeometry />
                <meshBasicMaterial  color={'grey'} />
            </mesh>
        </>
    )
}
