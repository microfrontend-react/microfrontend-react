import { components, register } from '.';

describe('@microfrontend-react/core', () => {
  it('provides a components registry', () => {
    expect(components).toBeTruthy();
  });

  it('has a register function', () => {
    expect(register).toBeTruthy();
  });
});
