import React from 'react';
import Native from 'react-native';
import Axios from 'axios';
import { Buffer } from 'buffer';

import PostHog from 'posthog-react-native';

function useApiClient() {
  const [image, setImage] = React.useState<string>();
  const [isLoading, setLoading] = React.useState<boolean>(false);
  const [changed, setChanged] = React.useState<boolean>(false);

  React.useEffect(() => {
    if (changed === false) {
      return;
    }

    Axios.get('https://thisartworkdoesnotexist.com/', {
      responseType: 'arraybuffer',
      headers: {
        'Content-Type': 'image/jpeg',
      },
    })
      .then((response) => response.data)
      .then((arrayBuffer) => {
        const encoded = Buffer.from(arrayBuffer).toString('base64');
        const uri = `data:image/jpeg;base64,${encoded}`;

        setImage(uri);
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        setLoading(false);
        setChanged(false);
      });
  }, [changed]);

  const change = () => {
    setLoading(true);
    setChanged(true);
  };

  return { image, isLoading, change };
}

const App: React.FC = (): React.ReactElement => {
  const window = Native.useWindowDimensions();
  const api = useApiClient();

  React.useEffect(() => {
    api.change();
  }, []);

  const onClickYes = () => {
    PostHog.capture('Clicked yes');
    api.change();
  };

  const onClickNo = () => {
    PostHog.capture('Clicked no');
    api.change();
  };

  return (
    <>
      <Native.StatusBar />
      <Native.SafeAreaView
        style={{
          flex: 1,
          justifyContent: 'center',
        }}>
        <Native.View
          style={{
            width: window.width,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Native.Image
            source={{
              uri: api.image,
              width: window.width / 1.2,
              height: window.width / 1.2,
            }}
          />
          <Native.Text style={{ margin: 16 }}>Do you like it?</Native.Text>
          <Native.View
            style={{
              flexDirection: 'row',
              width: window.width,
              justifyContent: 'space-evenly',
            }}>
            <Button
              onPress={onClickYes}
              disabled={api.isLoading}
              color={'#4caf50'}>
              Yes
            </Button>
            <Button
              onPress={onClickNo}
              disabled={api.isLoading}
              color={'#d32f2f'}>
              No
            </Button>
          </Native.View>
        </Native.View>
      </Native.SafeAreaView>
    </>
  );
};

type ButtonType = {
  onPress(): void;
  disabled: boolean;
  color: string;
};

const Button: React.FC<ButtonType> = (props) => {
  return (
    <React.Fragment>
      <Native.TouchableOpacity
        onPress={props.onPress}
        disabled={props.disabled}
        activeOpacity={0.8}
        delayPressIn={0.1}
        delayPressOut={0.1}
        style={{
          backgroundColor: props.disabled ? '#c3c3c3' : props.color,
          width: 50,
          height: 50,
          justifyContent: 'center',
          borderRadius: 50 / 2,
          elevation: 4,
        }}>
        <Native.Text
          style={{
            color: 'white',
            textAlign: 'center',
          }}>
          {props.children}
        </Native.Text>
      </Native.TouchableOpacity>
    </React.Fragment>
  );
};

export default App;
