import { Canvas } from '@react-three/fiber'

//IMPORT COMPONENTS
import React, { useState, useEffect } from 'react'
import Button from './components/Button';
import TextField from './components/TextField';
import Loader from './components/Loader';
import { Mesh, MeshBasicMaterial, MeshStandardMaterial, MeshToonMaterial } from 'three';
import Slider from './components/Slider';
import Switch from './components/Switch';
import Switch2 from './components/Switch2';
import { Perf } from 'r3f-perf'
import { OrbitControls } from "@react-three/drei"

type camConfig = {
 fov: 75 | number,
 near: 0.1 | number,
 far: 1000 | number,
 position: [0, 0, 5] | [number, number, number]
}

export default function App() {

  return (
    <Canvas>
      <Loader />
    </Canvas>
  )
}
