import React from 'react';
import LandingPage from './components/LandingPage.tsx'; // I shouldn't need the .tsx extension, but things are malfunctioning. Troubleshooting.
import { FluentProvider, webLightTheme } from '@fluentui/react-components';

const App: React.FC = () => {
  return (
    <FluentProvider theme={webLightTheme}>
      <LandingPage />
    </FluentProvider>
  );
};

export default App;
