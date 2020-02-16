import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { register } from '@microfrontend-react/core';

const Wotsit = () => {
  return <div>there are wotsits here too</div>;
};

register('thing', Wotsit);
