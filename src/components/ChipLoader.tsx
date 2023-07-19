/* eslint-disable @typescript-eslint/no-explicit-any */

import React, { useRef } from "react";
import { useGLTF, useMatcapTexture } from "@react-three/drei";
import { useFrame } from '@react-three/fiber'
import { MeshDistanceMaterial, MeshMatcapMaterial, MeshPhysicalMaterial, Group} from "three";

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


export default function ChipLoader(props: LoaderProps) {

  const chips = useRef() as any;

 // props.theme indicates a default light or dark mode --- color

const position: [number, number, number] = props.position || [0,0,0];
const scale: number = props.scale ? props.scale/100 : 0.01
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

//34 // 26
const [matcap] = useMatcapTexture(matcapIndex, matcapSize);

let materialAll;

if (material === MeshMatcapMaterial) materialAll = new material({color: color, matcap: matcap});
else if (material === MeshDistanceMaterial || material === MeshPhysicalMaterial) materialAll = new material({color: color});
else materialAll = new material({color:color, wireframe: wireframe}) 


useFrame((state, delta) => {
  const rotationSpeed: number = easeAnimation ? Math.abs(Math.sin(state.clock.elapsedTime) / Math.PI) - (0.0004 * state.clock.elapsedTime) : 1;

  if (chips.current) {
    if (rotationAxis === "x" || rotationAxis === "y" || rotationAxis === "z") {
      
      if (rotationDirection === 'negative' && easeAnimation) {
        chips.current.rotation[rotationAxis] += delta * rotationSpeed * -speed;
      } else if (rotationDirection === 'positive' && easeAnimation) {
        chips.current.rotation[rotationAxis] += delta * rotationSpeed * speed;
      }

      if (rotationDirection === 'negative' && !easeAnimation) {
        chips.current.rotation[rotationAxis] += (delta * rotationSpeed * -speed) / Math.PI;
      } else if (rotationDirection === 'positive' && !easeAnimation) {
        chips.current.rotation[rotationAxis] += (delta * rotationSpeed * speed) / Math.PI;
      }
    }
  }
});




if (chips.current) {
chips.current.position.x = position[0];
chips.current.position.y = position[1];
chips.current.position.z = position[2];  
}

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { nodes } = useGLTF("https://raw.githubusercontent.com/alecjessen/r3dy-static/main/chipLoader.gltf") as any;
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

useGLTF.preload("https://raw.githubusercontent.com/alecjessen/r3dy-static/main/chipLoader.gltf");