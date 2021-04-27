import React from 'react'
import { render, screen } from '@testing-library/react'
import { App } from './App'

xtest('renders title...', () => {
  render(<App />)
  const linkElement = screen.getByText(/tank compare/i)
  expect(linkElement).toBeInTheDocument()
})
