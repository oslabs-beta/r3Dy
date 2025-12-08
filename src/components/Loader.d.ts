type LoaderProps = {
    color?: string;
    scale?: number;
    rotationAxis?: 'x' | 'y' | 'z';
    rotationDirection?: 'positive' | 'negative';
    easeAnimation?: boolean;
    speed?: number;
    theme?: 'dark' | 'light';
    material?: any;
    model?: number;
    wireframe?: boolean;
    matcapIndex?: number;
    matcapSize?: 64 | 128 | 256 | 512 | 1024;
    position?: [number, number, number];
};
export default function Loader(props: LoaderProps): import("react/jsx-runtime").JSX.Element;
export {};
