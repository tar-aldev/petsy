import { expect, test, describe } from 'vitest';
import { render } from '@testing-library/react';

import Landing from './Landing';

describe('Landing', () => {
  test('should render successfully', () => {
    const { baseElement } = render(<Landing />);
    expect(baseElement).toBeTruthy();
  });
});
