import React from 'react';
import ChipLoader from './ChipLoader'
import HexagonLoader from './HexagonLoader'
import MeshLoader from './MeshLoader'
type LoaderProps = {
    color?: string;
    scale?: number;
    rotationAxis?: 'x' | 'y' | 'z';
    rotationDirection? : 'positive' | 'negative';
    easeAnimation?: boolean;
    speed?: number;
    theme?: 'dark' | 'light';
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    material?: any;
    model?: number;
    wireframe?: boolean;
    matcapIndex?: number;
    matcapSize?: 64 | 128 | 256 | 512 | 1024;
    position?: [number, number, number];
  }


export default function Loader(props: LoaderProps) {
    const model: number = props.model || 1
    if (model === 1) {
        return <ChipLoader {...props} />
    } else if (model === 2) {
        return <HexagonLoader {...props} />
    } else if (model === 3) {
        return <MeshLoader {...props} />
    } else {
        return <ChipLoader {...props} />
    }
}