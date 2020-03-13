import React from 'react';
import { render } from '@testing-library/react';
import { register } from '@microfrontend-react/core';

import Container from '.';

describe('@microfrontend-react/container', () => {
  it('renders without crashing', () => {
    render(<Container>Content</Container>);
  });

  it('renders children when the key is not matched to anything in the registry', () => {
    const childContent = 'Children should be rendered';
    const { container, getByText } = render(
      <Container registryKey="container-test-unknown-key">
        {childContent}
      </Container>
    );

    expect(container.innerHTML).toEqual(childContent);
    expect(getByText(childContent)).toBeDefined();
  });

  it('when no registryKey is given it renders "containers" from the registry', () => {
    const childContent = 'Children should be rendered';
    const container: React.FC = ({ children }) => (
      <div data-testid="container">{children}</div>
    );
    register('containers', container);

    const { getByTestId, getByText } = render(
      <Container>{childContent}</Container>
    );

    const renderedContainer = getByTestId('container');
    expect(renderedContainer).toBeDefined();
    expect(renderedContainer.innerHTML).toEqual(childContent);
    expect(getByText(childContent)).toBeDefined();
  });

  it('renders children inside a registered container', () => {
    const registryKey = 'container-registered';
    const childContent = 'Children should be rendered';
    const container: React.FC = ({ children }) => (
      <div data-testid="container">{children}</div>
    );

    register(registryKey, container);

    const { getByTestId, getByText } = render(
      <Container registryKey={registryKey}>{childContent}</Container>
    );

    const renderedContainer = getByTestId('container');
    expect(renderedContainer).toBeDefined();
    expect(renderedContainer.innerHTML).toEqual(childContent);
    expect(getByText(childContent)).toBeDefined();
  });

  it('nests all registered components', () => {
    const registryKey = 'container-nested';
    const childContent = 'Children should be rendered';
    const container: React.FC = ({ children }) => (
      <div data-testid="container">{children}</div>
    );
    const container2: React.FC = ({ children }) => (
      <div data-testid="container2">{children}</div>
    );

    register(registryKey, container);
    register(registryKey, container2);

    const { getByTestId, getByText, container: renderContainer } = render(
      <Container registryKey={registryKey}>{childContent}</Container>
    );

    expect(getByText(childContent)).toBeDefined();
    expect(getByTestId('container')).toBeDefined();
    expect(getByTestId('container2')).toBeDefined();
    expect(renderContainer.children.length).toEqual(1);
  });

  it('will pass thru random props', () => {
    const childContent = 'Children should be rendered';
    const registryKey = 'container-passthru';
    const componentWithProps: React.FC<{ testFlag: boolean }> = ({
      children,
      testFlag,
    }) => <div data-testid={testFlag ? 'has-flag' : 'no-flag'}>{children}</div>;

    register(registryKey, componentWithProps);

    const { getByTestId, getByText } = render(
      <Container registryKey={registryKey} testFlag>
        {childContent}
      </Container>
    );

    expect(getByTestId('has-flag')).toBeDefined();
    expect(getByText(childContent)).toBeDefined();
  });
});
