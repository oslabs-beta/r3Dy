/* eslint-disable @typescript-eslint/no-unused-vars */

import react from 'react';
// import ReactDOM from 'react-dom/client'
import { Canvas } from '@react-three/fiber'
import Loader from './components/Loader'
import * as THREE from '@react-three/fiber';
// import Example from './components/Example';
// import ButtonExample from './components/ButtonExample';




export default function App() {
  
  return (
    <Canvas>
      <Loader />
    </Canvas>
  )
}
