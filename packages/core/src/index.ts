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
