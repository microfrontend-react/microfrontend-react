import * as React from 'react';
import { components } from '@microfrontend-react/core';

const Container: React.ComponentType = ({ children }) => (
  <>
    {(components.context || []).reduce(
      (output: React.ReactNode, Context: React.ComponentType) => (
        <Context children={output} />
      ),
      children
    )}
  </>
);

export default Container;
