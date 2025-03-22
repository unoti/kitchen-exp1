import React from 'react';
import LandingPage from './components/LandingPage';
import { FluentProvider, webLightTheme } from '@fluentui/react-components';

const App: React.FC = () => {
  const currentPlayer = { id: 'p1', name: 'Player1' };
  return (
    <FluentProvider theme={webLightTheme}>
      <LandingPage player={currentPlayer} />
    </FluentProvider>
  );
};

export default App;
