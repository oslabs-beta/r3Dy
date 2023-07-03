import React, { useRef } from "react";
import { useGLTF, OrthographicCamera, MeshDistortMaterial } from "@react-three/drei";
import { useFrame } from '@react-three/fiber'
import { MeshBasicMaterial, MeshDepthMaterial, MeshLambertMaterial, MeshStandardMaterial, MeshToonMaterial, MeshMatcapMaterial} from "three";



export default function MeshLoader(props: any) {
const model = useRef();
const scale: number = props.scale/50 || 0.025
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
    model.current.rotation[rotationAxis] += delta * rotationSpeed * -speed 
   } else {
    model.current.rotation[rotationAxis] += delta * rotationSpeed * speed
   }
 })

  const { nodes } = useGLTF("/meshLoader.gltf");
  return (
    <group {...props} dispose={null}>
      <group scale={scale} rotation={[Math.PI/2, 0, 0]} position={[0,0,0]} ref={model}>
        <ambientLight 
        intensity={0.5}
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

useGLTF.preload("/meshLoader.gltf");
