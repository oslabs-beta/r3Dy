import { Text, RoundedBox } from "@react-three/drei"
// import { DragControls } from 'three/examples/jsm/controls/DragControls.js'
import { useThree, useFrame } from "@react-three/fiber"
import { useGesture } from "@use-gesture/react"
import { useSpring, animated } from '@react-spring/three'
import { useState, useRef } from "react";
import React from "react";

//typing for passable props. onChange is expected to be a state function.

type SliderProps = {
    maxValue?: number;
    value?: number;
    steps?: number;
    onChange?: React.Dispatch<React.SetStateAction<number>>;
}

export default function Slider({maxValue, value, steps, onChange}:SliderProps) {
    const max = maxValue ? maxValue: 10 //max value of slider. Defaults to 10 if nothing passed in. Note that the slider min is always 0. 
    const spacing = steps ? steps: 2 //increments: How much is every tick on the slider worth. Defaults to 2.
    const spaces = max/spacing // how many ticks there are on the slider not including 0
    //How many x values the ticks are space out. This calculation is done because js doesnt always divide perfectly when dealing with decimals.
    //Notice how 1 is added to spaces. This is to account for the 0 position on the slider
    const xIncrements = Math.round(12/(spaces+1)*10) //This is a way to show at what increments of an x value the ball should move on the slider
    const [slider, setSlider] = useState(0) // useState function that will be the default if no onChange function is passed in

    const [outline, setOutline] = useState(false) //useState function to handle when the outer wireframe sphere appears. Currently appears on hover.

    //assigning the functionality of the slider depending on if onChange was passed in or not    
    let change:any; 
    if(onChange){
        change = onChange
    } else{
        change = setSlider
    }

    //Creates an array of possible values based on maxValue, and steps. The array will contain the list of possible values of the slider.
    //So if maxValue is 10 and steps is 2, the valueArray = [0, 2, 4, 6, 8, 10]
    const valueArray:number[] = []
        for (let i = 0; i<spaces+1; i++){
            valueArray.push(max-i*spacing)
        }
    valueArray.sort((a,b)=>{return a-b})

    //Below handles the main functionality of the slider

    const { size, viewport } = useThree()
    const aspect = size.width / viewport.width //handles getting the aspect ratio of the user. Without this the slider would not work with all screens or all window sizes

    //spring handles the scale and position of the sphere on the slider. Rotation and friction can also be set too but is not implemented
    //spring is spread later to apply these props to the animated meshes. Set is used to set these props
    const [spring, set] = useSpring(() => ({ scale: [1, 1, 1], position: [0, 0, 0], rotation: [0, 0, 0],
      //  config:{friction: 1}
      }))
      //useGesture handles the onDrag and onHover
    const bind:any = useGesture({
      onDrag: ({ offset: [x, y] }) =>{
        const newX = Math.round(x/aspect*10) // newX is the rounded version of x/aspect. This is done for the same reason as before
        if(spaces%2!==0){ //Two different possible calculations depending on if spaces is even/odd (this does not include 0)
            //if spaces is odd, then there are an even number of ticks if we include 0
            if(newX % xIncrements === 0 && newX !== 0 ){  // This conditional sets where the ball can move depending on if it is cleanly divisible by the xIncrement. Also does not allow the ball to move to the center (0)
                if(newX/xIncrements<0 && (newX/xIncrements + (spaces+1)/2)>=0){ // This condition decides where the ball can be moved based on whether if it was past or before the halfway point. Both of these conditions needed different calculations to convert the x position of the ball into a usable array index. Position is then set and the onchange function is utilized.
                    change(valueArray[newX/xIncrements + (spaces+1)/2]) //Applies function
                    set({ position: [x/ aspect, y*0, 0]}) //sets the new position of the ball
                }else if (newX/xIncrements>0 && (newX/xIncrements + (spaces+1)/2 - 1) < valueArray.length){
                    change(valueArray[newX/xIncrements + (spaces+1)/2 - 1]) //applies the function
                    set({ position: [x/ aspect, y*0, 0]}) //sets the new position of the ball

                }
            }
        } else{ //if spaces is even, then there are an odd number of ticks if we include 0
            //These calculations are used to convert the x value to a usable index for the valueArray
            if(newX % xIncrements === 0 && (newX/xIncrements + spaces/2)>=0 && (newX/xIncrements + spaces/2) < valueArray.length){ //Prevents the sphere from freely moving
                change(valueArray[newX/xIncrements + spaces/2]) //applies the function
                set({ position: [x/ aspect, y*0, 0]})//sets the new position of the ball
            }
        }
    },
      onHover: ({ hovering }) => { //handles when the outline/wireframe sphere shows up and also handles the ball growing on hover
        hovering? setOutline(true) : setOutline(false)
        set({scale: hovering ?  [1.2,1.2,1.2]:[1.0,1.0,1.0]})
    }
    })

    const wireframeRef = useRef<any>(); //ref for the wireframe sphere
    useFrame(()=>{  //lets us do something on every rendered frame
        if(outline){ //if wireframe sphere is onscreen, it rotates
            wireframeRef.current.rotation.y += .01
        }
    })

    //renders each animated component
    return(
    <>
    {/* <OrbitControls makeDefault={ true }/> */} {/* if you wanto to see around the object through drag controls, uncomment this*/}
        <group  >
            {/* <primitive object={new THREE.AxesHelper(10)} /> */} {/*Will render and axes helper that shows the x, y, and z axis*/}
            
            {outline && <animated.mesh {...spring as any} {...bind()} ref={wireframeRef} scale={1.3}  castShadow> {/*renders the wireframe sphere if outline is true*/}
                <sphereGeometry args ={[1,32,16]} />
                <meshBasicMaterial wireframe={ true } color={ 'white' } />
            </animated.mesh>}
            <animated.mesh {...spring as any} {...bind()} castShadow>{/*renders main sphere*/}
                <sphereGeometry args ={[1,32,16]} />
                <meshBasicMaterial wireframe={ false } color={ '#3F37C9' } />
            </animated.mesh>
            <RoundedBox args={[3.9, .2, 0]} position={[0,0,-2]} radius={0.1} scale={4}> {/*renders the bar part of the slider*/}
                <meshBasicMaterial color={"#3F37C9"} />
            </RoundedBox> 
            <animated.mesh  {...spring as any} {...bind()}> {/*renders the text on the slider*/}
                <Text fontSize={.5}  castShadow position-y={1.5}  color={'#3F37C9'} font={'fonts/Inter-Bold.ttf'}  overflowWrap='break-word'>{value? value:slider}</Text> {/*if a value is passed in then it shows up here. If not it is the current state of slider*/}
                <meshBasicMaterial wireframe={ false } color={ '#3F37C9' } />
            </animated.mesh>
        </group>
    </>
    )
}

//example of code to setup a slider

{/*  const [slider, setSlider] = useState(0);
  return (
    <Canvas 
    camera = { {
      near:.1,
      far:200,
      position: [0, 1, 8]
    } }
    >
      <Slider 
      onChange={setSlider}
      // maxValue={10}
      // steps={2}
      value={slider} />
    </Canvas>
  ) */}