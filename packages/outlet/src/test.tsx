import React from 'react';
import { render } from '@testing-library/react';
import { register } from '@microfrontend-react/core';

import Outlet from '.';

describe('@microfrontend-react/outlet', () => {
  it('renders without crashing', () => {
    render(<Outlet registryKey="outlet-test" />);
  });

  it('renders nothing when the key is not matched to anything in the registry', () => {
    const { container } = render(
      <Outlet registryKey="outlet-unknown-key">
        Children should be ignored
      </Outlet>
    );

    expect(container.innerHTML).toBeFalsy();
  });

  it('renders all registered components', () => {
    const registryKey = 'outlet-render-registered';
    const simpleText = 'Super simple component';
    const passThruText = 'Children can be passed thru';

    register(registryKey, () => <div data-testid="simple">{simpleText}</div>);
    register(registryKey, (props: any) => (
      <div data-testid="pass-thru" {...props} />
    ));

    const { getByText, getByTestId } = render(
      <Outlet registryKey={registryKey}>{passThruText}</Outlet>
    );

    expect(getByText(simpleText)).toBeDefined();
    expect(getByTestId('simple')).toBeDefined();

    expect(getByText(passThruText)).toBeDefined();
    expect(getByTestId('pass-thru').innerHTML).toEqual(passThruText);
  });

  it('can be nested', () => {
    const innerRegistryKey = 'outlet-inner';
    const outerRegistryKey = 'outlet-outer';

    register(innerRegistryKey, () => <div data-testid="inner">Inner item</div>);
    register(outerRegistryKey, () => <Outlet registryKey={innerRegistryKey} />);

    const { getByTestId } = render(<Outlet registryKey={outerRegistryKey} />);

    expect(getByTestId('inner')).toBeDefined();
  });

  it('will pass thru random props', () => {
    const registryKey = 'outlet-passthru';
    const componentWithProps: React.FC<{ testFlag: boolean }> = ({
      children,
      testFlag,
    }) => <div data-testid={testFlag ? 'has-flag' : 'no-flag'}>{children}</div>;

    register(registryKey, componentWithProps);

    const { getByTestId } = render(
      <Outlet registryKey={registryKey} testFlag />
    );

    expect(getByTestId('has-flag')).toBeDefined();
  });
});
