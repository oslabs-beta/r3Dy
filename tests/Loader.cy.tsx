import React from 'react'
import Loader from '../src/components/Loader'
import { Canvas } from 'react-three-fiber'

describe('<Loader />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<Canvas shadows><Loader /></Canvas>)
  })
})