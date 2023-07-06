import React from 'react'
import Switch from '../src/components/Switch'
import { Canvas } from 'react-three-fiber'

describe('<Switch />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<Canvas shadows><Switch /></Canvas>)
  })
})