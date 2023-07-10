import { Canvas } from '@react-three/fiber'

//IMPORT COMPONENTS
import React, { useState, useEffect } from 'react'
import Button from './components/Button';
import TextField from './components/TextField';
import Loader from './components/Loader';
import { Mesh, MeshBasicMaterial, MeshStandardMaterial } from 'three';
import Slider from './components/Slider';
import Switch from './components/Switch';



export default function App() {

  const [slider, setSlider] = useState(0);
  return (
    <Canvas 
    camera = { {
      near:.1,
      far:200,
      position: [0, 1, 8]
    } }
    >
      <Slider 
      onChange={setSlider}
      // maxValue={10}
      // steps={2}
      value={slider} />
    </Canvas>
  )
}
