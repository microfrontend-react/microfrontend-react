import * as React from 'react';
import { registry } from '@microfrontend-react/core';

export interface ContainerProps {
  children: React.ReactNode;
  registryKey?: string;
}

const Container: React.FC<ContainerProps> = ({
  children,
  registryKey = 'context',
  ...props
}: ContainerProps) => (
  <>
    {(registry[registryKey] || []).reduce(
      (output: React.ReactNode, Component: React.ComponentType) => (
        <Component children={output} {...props} />
      ),
      children
    )}
  </>
);

export default Container;
