import React from 'react';
import { render, screen } from '@testing-library/react';
import Nav from './Nav';
import { describe, it, expect } from 'vitest';
import { MemoryRouterProvider } from 'next-router-mock/MemoryRouterProvider';

describe('Nav component', () => {
  it('renders all menu items with correct links', () => {
    render(<Nav />, { wrapper: MemoryRouterProvider });
    
    const homeLink = screen.getByRole('link', { name: /Home/i });
    const newPostLink = screen.getByRole('link', { name: /Nouveau Post/i });
    const signInLink = screen.getByRole('link', { name: /Se Connecter/i });

    expect(homeLink).toHaveAttribute('href', '/');
    expect(newPostLink).toHaveAttribute('href', '/create');
    expect(signInLink).toHaveAttribute('href', '/signInAndUp');
  });
});
