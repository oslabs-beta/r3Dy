import { Loader, Scene } from 'three';
export default class SplineLoader extends Loader {
    load(url: string, onLoad: (scene: Scene) => void, onProgress?: (event: ProgressEvent) => void, onError?: (event: ErrorEvent) => void): void;
    parse(buffer: ArrayBuffer): Promise<Scene>;
}
