import { MakeCell } from './_MakeCell'
import { render, screen } from '@testing-library/react'

describe('renders a table cell', () => {

    it('renders an empty element if undefined value passed to it', () => {
        render(<MakeCell val={undefined} />)
        const cell = screen.getByTestId('empty')
        expect(cell).toBeInTheDocument()
    })

    it('renders plainly the number passed to it', () => {
        render(<MakeCell val={1} />)
        const cell = screen.getByText(/1/i)
        expect(cell).toBeInTheDocument()
        expect(cell.getAttribute('style')?.indexOf('background-color')).toBe(undefined)
    })
    it('renders the number passed to it and rounds it if requested', () => {
        render(<MakeCell val={1.999} roundTo={2} />)
        expect(screen.getByText(/2/i)).toBeInTheDocument()
        render(<MakeCell val={1.991} roundTo={2} />)
        expect(screen.getByText(/1.99/i)).toBeInTheDocument()
    })
    it('adds background colour hinting if val and compVal are different', () => {
        render(<MakeCell val={2} compVal={3} />)
        const cell = screen.getByText(/2/i)
        expect(cell.getAttribute('style')?.indexOf('background-color')).not.toBe(undefined)
    })
    it('does not add background colour if values are the same', () => {
        render(<MakeCell val={3} compVal={3} />)
        expect(screen.getByText(/3/i)?.getAttribute('style')?.indexOf('background-color')).toBe(undefined)
    })

})
