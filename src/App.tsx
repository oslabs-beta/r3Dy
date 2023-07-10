import { Canvas } from '@react-three/fiber'

//IMPORT COMPONENTS
import Button from './components/Button';
import TextField from './components/TextField';
import Loader from './components/Loader';
import { Mesh, MeshBasicMaterial, MeshStandardMaterial, MeshToonMaterial } from 'three';
import Slider from './components/Slider';
import Switch from './components/Switch';
import { useState } from 'react';


export default function App() {

  return (
    <Canvas>
    <Loader />
    </Canvas>
  )
}
