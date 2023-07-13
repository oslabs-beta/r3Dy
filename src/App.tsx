import { Canvas } from '@react-three/fiber'

//IMPORT COMPONENTS
import React, { useState, useEffect } from 'react'
import Button from './components/Button';
import TextField from './components/TextField';
import Loader from './components/Loader';
import { Mesh, MeshBasicMaterial, MeshStandardMaterial, MeshToonMaterial } from 'three';
import Slider from './components/Slider';
import Switch2 from './components/Switch2';
import Switch from './components/Switch';
import { Perf } from 'r3f-perf'
import { OrbitControls } from "@react-three/drei"

export default function App() {

  const [slider, setSlider] = useState(0);

  return (
    <div className='examples'>
      <div style={{height: "300px"}}>
        <Canvas shadows>
          <TextField />
        </Canvas>
      </div>
      <div style={{height: "300px"}}>
        <Canvas shadows>
          <Button/>
        </Canvas>
      </div>
      <div style={{height: "300px"}}>
        <Canvas shadows>
          <Switch />
        </Canvas>
      </div>
      <div style={{height: "300px"}}>
        <Canvas shadows>
          <Switch2/>
        </Canvas>
      </div>
      <div style={{height: "300px"}}>
        <Canvas shadows>
          <Slider /> // need on change
        </Canvas>
      </div>
      <div style={{height: "300px"}}>
        <Canvas shadows>
          <Loader model={1} scale={1.1}  />
        </Canvas>
      </div>
      <div style={{height: "300px"}}>
        <Canvas shadows>
          <Loader model={2} scale={1.1} />
        </Canvas>
      </div>
      <div style={{height: "300px"}}>
        <Canvas shadows>
          <Loader model={3} scale={1.25}  />
        </Canvas>
      </div>
  </div>
  )
}
