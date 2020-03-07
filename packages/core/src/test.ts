import { registry, register } from '.';

describe('@microfrontend-react/core', () => {
  it('provides a registry', () => {
    expect(registry).toBeTruthy();
  });

  it('has a register function', () => {
    expect(register).toBeTruthy();
  });
});
