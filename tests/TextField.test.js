import React from 'react';
import ReactThreeTestRenderer from '@react-three/test-renderer';
import TextField from '../src/components/TextField';
import {expect, test, describe } from '@jest/globals';

describe('TextField', () => {

  describe('component does render', () => {
    test('it should have 3D elements defined', async () => {

      const renderer = await ReactThreeTestRenderer.create(<TextField />);
        
      await new Promise(resolve => setTimeout(resolve, 1000)); 
      const component = renderer.toGraph();
      expect(component).toHaveLength(3);
    });
  });

  // describe('component color does render', () => {
  //   test('it should have color defined', async () => {
  //     // await act(async () => {
  //       const renderer = await ReactThreeTestRenderer.create(<TextField color='red' />);
  //       await new Promise(resolve => setTimeout(resolve, 1000)); 
  //       console.log(renderer.toGraph())
  //       // expect(component).toBe(true);
  //     // })
  //   });
  // });
  
  
});
