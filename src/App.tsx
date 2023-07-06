import { Canvas } from '@react-three/fiber'

//IMPORT COMPONENTS
import Button from './components/Button';
import TextField from './components/TextField';
import Loader from './components/Loader';
import { Mesh, MeshBasicMaterial, MeshStandardMaterial } from 'three';
import Slider from './components/Slider';
import Switch from './components/Switch';



export default function App() {

  return (
    <Canvas shadows>
  <Switch />
    </Canvas>
  )
}
