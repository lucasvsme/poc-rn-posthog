import React from 'react';
import Native from 'react-native';

import PostHog from 'posthog-react-native';

const App: React.FC = (): React.ReactElement => {
  React.useEffect(() => {
    PostHog.screen('Home Screen', {
      productType: 'FooApp',
    });
  }, []);

  return (
    <>
      <Native.StatusBar />
      <Native.SafeAreaView>
        <Native.ScrollView></Native.ScrollView>
      </Native.SafeAreaView>
    </>
  );
};

export default App;
