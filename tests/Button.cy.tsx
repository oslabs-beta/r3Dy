import React from 'react'
import Button from '../src/components/Button'
import { Canvas } from 'react-three-fiber'

describe('<Button />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<Canvas shadows><Button /></Canvas>)
  })
})