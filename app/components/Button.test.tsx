import React from 'react';
import { render, screen } from '@testing-library/react';
import Button from './Button';
import { describe, it, expect } from 'vitest';

describe('Button component', () => {
  it('renders with the correct label', () => {
    render(<Button role="button" label="Click me" href="#content" />);
    const buttonElement = screen.getByText(/Click me/i);
    expect(buttonElement).toBeInTheDocument();
  });

  it('has the correct href attribute', () => {
    render(<Button role="button"  label="Click me" href="#content" />);
    const buttonElement = screen.getByText(/Click me/i);
    expect(buttonElement).toHaveAttribute('href', '#content');
  });

  it('has the correct class names', () => {
    render(<Button role="button"  label="Click me" href="#content" />);
    const buttonElement = screen.getByText(/Click me/i);
    expect(buttonElement).toHaveClass('bg-blue-500 hover:bg-blue-700 p-2 rounded-md text-white font-bold');
  });
});
