import { registry, register, get, call, unregister } from '.';

describe('@microfrontend-react/core', () => {
  it('provides a registry', () => {
    expect(registry).toBeTruthy();
  });

  describe('register', () => {
    it('has a register function', () => {
      expect(register).toBeTruthy();
    });

    it('adds items to the registry', () => {
      const testFn = jest.fn();
      const registryKey = 'register-test';

      register(registryKey, testFn);

      expect(registry[registryKey]).toEqual([testFn]);
    });

    it('only adds items once to the registry', () => {
      const testFn = jest.fn();
      const registryKey = 'repeat-test';

      register(registryKey, testFn);
      register(registryKey, testFn);
      register(registryKey, testFn);

      expect(registry[registryKey]).toEqual([testFn]);
    });
  });

  describe('unregister', () => {
    it('removes items from the registry for a given key', () => {
      const testFn = jest.fn();
      const registryKey = 'unregister-test';

      register(registryKey, testFn);
      unregister(registryKey, testFn);

      expect(registry[registryKey]).toEqual([]);
    });

    it('does nothing when the item is not registered', () => {
      const testFn = jest.fn();
      const registryKey = 'unregister-notregistered-test';

      unregister(registryKey, testFn);

      expect(registry[registryKey]).toBeUndefined();
    });

    it('only removes the given item from the registry for a given key', () => {
      const testFn = jest.fn();
      const otherTestFn = jest.fn();
      const registryKey = 'unregister-only-test';

      register(registryKey, testFn);
      register(registryKey, otherTestFn);
      unregister(registryKey, testFn);

      expect(registry[registryKey]).toEqual([otherTestFn]);
    });

    it('tolerates/ignores multiple unregister requests', () => {
      const testFn = jest.fn();
      const registryKey = 'unregister-test';

      register(registryKey, testFn);
      unregister(registryKey, testFn);
      unregister(registryKey, testFn);
      unregister(registryKey, testFn);

      expect(registry[registryKey]).toEqual([]);
    });
  });

  describe('get', () => {
    it('will get an item', () => {
      const getTest = jest.fn();
      const registryKey = 'get-test';

      register(registryKey, getTest);

      expect(get(registryKey)).toEqual([getTest]);
    });

    it('returns an empty array when no items are present', () => {
      expect(get('empty')).toEqual([]);
    });
  });

  describe('call', () => {
    it('attempts to call items as a function', () => {
      const callTest = jest.fn();
      const callTest2 = jest.fn();
      const registryKey = 'call-test';
      const args = [1, 2, 3];

      register(registryKey, callTest);
      register(registryKey, callTest2);

      call(registryKey, ...args);

      expect(callTest).toHaveBeenCalledWith(...args);
      expect(callTest2).toHaveBeenCalledWith(...args);
    });

    it('catches throws', () => {
      const throwingTest = jest.fn();
      const throwingTest2 = () => {
        throw new Error('Test');
      };
      const throwingTest3 = 'dummy';
      const throwingTest4 = jest.fn();
      const registryKey = 'throwing-test';

      register(registryKey, throwingTest);
      register(registryKey, throwingTest2);
      register(registryKey, throwingTest3);
      register(registryKey, throwingTest4);

      expect(() => call(registryKey)).not.toThrow();

      expect(throwingTest).toHaveBeenCalledTimes(1);
      expect(throwingTest4).toHaveBeenCalledTimes(1);
    });
  });
});
