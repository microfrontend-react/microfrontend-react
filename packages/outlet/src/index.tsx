import * as React from 'react';
import { get } from '@microfrontend-react/core';

export interface OutletProps {
  registryKey: string;
  [key: string]: any;
}

const Outlet: React.FC<OutletProps> = ({
  registryKey,
  ...props
}: OutletProps) => (
  <>
    {get(registryKey).map((Component: React.ComponentType, index: number) => (
      <Component key={index} {...props} />
    ))}
  </>
);

export default Outlet;
