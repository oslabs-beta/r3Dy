import React from 'react';
import ReactThreeTestRenderer from '@react-three/test-renderer';
import TextField from '../src/components/TextField';
import { expect, jest, test, describe } from '@jest/globals';

describe('TextField', () => {
  test('component does render', async () => {
    const renderer = await ReactThreeTestRenderer.create(<TextField />);
    console.log(renderer);
  });
});
