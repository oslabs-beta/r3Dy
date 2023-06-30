import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { useGLTF, PerspectiveCamera } from "@react-three/drei";
import { MeshToonMaterial } from "three";

export default function Loader(props) {
  // color, material, speed, scale//100

const scale = props.scale/100 || 0.01
const color = props.color || 'cyan'
const material = props.material || MeshToonMaterial
const speed = props.speed || 1

const materialAll = new material({color: color});
const loader = useRef();

  useFrame((_state, delta) => {
    loader.current.rotation.y += delta * speed;
  });


  const { nodes } = useGLTF("/loader.gltf");
  return (
    <group ref={loader}>
      <group scale={scale}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Pentagon_7.geometry}
          position={[-0.019, 1.957, -61.235]}
          material={materialAll}
        />
        <meshBasicMaterial color = {'red'}/>
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
    </group>
  );
}

useGLTF.preload("/loader.gltf");
