# Microfrontend-React Example

This provides a simplistic example of how to use microfrontend-react.

Inside the `microfrontends` folder you will find two self-contained components, each a microfrontend. Each will register themselves - as there is currently no automatic registration, this is done via simply importing the modules.

The main `index.tsx` file uses a `Container`, within which it places an `Outlet`. The `Outlet` is set to show all microfrontends registered with a particular componentKey.

