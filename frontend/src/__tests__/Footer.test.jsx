import { render, screen } from '@testing-library/react';
import Footer from '../components/Footer';

{/* test ensuring all links are present working correctly */ }
describe('Footer', () => {
  it('renders the GitHub link', () => {
    render(<Footer />);
    const githubLink = screen.getByRole('link', { name: /view on github/i });
    expect(githubLink).toBeInTheDocument();
    expect(githubLink).toHaveAttribute('href', 'https://github.com/chingu-voyages/V59-tier3-team-36');
  });

  {/* Test to ensure the Scrum Master name is rendered correctly */}
  it('renders the Scrum Master name', () => {
    render(<Footer />);
    expect(screen.getByText(/yangchen dema/i)).toBeInTheDocument();
  });

{/* Test to ensure all developer names and their corresponding links are rendered correctly */}
  it('renders all developer names with correct links', () => {
    render(<Footer />);
    const devLinks = [
      { name: /stanley eze/i, url: 'https://www.linkedin.com/in/stanleyeze01/' },
      { name: /banto klara/i, url: 'https://www.linkedin.com/in/banto-laczi-klara/' },
      { name: /kevin llanos/i, url: 'https://www.linkedin.com/in/kevinllanos7/' },
      { name: /greg minezzi/i, url: 'https://www.linkedin.com/in/gregminezzi' },
      { name: /shruthi reddy/i, url: 'https://www.linkedin.com/in/ssreddy/' }
    ];
    devLinks.forEach(dev => {
      const link = screen.getByRole('link', { name: dev.name });
      expect(link).toBeInTheDocument();
      expect(link).toHaveAttribute('href', dev.url);
    });
  });
});
