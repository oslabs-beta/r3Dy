import React from 'react';
import ReactThreeTestRenderer from '@react-three/test-renderer';

import Switch from '../src/components/Switch';
import { expect, jest, test, describe } from '@jest/globals';
import { act } from '@testing-library/react';


describe('Switch', () => {
  test('component does render', async () => {
    const renderer = await ReactThreeTestRenderer.create(<Switch />);
  });
});

describe('Switch', () => {
    test('onClick function is defined', async () => {
      const renderer = await ReactThreeTestRenderer.create(<Switch />);
      const onClickFunction = renderer.scene._fiber.children[4].children[0].__r3f.handlers.onClick;
      expect(onClickFunction).toBeDefined();
    });
  });

  describe('Switch', () => {
    test('onClick function runs the callback if provided', async () => {

      const callbackMock = jest.fn();

      const renderer = await ReactThreeTestRenderer.create(<Switch callback={callbackMock} />);
    
      const onClickHandler = renderer.scene._fiber.children[4].children[0].__r3f.handlers.onClick;
    
      act(() => {
        onClickHandler();
      });
    
      expect(callbackMock).toHaveBeenCalled();
    });
  });

  describe('Switch', () => {
    test('Changing the color changes the color', async () => {

      const renderer = await ReactThreeTestRenderer.create(<Switch color="red" />);
  

      const material = renderer.scene._fiber.children[4].children[0].material;
      const { r, g, b } = material.color;
  
  
      expect(r).toBe(1);
      expect(g).toBe(0);
      expect(b).toBe(0);
  

    });
  });

  describe('Switch', () => {
    test('Changing the scale changes the scale', async () => {

      const renderer = await ReactThreeTestRenderer.create(<Switch size={2} />);
  

      const scale = renderer.scene._fiber.children[4].scale;
      const { x, y, z } = scale;
  
  
      expect(x).toBe(2);
      expect(y).toBe(2);
      expect(z).toBe(2);
  

    });
  });