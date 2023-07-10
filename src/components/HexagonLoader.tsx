import React from "react";
import { useFrame } from "@react-three/fiber";
import { useGLTF, PerspectiveCamera, useMatcapTexture } from "@react-three/drei";
import {MeshBasicMaterial, MeshDepthMaterial, MeshDistanceMaterial, MeshLambertMaterial, MeshMatcapMaterial, MeshNormalMaterial, MeshPhongMaterial, MeshPhysicalMaterial, MeshStandardMaterial, MeshToonMaterial, Group } from "three";


type LoaderProps = {
  color?: string;
  scale?: number;
  rotationAxis?: 'y' | 'x' | 'z';
  rotationDirection? : 'positive' | 'negative';
  fancyAnimation?: boolean;
  speed?: number;
  theme?: string;
  material?: MeshBasicMaterial | MeshDepthMaterial | MeshDistanceMaterial | MeshLambertMaterial | MeshMatcapMaterial | MeshNormalMaterial | MeshPhongMaterial | MeshPhysicalMaterial | MeshStandardMaterial | MeshToonMaterial;
  wireframe?: boolean;
  matcapIndex?: number;
  matcapSize?: 64 | 128 | 256 | 512 | 1024;
}

export default function HexagonLoader( props: LoaderProps ) {
  // color, material, speed, scale//100
const scale: number = props.scale ? props.scale/85 : 0.01
const loader = React.useRef<Group>(null);
const material = props.material || MeshMatcapMaterial
const speed: number = props.speed || 5
const rotationAxis: string = props.rotationAxis || 'y'
const rotationDirection: string = props.rotationDirection || 'negative'
const fancyAnimation: boolean = props.fancyAnimation || false;
const wireframe: boolean = props.wireframe || false;
const matcapIndex: number = props.matcapIndex || 34;
const matcapSize: 64 | 128 | 256 | 512 | 1024 = props.matcapSize || 1024;


let color = props.color || 'cyan'
if (!props.color && props.theme) {
    if (props.theme === 'light') {
        color = 'whitesmoke'
    } else {
        color = 'darkgrey'
    }
}

const [matcap] = useMatcapTexture(matcapIndex, matcapSize);

let materialAll;

if (material === MeshMatcapMaterial) materialAll = new material({color: color, matcap: matcap});
else if (material === MeshDistanceMaterial || material === MeshPhysicalMaterial) materialAll = new material({color: color});
else materialAll = new material({color:color, wireframe: wireframe}) 


// animation logic
useFrame((state, delta) => {
  const rotationSpeed: number = fancyAnimation ? Math.abs(Math.sin(state.clock.elapsedTime) / Math.PI) - (0.0004 * state.clock.elapsedTime) : 1;

  if (loader.current) {
    if (rotationAxis === "x" || rotationAxis === "y" || rotationAxis === "z") {
      
      if (rotationDirection === 'negative' && fancyAnimation) {
        loader.current.rotation[rotationAxis] += delta * rotationSpeed * -speed;
      } else if (rotationDirection === 'positive' && fancyAnimation) {
        loader.current.rotation[rotationAxis] += delta * rotationSpeed * speed;
      }

      if (rotationDirection === 'negative' && !fancyAnimation) {
        loader.current.rotation[rotationAxis] += (delta * rotationSpeed * -speed) / Math.PI;
      } else if (rotationDirection === 'positive' && !fancyAnimation) {
        loader.current.rotation[rotationAxis] += (delta * rotationSpeed * speed) / Math.PI;
      }
    }
  }
});



  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { nodes } = useGLTF("/loader.gltf") as any;
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

useGLTF.preload("/loader.gltf");
