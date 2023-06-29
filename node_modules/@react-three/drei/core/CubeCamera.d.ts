import { Texture } from 'three';
import * as React from 'react';
import { CubeCameraOptions } from './useCubeCamera';
declare type Props = JSX.IntrinsicElements['group'] & {
    children: (tex: Texture) => React.ReactNode;
    frames?: number;
} & CubeCameraOptions;
export declare function CubeCamera({ children, frames, resolution, near, far, envMap, fog, ...props }: Props): JSX.Element;
export {};
