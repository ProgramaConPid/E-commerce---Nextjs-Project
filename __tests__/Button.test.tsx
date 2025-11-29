import { render, screen } from '@testing-library/react';
import Button from '@/components/ui/Button';

jest.mock('next/font/google', () => ({
  Raleway: () => ({ style: { fontFamily: 'Raleway' } }),
  Nunito_Sans: () => ({ style: { fontFamily: 'Nunito Sans' } }),
}));

describe('Button Component', () => {
  it('renders the button with the correct text', () => {
    render(<Button text="Shop Now" textColor="black" buttonBg="black" border="none" size="md" />);
    const buttonElement = screen.getByText(/Shop Now/i);
    expect(buttonElement).toBeInTheDocument();
  })
})