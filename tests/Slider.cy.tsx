import React from 'react'
import Slider from '../src/components/Slider'
import { Canvas } from 'react-three-fiber'
import {useState} from 'react'
import '@4tw/cypress-drag-drop'
// import {mount} from 'cypress/react18'
// const [slider, setSlider] = useState(0);

describe('<Slider />', () => {

  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(
      
      <Canvas 
      camera = { {
        near:.1,
        far:200,
        position: [0, 1, 8]
      } }
      >
        <Slider />
      </Canvas>
    )
  })
//   it('Correctly changes state when used', () => {
//     // see: https://on.cypress.io/mounting-react
//     const onChangeSpy = cy.spy().as('onChangeSpy')
//     cy.mount(
//       <Canvas 
//       camera = { {
//         near:.1,
//         far:200,
//         position: [0, 1, 8]
//       } }
//       >
//         <Slider 
//         onChange={onChangeSpy}
//         value={0} />
//       </Canvas>
//     )
//     cy.get("[data-cy=drag]").move({deltaX: -120})

//   })

})