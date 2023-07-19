## R3DY UI 

R3DY UI is a component library that allows developers to import 3D components into their existing products. Typically, implementing 3D components requires extensive knowledge of a 3D library, however, with R3DY UI the process is streamlined and simple to understand. With this library, you will be able to import sliders, text fields, switches, buttons as well as loaders seamlessly and without any previous 3D experience. 


https://github.com/oslabs-beta/r3Dy-Web/assets/128100544/39f32103-2ab1-4c56-841a-323f2211b14b


## Getting Started

```npm install r3dy```

Once you've installed the npm package, its time to add a component to your project. In the code snipped below, you can see how this is implemented.


![Screen Shot 2023-07-18 at 5 25 37 PM](https://github.com/oslabs-beta/r3Dy-Web/assets/128100544/b75fbe71-98e2-46e4-aab4-78a30b773027)

However, there are a few things you will want to note. First - You want to make sure that you have imported the necessary dependencies. Import the desired component from r3dy as well as Canvas from @react-three/fiber. Afterward, you need to include the 'use client' at the top of the page. Now that you've included dependencies, wrap your component in a Canvas tag. Make sure to include shadows in the canvas tag or they will not show up.

  Note: As you can see, I have nested the Canvas in 2 divs. The first div is meant to contain the Canvas. By nature, Canvas will try to fill as much space as allowed. If it is not nested in a div and you have any sort of margin or padding, it will constantly expand to fit those margins. The second div is used to adjust the placement of the first. As mentioned, Canvas took up the entire space of the first div. Now that it's contained, you will need another to move it about the page.

#How to Contribute

If you like what we are doing with R3DY UI and want to contribute, feel free to fork R3DY UI and submit a pull request!
If you have any feedback/issues please submit one! Any and all feedback/issues are important to us!
