import React from 'react';
import { render, screen } from '@testing-library/react';
import Header from './Header';
import { describe, it, expect } from 'vitest';

describe('Header component', () => {
  it('renders the blog title', () => {
    render(<Header />);
    const titleElement = screen.getByText(/Blog/i);
    expect(titleElement).toBeInTheDocument();
  });

  it('renders the vertical divider', () => {
    render(<Header />);
    const dividerElement = screen.getByRole('separator');
    expect(dividerElement).toBeInTheDocument();
  });

  it('renders the link to content', () => {
    render(<Header />);
    const linkElement = screen.getByRole('link', { name: /Voir les articles/i });
    expect(linkElement).toHaveAttribute('href', '#content');
  });
  

  it('renders with the correct background image', () => {
    render(<Header />);
    const headerElement = screen.getByRole('banner');
    expect(headerElement).toHaveStyle("background-image: url('./home.jpg')");
  });
});
