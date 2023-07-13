import React from "react";
import { useFrame } from "@react-three/fiber";
import { useGLTF, PerspectiveCamera, useMatcapTexture } from "@react-three/drei";
import {MeshBasicMaterial, MeshDepthMaterial, MeshDistanceMaterial, MeshLambertMaterial, MeshMatcapMaterial, MeshNormalMaterial, MeshPhongMaterial, MeshPhysicalMaterial, MeshStandardMaterial, MeshToonMaterial, MeshBasicMaterialParameters, Material, Group } from "three";


export default function Model(props) {




    const logo = React.useRef<Group>(null);

    useFrame((state, delta) => {
      
        if (logo.current) {
          logo.current.rotation.x += delta;
          logo.current.rotation.z += delta;
          logo.current.rotation.y += delta;
        }
      });
      
      

//21 28 // 37? //46 crazy //  54 //62 //71
    const test = 47

    const [matcap] = useMatcapTexture(test, 1024);


const materialOuter = new MeshMatcapMaterial({matcap:matcap, color:'#560BAD'});
const materialInner = new MeshMatcapMaterial({matcap:matcap, color: '#3F37C9'})



  const { nodes } = useGLTF("/r3dylogo.gltf");
  return (
    <group {...props} dispose={null}>
      <group scale={0.007} rotation={[Math.PI/2, 0.002, 0.014]} ref={logo}>
            {/* <ambientLight /> */}
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.body.geometry}
            material={materialOuter}
            scale={[5.2, 1.11, 5.2]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.insidepart.geometry}
            material={materialInner}
            scale={[5, 1.1, 5]}
          />
        </group>
      </group>
  );
}

useGLTF.preload("/r3dylogo.gltf");