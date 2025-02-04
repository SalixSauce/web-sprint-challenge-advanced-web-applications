import React from 'react'
import { render, screen } from '@testing-library/react'
import Spinner from './Spinner' // Adjust the import path as necessary
import '@testing-library/jest-dom'

describe('Spinner Component', () => {
  test('does not render when on is false', () => {
    render(<Spinner on={false} />)
    const spinnerElement = screen.queryByText('Please wait...')
    expect(spinnerElement).not.toBeInTheDocument()
  })

  test('renders correctly when on is true', () => {
    render(<Spinner on={true} />)
    const spinnerElement = screen.getByText('Please wait...')
    expect(spinnerElement).toBeInTheDocument()
    expect(spinnerElement).toHaveTextContent('Please wait...')
  })
})