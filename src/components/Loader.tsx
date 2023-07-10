import React from 'react'
import ChipLoader from './ChipLoader'
import HexagonLoader from './HexagonLoader'
import MeshLoader from './MeshLoader'

type LoaderProps = {
    color?: string;
    scale?: number;
    rotationAxis?: 'x' | 'y' | 'z';
    rotationDirection? : 'positive' | 'negative';
    fancyAnimation?: boolean;
    speed?: number;
    theme?: string;
    material?: MeshBasicMaterial | MeshDepthMaterial | MeshDistanceMaterial | MeshLambertMaterial | MeshMatcapMaterial | MeshNormalMaterial | MeshPhongMaterial | MeshPhysicalMaterial | MeshStandardMaterial | MeshToonMaterial;
    loader?: number;
    wireframe?: boolean;
    matcapIndex?: number;
    matcapSize?: 64 | 128 | 256 | 512 | 1024;
  }


export default function Loader(props: LoaderProps) {
    const loader: number = props.loader || 1
    if (loader === 1) {
        return <ChipLoader {...props} />
    } else if (loader === 2) {
        return <HexagonLoader {...props} />
    } else if (loader === 3) {
        return <MeshLoader {...props} />
    } else {
        return <ChipLoader {...props} />
    }
}
