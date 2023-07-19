/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useRef, useState } from 'react';
import { useGLTF, OrthographicCamera } from "@react-three/drei"
import { useSpring, animated, SpringConfig, interpolate } from '@react-spring/three'
import { MeshStandardMaterial, Mesh, Material, BufferGeometry, Vector3, MeshPhysicalMaterial } from 'three';
import React from 'react';
 
 
 
type SwitchProps = {
    mainColor?: string;
    size?: number;
    callback?: any;
    slideColor?: string;
    tension?: number;
}
 
type SlideAnimationProps = {
    position: number[];
}
 


export default function SlideSwitch(props: SwitchProps) {
  const [active, setActive] = useState(false);
  const { nodes } = useGLTF("https://raw.githubusercontent.com/alecjessen/r3dy-static/main/switch.gltf") as any;
  nodes.Text_2.material.color.r=1
  nodes.Text_2.material.color.g=0
  nodes.Text_2.material.color.b=0
  nodes.Text_2.material.roughness=.2
  nodes.Text_2.material.metalness=0.3
  nodes.Text_2.material.emissive.r=0.1
  nodes.Text.material.emissive.g=.0
  nodes.Text.material.color.g=1
  nodes.Text.material.color.b=0

  const slider = useRef<Mesh<BufferGeometry, Material | Material[]>>(null!);

  function clicked(): void {
    setActive(!active)
    
     return props.callback ? props.callback() : null
}

const slideAnimation = useSpring<SlideAnimationProps>({
    position: active ? [-4, 6.186, 4.592] : [-54.685, 6.186, 4.592],
    config: {
      tension: props.tension ? props.tension * 1600 : 1600,
      friction: 70,
    } as SpringConfig,
  });

  const rectangleMaterial = new MeshStandardMaterial({color: props.mainColor ? props.mainColor : '#1B263B', roughness: 0.4, metalness: .2});
  const slideMaterial = new MeshPhysicalMaterial({color: props.slideColor ? props.slideColor : '#DDDFE1', roughness: .4, metalness: .5, clearcoat: 1})
  const slideAnimationPosition = interpolate(
    slideAnimation.position,
    (x: number, y: number, z: number) => new Vector3(x, y, z)
  );


  return (
    <group {...props} dispose={null}>
      <group scale={props.size ? .055*props.size : .055} rotation-y={.01} position-x={2}>
        <pointLight
          intensity={1}
          decay={3}
          distance={110}
          position={[-290, 170, 170]}
        />
        <pointLight
          intensity={1}
          decay={3}
          distance={110}
          position={[230, 170, 170]}
        />
         <pointLight
          intensity={1}
          decay={4}
          distance={210}
          position={[0, -170, 220]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Text_2.geometry}
          material={nodes.Text_2.material}
          position={[4.551, 7.283, 7.538]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Text.geometry}
          material={nodes.Text.material}
          
          position={[-60.549, 7.283, 7.203]}
        />
        <animated.mesh
          castShadow
          receiveShadow
          geometry={nodes.Rectangle.geometry}
          material={slideMaterial}
          position={slideAnimationPosition}
          scale={[0.921, 1.152, 0.908]}
          ref={slider}
          onClick={clicked}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Boolean.geometry}
          material={rectangleMaterial}
          position={[-29.329, 6.069, 7]}
          scale={[0.828, 1, 1]}
        />
        <OrthographicCamera
          makeDefault={false}
          far={100000}
          near={0}
          position={[-61.515, 77.981, 995.055]}
          rotation={[-0.078, -0.062, -0.005]}
        />
      </group>
    </group>
  );
}

useGLTF.preload("https://raw.githubusercontent.com/alecjessen/r3dy-static/main/switch.gltf");


// position={[-55.685, 6.186, 4.592]}