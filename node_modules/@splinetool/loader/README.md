# Spline Loader

> Three.js loader for `.splinecode` files.

It returns a three.js compatible representation of the file scene.

You should use this package if you want to access your Spline objects and materials from code and manipulate them yourself in a Three.js environment.

If you want to display your Spline scene with interactions and states matching Spline play mode, we recommend you use [spline-runtime](https://www.npmjs.com/package/@splinetool/runtime) instead.

> :warning: Only **.splinecode** files should be loaded through this API. `.spline` files are meant to be used in the editor.

## Installation

```
npm install @splinetool/loader
```

## Usage

```js
import SplineLoader from '@splinetool/loader';

// Instantiate a loader
const loader = new SplineLoader();

// Load a .splinecode file
loader.load(
	// path to the .splinecode file, either from the Spline servers or local
	'https://prod.spline.design/2qM3cW5Cx15m3cJ7/scene.splinecode',
	// called when the resource is loaded
	(splineScene) => {
		scene.add(splineScene);
	},
	null,
	// called when loading has errors
	(error) => {
		console.log('An error happened');
	}
);
```

## Limitations

This loader allows most Spline objects and materials to be rendered directly into three.js without a Spline runtime. Still it's possible you'll notice some differences between the loaded scene and what it looked like in the Spline editor because we fallback missing Spline capabilities to "the next best thing" in order for it to work.
Think of this Loader as a way to get scenegraph, geometries and materials.

- The **Glass layer** is only partially supported when used outside of the Spline Runtime. In THREE.js, transmission does not handle transparent objects. We advise against combining Glass layers and alpha objects in the same scene.
- All Events and Interactions won't be included in the loaded objects, if you use this package it implies you will use code to handle interactions and animations on your own.
- Spline Postprocessing also won't be included.
