import React from 'react';
import LandingPage from './components/LandingPage.tsx';
import { FluentProvider, webLightTheme } from '@fluentui/react-components';

const App: React.FC = () => {
  return (
    <FluentProvider theme={webLightTheme}>
      <LandingPage />
    </FluentProvider>
  );
};

export default App;
