import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import TemplateEditorPage from '../page';

// Mock the next/link component
jest.mock('next/link', () => {
  return ({ href, children }: { href: string; children: React.ReactNode }) => {
    return <a href={href}>{children}</a>;
  };
});

describe('Template Editor Page', () => {
  it('renders the page title and description', () => {
    render(<TemplateEditorPage />);
    
    // Check that the page title is rendered
    expect(screen.getByText('Template Editor')).toBeInDocument();
    
    // Check that the page description is rendered
    expect(
      screen.getByText(/Create and edit procedural content templates/i)
    ).toBeInTheDocument();
  });
  
  it('renders all template type cards', () => {
    render(<TemplateEditorPage />);
    
    // Check that all template type cards are rendered
    expect(screen.getByText('Encounters')).toBeInTheDocument();
    expect(screen.getByText('Locations')).toBeInTheDocument();
    expect(screen.getByText('NPCs')).toBeInTheDocument();
    expect(screen.getByText('Items')).toBeInTheDocument();
    expect(screen.getByText('Quests')).toBeInTheDocument();
  });
  
  it('renders the recent templates section', () => {
    render(<TemplateEditorPage />);
    
    // Check that the recent templates section is rendered
    expect(screen.getByText('Recent Templates')).toBeInTheDocument();
    
    // Since there are no templates, check for the empty state message
    expect(screen.getByText('No recent templates found.')).toBeInTheDocument();
  });
  
  it('renders the getting started section', () => {
    render(<TemplateEditorPage />);
    
    // Check that the getting started section is rendered
    expect(screen.getByText('Getting Started')).toBeInTheDocument();
    
    // Check that the steps are rendered
    expect(screen.getByText('Choose a template type')).toBeInTheDocument();
    expect(screen.getByText('Define template properties')).toBeInTheDocument();
    expect(screen.getByText('Add procedural content')).toBeInTheDocument();
    expect(screen.getByText('Test and refine')).toBeInTheDocument();
  });
  
  it('has correct links to template type pages', () => {
    render(<TemplateEditorPage />);
    
    // Check that the links to template type pages are correct
    const encountersLink = screen.getByText('Encounters').closest('a');
    const locationsLink = screen.getByText('Locations').closest('a');
    const npcsLink = screen.getByText('NPCs').closest('a');
    const itemsLink = screen.getByText('Items').closest('a');
    const questsLink = screen.getByText('Quests').closest('a');
    
    expect(encountersLink).toHaveAttribute('href', '/template-editor/encounters');
    expect(locationsLink).toHaveAttribute('href', '/template-editor/locations');
    expect(npcsLink).toHaveAttribute('href', '/template-editor/npcs');
    expect(itemsLink).toHaveAttribute('href', '/template-editor/items');
    expect(questsLink).toHaveAttribute('href', '/template-editor/quests');
  });
});