import React from 'react';
import ReactThreeTestRenderer from '@react-three/test-renderer';
import { jest, expect, test, describe } from'@jest/globals';
import { act } from '@testing-library/react';

// jest.mock('@react-three/drei', () => ({
//     RoundedBox: jest.fn(),
//     Text: jest.fn(),
//   }));

import Button from '../src/components/Button';

// rendering 
// check shape of data 

// children render
// test('button renders', async () => {
//     const renderer = await ReactThreeTestRenderer.create(<Button />);
//     await new Promise(resolve => setTimeout(resolve, 1000)); 
//     const children = renderer.scene._fiber.children;
//     expect(children.length).toBeGreaterThan(0);
// });

// props - defaults + changes 
test('default values', async () => {
    const renderer = await ReactThreeTestRenderer.create(<Button />);
    await new Promise(resolve => setTimeout(resolve, 1000)); 
    console.log(renderer.scene._fiber.children[0].children[1].scale)
})

// interactivity 
// simulate button click 

