type LoaderProps = {
    color?: string;
    scale?: number;
    rotationAxis?: 'y' | 'x' | 'z';
    rotationDirection?: 'positive' | 'negative';
    easeAnimation?: boolean;
    speed?: number;
    theme?: 'dark' | 'light';
    material?: any;
    wireframe?: boolean;
    matcapIndex?: number;
    matcapSize?: 64 | 128 | 256 | 512 | 1024;
    position?: [number, number, number];
};
export default function ChipLoader(props: LoaderProps): import("react/jsx-runtime").JSX.Element;
export {};
