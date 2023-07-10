import React from 'react'
import TextField from '../src/components/TextField'
import { Canvas } from '@react-three/fiber'

describe('<TextField />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<Canvas shadows><TextField /></Canvas>)
  })

  // it('renders w/ default color', () => {
  //   cy.mount(<Canvas shadows><TextField /></Canvas>)
  //   cy.get('[data-cy=material]').should('have.color', '#F4FAFF')
  // })
})