/* eslint-disable @typescript-eslint/no-explicit-any */
import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { useGLTF, PerspectiveCamera } from "@react-three/drei";
import { MeshBasicMaterial, MeshToonMaterial, MeshMatcapMaterial} from "three";

export default function HexagonLoader( props:any ) {
  // color, material, speed, scale//100
const scale: number = props.scale/85 || 0.01
const loader = useRef();
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
    loader.current.rotation[rotationAxis] += delta * rotationSpeed * -speed 
   } else {
    loader.current.rotation[rotationAxis] += delta * rotationSpeed * speed 
   }
 })


  const { nodes } = useGLTF("/loader.gltf");
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