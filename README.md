<br/>
<div align="center">
  <a href="https://www.r3dyui.com/" target=”_blank”>
    <img src="https://i.imgur.com/mXk9ke7.jpeg" height="350" align="center" alt="header" />
  </a>
  <br/>
  <br/>


[![License](https://img.shields.io/badge/License-MIT-blue)](https://github.com/oslabs-beta/r3Dy/blob/dev/LICENSE.txt)

[![Documentation](https://img.shields.io/badge/Read%20our%20Documentation-black?logo=book)](https://www.r3dyui.com/docs/)

</div>


R3DY UI, an open-source React Library, offers an array of 3D components. With R3DY, you import your 3D components just like any other React component. These components are interactive and can be implemented with little to no knowledge of 3D rendering.

R3DY UI is fully compatible with any React project, including additional frameworks such as NextJS and Remix.

## Components
The library comes with 5 prebuilt components which can be modified through a series of properties.
- [Switch](https://www.r3dyui.com/docs/components/switch/)
- [Button](https://www.r3dyui.com/docs/components/button/)
- [Slider](https://www.r3dyui.com/docs/components/slider/)
- [Loader](https://www.r3dyui.com/docs/components/loader/)
- [Text Field](https://www.r3dyui.com/docs/components/textfield/)

If you'd like to see a new component, head over to [The R3DY UI issues page](https://github.com/oslabs-beta/r3Dy/issues) to add your suggestions!

## Installation

Use the package manager [npm](https://www.npmjs.com/) to install R3DY UI.

```bash
npm install r3dy
```
Once you've installed the npm package, its time to add a component to your project. In the code snipped below, you can see how this is implemented.

## Usage Example

```javascript
import { Canvas } from '@react-three/fiber'
import { TextField } from 'r3dy'

# returns 'a react component containing the r3dy element'
export default function myComponent() {
  return (
    <div>
      <Canvas shadows>
         <TextField/>
      </Canvas>
    </div>
  )
}
```

NOTE: You want to make sure that you have imported the necessary dependencies. Import the desired component from `r3dy` as well as `Canvas` from `@react-three/fiber`. Now that you've included dependencies, wrap your component in a `Canvas` tag. Make sure to include `shadows` in the `Canvas` tag or they will not show up.

The `div` is meant to contain the `Canvas`. By nature, `Canvas` will try to fill as much space as allowed. If it is not nested in a `div` and you have any sort of margin or padding, it will constantly expand to fit those margins.

## Contributing
R3DY UI is an open-source product maintained by OS Labs, an open-source tech accelerator.

We welcome contributions and feedback from the community to make R3DY UI even better. If you're interested in simplifying 3D in your React projects, check out our [documentation](https://www.r3dyui.com/docs/) and join us on this exciting journey!

Pull requests are welcome. For major changes, please [open an issue](https://github.com/oslabs-beta/r3Dy/issues) first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## Documentation
Our full documentation can be found [here](https://www.r3dyui.com/docs).

## Contributing
We value our contributors. [Read more about us.](https://www.r3dyui.com/about-us)

<img src="https://i.imgur.com/5cXAg9j.jpg" height="200" alt="contributors" />

## License

[MIT](https://github.com/oslabs-beta/r3Dy/blob/dev/LICENSE.txt)
