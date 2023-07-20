import React from 'react';
import ReactThreeTestRenderer from '@react-three/test-renderer';
import Slider from '../src/components/Slider';
import { expect, jest, test, describe } from '@jest/globals';
import { act } from '@testing-library/react';
import{useState} from 'react'
 
 
 
 
describe('Slider', () => {

  test('component does render', async () => {

    const renderer = await ReactThreeTestRenderer.create(< Slider />);
    console.log(renderer.scene._fiber)
    await act(async () => {
      console.log(renderer.scene._fiber);
    });
  });
});
 
// describe('Switch', () => {
//     test('onClick function is defined', async () => {
//       const renderer = await ReactThreeTestRenderer.create(<Slider />);
//       const onClickFunction = renderer.scene._fiber.children[4].children[0].__r3f.handlers.onClick;
//       expect(onClickFunction).toBeDefined();
//     });
//   });
 
//   describe('Switch', () => {
//     test('onClick function runs the callback if provided', async () => {
//       // Create a mock callback function
//       const callbackMock = jest.fn();
 
//       // Render the Switch component and pass the callback function as the callback prop
//       const renderer = await ReactThreeTestRenderer.create(<Switch callback={callbackMock} />);
 
//       // Access the onClick handler from the internal handlers object
//       const onClickHandler = renderer.scene._fiber.children[4].children[0].__r3f.handlers.onClick;
 
//       // Invoke the onClick handler
//       act(() => {
//         onClickHandler();
//       });
 
//       // Assert that the callback has been called
//       expect(callbackMock).toHaveBeenCalled();
//     });
//   });