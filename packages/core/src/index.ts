export const registry: {
  [registryKey: string]: Array<any>;
} = {};

export function register(registryKey: string, item: any) {
  if (!registry[registryKey]) {
    registry[registryKey] = [];
  }
  if (!registry[registryKey].includes(item)) {
    registry[registryKey].push(item);
  }
}

export function get(registryKey: string): Array<any> {
  return registry[registryKey] || [];
}

export function call(registryKey: string, ...args: Array<any>) {
  get(registryKey).forEach(item => {
    try {
      item(...args);
    } catch {}
  });
}
