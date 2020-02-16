import * as React from 'react';

import { components } from '@microfrontend-react/core';

export interface OutletProps {
  componentKey: string;
}

const Outlet = ({ componentKey, ...props }: OutletProps) => (
  <>
    {(components[componentKey] || []).map((Component, index) => (
      <Component key={index} {...props} />
    ))}
  </>
);

export default Outlet;
