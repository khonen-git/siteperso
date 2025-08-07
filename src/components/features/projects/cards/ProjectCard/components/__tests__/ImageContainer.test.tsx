import { render, screen } from '@testing-library/react';
import { ImageContainer } from '../ImageContainer';

const mockImage = {
  src: '/test-image.jpg',
  alt: 'Test Image'
};

describe('ImageContainer', () => {
  it('renders image with correct attributes', () => {
    render(<ImageContainer image={mockImage} />);
    
    const image = screen.getByRole('img');
    expect(image).toHaveAttribute('src');
    expect(image).toHaveAttribute('alt', mockImage.alt);
  });

  it('applies custom className when provided', () => {
    const customClass = 'custom-class';
    const { container } = render(
      <ImageContainer image={mockImage} className={customClass} />
    );
    
    expect(container.firstChild).toHaveClass(customClass);
  });

  it('maintains aspect ratio container', () => {
    const { container } = render(<ImageContainer image={mockImage} />);
    
    expect(container.firstChild).toHaveClass('aspect-[4/3]');
  });
});