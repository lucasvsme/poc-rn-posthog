import React from 'react';
import Native from 'react-native';
import PostHog from 'posthog-react-native';

import { AppContext } from './context';
import { Image } from './image';
import { ImageApiClientImpl, useImageApi } from './api';
import { PositiveButton, NegativeButton } from './button';

const style = Native.StyleSheet.create({
  safeAreaView: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    justifyContent: 'center',
  },
  view: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  viewText: {
    margin: 32,
  },
  viewButtons: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
});

export const App: React.FC = (): React.ReactElement => {
  const window = Native.useWindowDimensions();
  const app = React.useContext(AppContext);
  const api = useImageApi(new ImageApiClientImpl(app.httpClient));

  React.useEffect(() => {
    PostHog.screen('Home screen');
    api.changeImage();
  }, []);

  const onClickYes = () => {
    PostHog.capture('Button clicked', { answer: 'yes' });
    api.changeImage();
  };

  const onClickNo = () => {
    PostHog.capture('Button clicked', { answer: 'no' });
    api.changeImage();
  };

  return (
    <>
      <Native.StatusBar
        barStyle={'dark-content'}
        translucent={false}
        backgroundColor={'#dfdfdf'}
      />
      <Native.SafeAreaView style={style.safeAreaView}>
        <Native.View style={style.view}>
          <Image testID={'app-image'} uri={api.image} />
          <Native.Text style={style.viewText}>
            Do you like the image?
          </Native.Text>
          <Native.View style={[style.viewButtons, { width: window.width }]}>
            <PositiveButton onPress={onClickYes} disabled={api.isLoading}>
              Yes
            </PositiveButton>
            <NegativeButton onPress={onClickNo} disabled={api.isLoading}>
              No
            </NegativeButton>
          </Native.View>
        </Native.View>
      </Native.SafeAreaView>
    </>
  );
};

export default App;
