/* eslint-disable @typescript-eslint/no-explicit-any */

import React, { useRef } from "react";
import { useGLTF, useMatcapTexture } from "@react-three/drei";
import { useFrame } from '@react-three/fiber'
import { MeshDistanceMaterial, MeshMatcapMaterial, MeshPhysicalMaterial } from "three";

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




export default function MeshLoader(props: LoaderProps) {
  
  const model = useRef() as any;

const position: [number, number, number] = props.position || [0,0,0];
const scale: number = props.scale ? props.scale/50 : 0.025
const material = props.material || MeshMatcapMaterial
const speed: number = props.speed || 5
const rotationAxis: string = props.rotationAxis || 'z'
const rotationDirection: string = props.rotationDirection || 'negative'
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


// default, need to allow more customization for madcap stuff
const [matcap] = useMatcapTexture(matcapIndex, matcapSize);


let materialAll;

if (material === MeshMatcapMaterial) materialAll = new material({color: color, matcap: matcap});
else if (material === MeshDistanceMaterial || material === MeshPhysicalMaterial) materialAll = new material({color: color});
else materialAll = new material({color:color, wireframe: wireframe}) 

// let materialAll = material === MeshMatcapMaterial ? new material({color: color, matcap: matcap}) : new material({color: color, wireframe: wireframe})




// animation logic
useFrame((state, delta) => {
  const rotationSpeed: number = easeAnimation ? Math.abs(Math.sin(state.clock.elapsedTime) / Math.PI) - (0.0004 * state.clock.elapsedTime) : 1;

  if (model.current) {
    if (rotationAxis === "x" || rotationAxis === "y" || rotationAxis === "z") {
      
      if (rotationDirection === 'negative' && easeAnimation) {
        model.current.rotation[rotationAxis] += delta * rotationSpeed * -speed;
      } else if (rotationDirection === 'positive' && easeAnimation) {
        model.current.rotation[rotationAxis] += delta * rotationSpeed * speed;
      }

      if (rotationDirection === 'negative' && !easeAnimation) {
        model.current.rotation[rotationAxis] += (delta * rotationSpeed * -speed) / Math.PI;
      } else if (rotationDirection === 'positive' && !easeAnimation) {
        model.current.rotation[rotationAxis] += (delta * rotationSpeed * speed) / Math.PI;
      }
    }
  }
});

if (model.current) {
  model.current.position.x = position[0];
  model.current.position.y = position[1];
  model.current.position.z = position[2];  
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { nodes } = useGLTF("https://raw.githubusercontent.com/alecjessen/r3dy-static/main/meshLoader.gltf") as any;
  return (
    <group {...props} dispose={null}>
      <group scale={scale} rotation={[Math.PI/2, 0, 0]} position={[0,0,0]} ref={model}>
        <ambientLight 
        intensity={1}
        />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.mesh_1_instance_0.geometry}
            material={materialAll}
            position={[62, 0, 0]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.mesh_1_instance_1.geometry}
            material={materialAll}
            position={[61.66, 0, 6.481]}
            rotation={[0, -0.105, 0]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.mesh_1_instance_2.geometry}
            material={materialAll}
            position={[60.645, 0, 12.891]}
            rotation={[0, -0.209, 0]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.mesh_1_instance_3.geometry}
            material={materialAll}
            position={[58.966, 0, 19.159]}
            rotation={[0, -Math.PI / 10, 0]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.mesh_1_instance_4.geometry}
            material={materialAll}
            position={[56.64, 0, 25.218]}
            rotation={[0, -0.419, 0]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.mesh_1_instance_5.geometry}
            material={materialAll}
            position={[53.694, 0, 31]}
            rotation={[0, -Math.PI / 6, 0]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.mesh_1_instance_6.geometry}
            material={materialAll}
            position={[50.159, 0, 36.443]}
            rotation={[0, -Math.PI / 5, 0]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.mesh_1_instance_7.geometry}
            material={materialAll}
            position={[46.075, 0, 41.486]}
            rotation={[0, -0.733, 0]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.mesh_1_instance_8.geometry}
            material={materialAll}
            position={[41.486, 0, 46.075]}
            rotation={[0, -0.838, 0]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.mesh_1_instance_9.geometry}
            material={materialAll}
            position={[36.443, 0, 50.159]}
            rotation={[0, -0.942, 0]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.mesh_1_instance_10.geometry}
            material={materialAll}
            position={[31, 0, 53.694]}
            rotation={[0, -Math.PI / 3, 0]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.mesh_1_instance_11.geometry}
            material={materialAll}
            position={[25.218, 0, 56.64]}
            rotation={[0, -1.152, 0]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.mesh_1_instance_12.geometry}
            material={materialAll}
            position={[19.159, 0, 58.966]}
            rotation={[0, -1.257, 0]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.mesh_1_instance_13.geometry}
            material={materialAll}
            position={[12.891, 0, 60.645]}
            rotation={[0, -1.361, 0]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.mesh_1_instance_14.geometry}
            material={materialAll}
            position={[6.481, 0, 61.66]}
            rotation={[0, -1.466, 0]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.mesh_1_instance_15.geometry}
            material={materialAll}
            position={[0, 0, 62]}
            rotation={[0, -Math.PI / 2, 0]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.mesh_1_instance_16.geometry}
            material={materialAll}
            position={[-6.481, 0, 61.66]}
            rotation={[Math.PI, -1.466, Math.PI]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.mesh_1_instance_17.geometry}
            material={materialAll}
            position={[-12.891, 0, 60.645]}
            rotation={[Math.PI, -1.361, Math.PI]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.mesh_1_instance_18.geometry}
            material={materialAll}
            position={[-19.159, 0, 58.966]}
            rotation={[Math.PI, -1.257, Math.PI]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.mesh_1_instance_19.geometry}
            material={materialAll}
            position={[-25.218, 0, 56.64]}
            rotation={[Math.PI, -1.152, Math.PI]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.mesh_1_instance_20.geometry}
            material={materialAll}
            position={[-31, 0, 53.694]}
            rotation={[Math.PI, -Math.PI / 3, Math.PI]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.mesh_1_instance_21.geometry}
            material={materialAll}
            position={[-36.443, 0, 50.159]}
            rotation={[-Math.PI, -0.942, -Math.PI]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.mesh_1_instance_22.geometry}
            material={materialAll}
            position={[-41.486, 0, 46.075]}
            rotation={[-Math.PI, -0.838, -Math.PI]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.mesh_1_instance_23.geometry}
            material={materialAll}
            position={[-46.075, 0, 41.486]}
            rotation={[-Math.PI, -0.733, -Math.PI]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.mesh_1_instance_24.geometry}
            material={materialAll}
            position={[-50.159, 0, 36.443]}
            rotation={[-Math.PI, -Math.PI / 5, -Math.PI]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.mesh_1_instance_25.geometry}
            material={materialAll}
            position={[-53.694, 0, 31]}
            rotation={[-Math.PI, -Math.PI / 6, -Math.PI]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.mesh_1_instance_26.geometry}
            material={materialAll}
            position={[-56.64, 0, 25.218]}
            rotation={[-Math.PI, -0.419, -Math.PI]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.mesh_1_instance_27.geometry}
            material={materialAll}
            position={[-58.966, 0, 19.159]}
            rotation={[-Math.PI, -Math.PI / 10, -Math.PI]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.mesh_1_instance_28.geometry}
            material={materialAll}
            position={[-60.645, 0, 12.891]}
            rotation={[-Math.PI, -0.209, -Math.PI]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.mesh_1_instance_29.geometry}
            material={materialAll}
            position={[-61.66, 0, 6.481]}
            rotation={[-Math.PI, -0.105, -Math.PI]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.mesh_1_instance_30.geometry}
            material={materialAll}
            position={[-62, 0, 0]}
            rotation={[-Math.PI, 0, -Math.PI]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.mesh_1_instance_31.geometry}
            material={materialAll}
            position={[-61.66, 0, -6.481]}
            rotation={[-Math.PI, 0.105, -Math.PI]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.mesh_1_instance_32.geometry}
            material={materialAll}
            position={[-60.645, 0, -12.891]}
            rotation={[-Math.PI, 0.209, -Math.PI]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.mesh_1_instance_33.geometry}
            material={materialAll}
            position={[-58.966, 0, -19.159]}
            rotation={[-Math.PI, Math.PI / 10, -Math.PI]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.mesh_1_instance_34.geometry}
            material={materialAll}
            position={[-56.64, 0, -25.218]}
            rotation={[-Math.PI, 0.419, -Math.PI]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.mesh_1_instance_35.geometry}
            material={materialAll}
            position={[-53.694, 0, -31]}
            rotation={[-Math.PI, Math.PI / 6, -Math.PI]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.mesh_1_instance_36.geometry}
            material={materialAll}
            position={[-50.159, 0, -36.443]}
            rotation={[-Math.PI, Math.PI / 5, -Math.PI]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.mesh_1_instance_37.geometry}
            material={materialAll}
            position={[-46.075, 0, -41.486]}
            rotation={[-Math.PI, 0.733, -Math.PI]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.mesh_1_instance_38.geometry}
            material={materialAll}
            position={[-41.486, 0, -46.075]}
            rotation={[-Math.PI, 0.838, -Math.PI]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.mesh_1_instance_39.geometry}
            material={materialAll}
            position={[-36.443, 0, -50.159]}
            rotation={[-Math.PI, 0.942, -Math.PI]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.mesh_1_instance_40.geometry}
            material={materialAll}
            position={[-31, 0, -53.694]}
            rotation={[-Math.PI, Math.PI / 3, -Math.PI]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.mesh_1_instance_41.geometry}
            material={materialAll}
            position={[-25.218, 0, -56.64]}
            rotation={[-Math.PI, 1.152, -Math.PI]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.mesh_1_instance_42.geometry}
            material={materialAll}
            position={[-19.159, 0, -58.966]}
            rotation={[-Math.PI, 1.257, -Math.PI]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.mesh_1_instance_43.geometry}
            material={materialAll}
            position={[-12.891, 0, -60.645]}
            rotation={[-Math.PI, 1.361, -Math.PI]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.mesh_1_instance_44.geometry}
            material={materialAll}
            position={[-6.481, 0, -61.66]}
            rotation={[-Math.PI, 1.466, -Math.PI]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.mesh_1_instance_45.geometry}
            material={materialAll}
            position={[0, 0, -62]}
            rotation={[0, Math.PI / 2, 0]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.mesh_1_instance_46.geometry}
            material={materialAll}
            position={[6.481, 0, -61.66]}
            rotation={[0, 1.466, 0]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.mesh_1_instance_47.geometry}
            material={materialAll}
            position={[12.891, 0, -60.645]}
            rotation={[0, 1.361, 0]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.mesh_1_instance_48.geometry}
            material={materialAll}
            position={[19.159, 0, -58.966]}
            rotation={[0, 1.257, 0]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.mesh_1_instance_49.geometry}
            material={materialAll}
            position={[25.218, 0, -56.64]}
            rotation={[0, 1.152, 0]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.mesh_1_instance_50.geometry}
            material={materialAll}
            position={[31, 0, -53.694]}
            rotation={[0, Math.PI / 3, 0]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.mesh_1_instance_51.geometry}
            material={materialAll}
            position={[36.443, 0, -50.159]}
            rotation={[0, 0.942, 0]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.mesh_1_instance_52.geometry}
            material={materialAll}
            position={[41.486, 0, -46.075]}
            rotation={[0, 0.838, 0]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.mesh_1_instance_53.geometry}
            material={materialAll}
            position={[46.075, 0, -41.486]}
            rotation={[0, 0.733, 0]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.mesh_1_instance_54.geometry}
            material={materialAll}
            position={[50.159, 0, -36.443]}
            rotation={[0, Math.PI / 5, 0]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.mesh_1_instance_55.geometry}
            material={materialAll}
            position={[53.694, 0, -31]}
            rotation={[0, Math.PI / 6, 0]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.mesh_1_instance_56.geometry}
            material={materialAll}
            position={[56.64, 0, -25.218]}
            rotation={[0, 0.419, 0]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.mesh_1_instance_57.geometry}
            material={materialAll}
            position={[58.966, 0, -19.159]}
            rotation={[0, Math.PI / 10, 0]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.mesh_1_instance_58.geometry}
            material={materialAll}
            position={[60.645, 0, -12.891]}
            rotation={[0, 0.209, 0]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.mesh_1_instance_59.geometry}
            material={materialAll}
            position={[61.66, 0, -6.481]}
            rotation={[0, 0.105, 0]}
          />
        </group>
      </group>
  );
}

useGLTF.preload("https://raw.githubusercontent.com/alecjessen/r3dy-static/main/meshLoader.gltf");
