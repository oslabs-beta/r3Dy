import { Canvas } from '@react-three/fiber'
import Loader from './components/Loader'
import TextField from './components/TextField'
import { OrbitControls } from '@react-three/drei'
import { MeshLambertMaterial, MeshMatcapMaterial, MeshPhysicalMaterial, MeshToonMaterial } from 'three'

export default function App() {
  
  return (
  <Canvas>
<TextField/>
  </Canvas>
  )
}
