/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useRef, useState } from 'react';
import { useGLTF, OrthographicCamera } from "@react-three/drei"
import { useSpring, animated, SpringConfig, interpolate } from '@react-spring/three'
import { MeshStandardMaterial, Mesh, Material, BufferGeometry, Vector3, MeshPhysicalMaterial } from 'three';
import React from 'react';
 
 
 //all of the props that can be passed in to the switch
type SwitchProps = {
    mainColor?: string;
    size?: number;
    callback?: any;
    slideColor?: string;
    tension?: number;
    onColor?: string;
    offColor?: string;
    positionX?: number;
    positionY?: number;
    positionZ?: number;
}
 //typing for the animation position.
type SlideAnimationProps = {
    position: number[];
}
 


export default function SlideSwitch(props: SwitchProps) {
  //state used to turn the switch on and off. Also used to run the callback if its provided
  const [active, setActive] = useState(false);
  //this is the import for the 3D model. 
  const { nodes } = useGLTF("https://raw.githubusercontent.com/alecjessen/r3dy-static/main/switch.gltf") as any;
  //These were mostly used for testing. The current materials being used are below. Feel free to ignore
  nodes.Text_2.material.color.r=1
  nodes.Text_2.material.color.g=0
  nodes.Text_2.material.color.b=0
  nodes.Text_2.material.roughness=.2
  nodes.Text_2.material.metalness=0.3
  nodes.Text_2.material.emissive.r=0.1
  nodes.Text.material.emissive.g=.0
  nodes.Text.material.color.g=1
  nodes.Text.material.color.b=0

  //use ref to select the particular components I want to move
  const slider = useRef<Mesh<BufferGeometry, Material | Material[]>>(null!);

  //This is the function that handles the callback as well as changing state. 
  function clicked(): void {
    setActive(!active)
    
     return props.callback ? props.callback() : null
}
//This is the animation function that slides the switch
//The config is where 'bounce' is handled. If you play with the tension and friction variables you can make the switch slide faster, softer as well as how much bounce it has when it slides. 
const slideAnimation = useSpring<SlideAnimationProps>({
    position: active ? [-4, 6.186, 4.592] : [-54.685, 6.186, 4.592],
    config: {
      tension: props.tension ? props.tension * 1600 : 1600,
      friction: 70,
    } as SpringConfig,
  });
  //These are the materials used to color the individual pieces of the switch. the names are self explanatory 
  const rectangleMaterial = new MeshStandardMaterial({color: props.mainColor ? props.mainColor : '#1B263B', roughness: 0.4, metalness: .2});
  const slideMaterial = new MeshPhysicalMaterial({color: props.slideColor ? props.slideColor : '#4CC9F0', roughness: .4, metalness: .5, clearcoat: 1})
  const onMaterial = new MeshPhysicalMaterial({color:props.onColor ? props.onColor : '#4CC9F0', roughness: .4, metalness: .5, clearcoat: 1})
  const offMaterial = new MeshPhysicalMaterial({color:props.offColor ? props.offColor : '#778DA9', roughness: .4, metalness: .5, clearcoat: 1})

  //typing for the position props
  const slideAnimationPosition = interpolate(
    slideAnimation.position,
    (x: number, y: number, z: number) => new Vector3(x, y, z)
  );

//everything in the return is the actual prop and lighting used in the scene. The first 3 are just lights to illuminate the switch. Play with the position to have light from new angles or intensities. 

//The meshes are the actual pieces of the component. You will see the text2 and text geometries. These are the on and off parts. The animated mesh is the slide. and the last mesh is the body. 

//The camera is where your eyes are in the scene. play with the position to view the switch from different angles.
  return (
    <group {...props} dispose={null}>
      <group scale={props.size ? .055*props.size : .055} rotation-y={.01} position-x={props.positionX ? props.positionX + 2 : 2} position-y={props.positionY ? props.positionY  : 0} position-z={props.positionZ ? props.positionZ : 0}>
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
          material={offMaterial}
          position={[4.551, 7.283, 7.538]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Text.geometry}
          material={onMaterial}
          
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


// position={[-55.685, 6.186, 4.592]}// position={[-55.685, 6.186, 4.592]}
