import * as React from 'react';

import { registry } from '@microfrontend-react/core';

export interface OutletProps {
  registryKey: string;
}

const Outlet: React.FC<OutletProps> = ({
  registryKey,
  ...props
}: OutletProps) => (
  <>
    {(registry[registryKey] || []).map((Component, index) => (
      <Component key={index} {...props} />
    ))}
  </>
);

export default Outlet;
