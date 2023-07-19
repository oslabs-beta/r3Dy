/* eslint-disable @typescript-eslint/no-explicit-any */

import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { useGLTF, PerspectiveCamera, useMatcapTexture } from "@react-three/drei";
import {MeshDistanceMaterial,  MeshMatcapMaterial, MeshPhysicalMaterial, Group } from "three";


type LoaderProps = {
  color?: string;
  scale?: number;
  rotationAxis?: 'y' | 'x' | 'z';
  rotationDirection? : 'positive' | 'negative';
  easeAnimation?: boolean;
  speed?: number;
  theme?: 'dark' | 'light';
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  material?: any;
  wireframe?: boolean;
  matcapIndex?: number;
  matcapSize?: 64 | 128 | 256 | 512 | 1024;
  position?: [number, number, number];
}



export default function HexagonLoader( props: LoaderProps ) {


  // color, material, speed, scale//100
const position: [number, number, number] = props.position || [0,0,0];
const scale: number = props.scale ? props.scale/85 : 0.01
const loader = useRef() as any;
const material = props.material || MeshMatcapMaterial
const speed: number = props.speed || 5
const rotationAxis: string = props.rotationAxis || 'y'
const rotationDirection: string = props.rotationDirection || 'positive'
const easeAnimation: boolean = props.easeAnimation || false;
const wireframe: boolean = props.wireframe || false;
let matcapIndex: number = props.matcapIndex || 34;
const matcapSize: 64 | 128 | 256 | 512 | 1024 = props.matcapSize || 1024;

const theme: string = props.theme || 'light'

let color = props.color || 'whitesmoke'


if (!props.color) {
    if (theme === 'light') {
        color = 'whitesmoke'
        matcapIndex = 21;
    } else {
        color = 'grey'
        matcapIndex = 21;
    }
}

const [matcap] = useMatcapTexture(matcapIndex, matcapSize);

let materialAll;

if (material === MeshMatcapMaterial) materialAll = new material({color: color, matcap: matcap});
else if (material === MeshDistanceMaterial || material === MeshPhysicalMaterial) materialAll = new material({color: color});
else materialAll = new material({color:color, wireframe: wireframe}) 



// animation logic
useFrame((state, delta) => {
  const rotationSpeed: number = easeAnimation ? Math.abs(Math.sin(state.clock.elapsedTime) / Math.PI) - (0.0004 * state.clock.elapsedTime) : 1;

  if (loader.current) {
    if (rotationAxis === "x" || rotationAxis === "y" || rotationAxis === "z") {
      
      if (rotationDirection === 'negative' && easeAnimation) {
        loader.current.rotation[rotationAxis] += delta * rotationSpeed * -speed;
      } else if (rotationDirection === 'positive' && easeAnimation) {
        loader.current.rotation[rotationAxis] += delta * rotationSpeed * speed;
      }

      if (rotationDirection === 'negative' && !easeAnimation) {
        loader.current.rotation[rotationAxis] += (delta * rotationSpeed * -speed) / Math.PI;
      } else if (rotationDirection === 'positive' && !easeAnimation) {
        loader.current.rotation[rotationAxis] += (delta * rotationSpeed * speed) / Math.PI;
      }
    }
  }
});

if (loader.current) {
  loader.current.position.x = position[0];
  loader.current.position.y = position[1];
  loader.current.position.z = position[2];  
  }



  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { nodes } = useGLTF("https://raw.githubusercontent.com/alecjessen/r3dy-static/main/hexagonLoader.gltf") as any;
  return (
      <group scale={scale} ref={loader}>
        <ambientLight />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Pentagon_7.geometry}
          position={[-0.019, 1.957, -61.235]}
          material={materialAll}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Pentagon_6.geometry}
          position={[-0.019, 1.957, 66.482]}
          material={materialAll}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Pentagon.geometry}
          material={materialAll}
        />
        <directionalLight
          intensity={2}
          rotation={[-0.506, 0.629, 0.756]}
        />
        <PerspectiveCamera
          makeDefault={false}
          far={100000}
          near={70}
          fov={45}
          position={[0, 0, -1000]}
          rotation={[-Math.PI, 0, Math.PI]}
        />
      </group>
  );
}

useGLTF.preload("https://raw.githubusercontent.com/alecjessen/r3dy-static/main/hexagonLoader.gltf");
