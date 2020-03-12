import * as React from 'react';

import { get } from '@microfrontend-react/core';

export interface OutletProps {
  registryKey: string;
}

const Outlet: React.FC<OutletProps> = ({
  registryKey,
  ...props
}: OutletProps) => (
  <>
    {get(registryKey).map((Component, index) => (
      <Component key={index} {...props} />
    ))}
  </>
);

export default Outlet;
