import * as React from 'react';

export const components: {
  [componentKey: string]: Array<React.ComponentType>;
} = {};

export function register(componentKey: string, component: React.ComponentType) {
  if (!components[componentKey]) {
    components[componentKey] = [];
  }
  if (!components[componentKey].includes(component)) {
    components[componentKey].push(component);
  }
}
