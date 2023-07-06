import { Canvas } from '@react-three/fiber'
import React, {useState} from 'react';
import Loader from './components/Loader'
import TextField from './components/TextField'
import { OrbitControls } from '@react-three/drei'
import Slider from'./components/Slider'
import { MeshBasicMaterial, MeshLambertMaterial, MeshMatcapMaterial, MeshPhysicalMaterial, MeshToonMaterial } from 'three'
import Switch from './components/Switch'
import Button from './components/Button'

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
