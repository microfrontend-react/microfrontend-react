import * as React from 'react';
import * as ReactDOM from 'react-dom';
import Outlet from '.';

describe('@microfrontend-react/outlet', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Outlet componentKey="test" />, div);
    ReactDOM.unmountComponentAtNode(div);
  });
});
