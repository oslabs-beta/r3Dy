/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */


import React, { useRef } from "react";
import { useGLTF, OrthographicCamera, MeshDistortMaterial } from "@react-three/drei";
import { useFrame } from '@react-three/fiber'
import { MeshBasicMaterial, MeshDepthMaterial, MeshLambertMaterial, MeshStandardMaterial, MeshToonMaterial, MeshMatcapMaterial } from "three";
export default function ChipLoader(props: any) {

 const chips = useRef();

 // props.theme indicates a default light or dark mode --- color

const scale: number = props.scale/100 || 0.01
const material = props.material || MeshMatcapMaterial
const speed: number = props.speed || 2
const rotationAxis: string = props.rotationAxis || 'y'
const rotationDirection: string = props.rotationDirection || 'negative'
const fancyAnimation: boolean = props.fancyAnimation || false;


let color = props.color || 'cyan'
if (!props.color && props.theme) {
    if (props.theme === 'light') {
        color = 'whitesmoke'
    } else {
        color = 'darkgrey'
    }
}

const materialAll = new material({color: color});


// animation logic
 useFrame((state, delta) => {

   const rotationSpeed: number = fancyAnimation ? Math.abs(Math.sin(state.clock.elapsedTime)) : 1

   if (rotationDirection === 'negative') {
    chips.current.rotation[rotationAxis] += delta * rotationSpeed * -speed
   } else {
    chips.current.rotation[rotationAxis] += delta * rotationSpeed * speed
   }
 })


  const { nodes } = useGLTF("/chipLoader.gltf");
  return (
    <group {...props} dispose={null}>   
        <group scale={scale} rotation={[Math.PI/2,0,0]} ref={chips}>
         <ambientLight  intensity={1}/>   
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.mesh_0_instance_0.geometry}
            material={materialAll}
            position={[150, 0, 0]}
            rotation={[0, 0.175, 0]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.mesh_0_instance_1.geometry}
            material={materialAll}
            position={[147.589, 0, 26.784]}
            rotation={[0, -0.005, 0]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.mesh_0_instance_2.geometry}
            material={materialAll}
            position={[140.435, 0, 52.706]}
            rotation={[0, -0.185, 0]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.mesh_0_instance_3.geometry}
            material={materialAll}
            position={[128.767, 0, 76.935]}
            rotation={[0, -0.364, 0]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.mesh_0_instance_4.geometry}
            material={materialAll}
            position={[112.961, 0, 98.691]}
            rotation={[0, -0.544, 0]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.mesh_0_instance_5.geometry}
            material={materialAll}
            position={[93.523, 0, 117.275]}
            rotation={[0, -0.723, 0]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.mesh_0_instance_6.geometry}
            material={materialAll}
            position={[71.08, 0, 132.089]}
            rotation={[0, -0.903, 0]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.mesh_0_instance_7.geometry}
            material={materialAll}
            position={[46.353, 0, 142.658]}
            rotation={[0, -1.082, 0]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.mesh_0_instance_8.geometry}
            material={materialAll}
            position={[20.135, 0, 148.642]}
            rotation={[0, -1.262, 0]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.mesh_0_instance_9.geometry}
            material={materialAll}
            position={[-6.73, 0, 149.849]}
            rotation={[0, -1.441, 0]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.mesh_0_instance_10.geometry}
            material={materialAll}
            position={[-33.378, 0, 146.239]}
            rotation={[Math.PI, -1.521, Math.PI]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.mesh_0_instance_11.geometry}
            material={materialAll}
            position={[-58.954, 0, 137.929]}
            rotation={[Math.PI, -1.341, Math.PI]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.mesh_0_instance_12.geometry}
            material={materialAll}
            position={[-82.635, 0, 125.186]}
            rotation={[Math.PI, -1.162, Math.PI]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.mesh_0_instance_13.geometry}
            material={materialAll}
            position={[-103.659, 0, 108.419]}
            rotation={[-Math.PI, -0.982, -Math.PI]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.mesh_0_instance_14.geometry}
            material={materialAll}
            position={[-121.353, 0, 88.168]}
            rotation={[-Math.PI, -0.803, -Math.PI]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.mesh_0_instance_15.geometry}
            material={materialAll}
            position={[-135.145, 0, 65.083]}
            rotation={[-Math.PI, -0.623, -Math.PI]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.mesh_0_instance_16.geometry}
            material={materialAll}
            position={[-144.594, 0, 39.906]}
            rotation={[-Math.PI, -0.444, -Math.PI]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.mesh_0_instance_17.geometry}
            material={materialAll}
            position={[-149.396, 0, 13.446]}
            rotation={[-Math.PI, -0.264, -Math.PI]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.mesh_0_instance_18.geometry}
            material={materialAll}
            position={[-149.396, 0, -13.446]}
            rotation={[-Math.PI, -0.085, -Math.PI]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.mesh_0_instance_19.geometry}
            material={materialAll}
            position={[-144.594, 0, -39.906]}
            rotation={[-Math.PI, 0.095, -Math.PI]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.mesh_0_instance_20.geometry}
            material={materialAll}
            position={[-135.145, 0, -65.083]}
            rotation={[-Math.PI, 0.274, -Math.PI]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.mesh_0_instance_21.geometry}
            material={materialAll}
            position={[-121.353, 0, -88.168]}
            rotation={[-Math.PI, 0.454, -Math.PI]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.mesh_0_instance_22.geometry}
            material={materialAll}
            position={[-103.659, 0, -108.419]}
            rotation={[-Math.PI, 0.633, -Math.PI]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.mesh_0_instance_23.geometry}
            material={materialAll}
            position={[-82.635, 0, -125.186]}
            rotation={[-Math.PI, 0.813, -Math.PI]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.mesh_0_instance_24.geometry}
            material={materialAll}
            position={[-58.954, 0, -137.929]}
            rotation={[-Math.PI, 0.992, -Math.PI]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.mesh_0_instance_25.geometry}
            material={materialAll}
            position={[-33.378, 0, -146.239]}
            rotation={[-Math.PI, 1.172, -Math.PI]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.mesh_0_instance_26.geometry}
            material={materialAll}
            position={[-6.73, 0, -149.849]}
            rotation={[-Math.PI, 1.351, -Math.PI]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.mesh_0_instance_27.geometry}
            material={materialAll}
            position={[20.135, 0, -148.642]}
            rotation={[-Math.PI, 1.531, -Math.PI]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.mesh_0_instance_28.geometry}
            material={materialAll}
            position={[46.353, 0, -142.658]}
            rotation={[0, 1.431, 0]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.mesh_0_instance_29.geometry}
            material={materialAll}
            position={[71.08, 0, -132.089]}
            rotation={[0, 1.252, 0]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.mesh_0_instance_30.geometry}
            material={materialAll}
            position={[93.523, 0, -117.275]}
            rotation={[0, 1.072, 0]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.mesh_0_instance_31.geometry}
            material={materialAll}
            position={[112.961, 0, -98.691]}
            rotation={[0, 0.893, 0]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.mesh_0_instance_32.geometry}
            material={materialAll}
            position={[128.767, 0, -76.935]}
            rotation={[0, 0.713, 0]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.mesh_0_instance_33.geometry}
            material={materialAll}
            position={[140.435, 0, -52.706]}
            rotation={[0, 0.534, 0]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.mesh_0_instance_34.geometry}
            material={materialAll}
            position={[147.589, 0, -26.784]}
            rotation={[0, 0.354, 0]}
          />
        </group>
      </group>
  );
}

useGLTF.preload("/chipLoader.gltf");

