import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { register } from '@microfrontend-react/core';

export const Thing = () => {
  return <div>the snozzberries taste like snozzberries</div>;
};

register('thing', Thing);
