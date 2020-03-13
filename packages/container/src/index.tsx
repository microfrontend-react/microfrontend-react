import * as React from 'react';
import { get } from '@microfrontend-react/core';

export interface ContainerProps {
  children: React.ReactNode;
  registryKey?: string;
}

const Container: React.FC<ContainerProps> = ({
  children,
  registryKey = 'containers',
  ...props
}: ContainerProps) => (
  <>
    {get(registryKey).reduce(
      (output: React.ReactNode, Component: React.ComponentType) => (
        <Component children={output} {...props} />
      ),
      children
    )}
  </>
);

export default Container;
