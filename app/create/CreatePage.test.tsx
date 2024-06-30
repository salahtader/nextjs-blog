import React from 'react';
import { render } from '@testing-library/react';
import Createpage from './page';
import { expect, it } from 'vitest';

it('renders create Page text', () => {
  const { getByText } = render(<Createpage />);
  const pageTitle = getByText(/create Page/i);
  expect(pageTitle).toBeInTheDocument();
});

it('renders centered text', () => {
  const { getByText } = render(<Createpage />);
  const centeredText = getByText(/create Page/i);
  expect(centeredText).toHaveClass('text-4xl');
  expect(centeredText).toHaveClass('font-black');
});
