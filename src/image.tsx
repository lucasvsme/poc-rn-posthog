import React from 'react';
import Native from 'react-native';

export type ImageType = {
  testID?: string;
  uri?: string;
};

export const Image: React.FC<ImageType> = (props) => {
  const window = Native.useWindowDimensions();

  return (
    <React.Fragment>
      <Native.View
        testID={props.testID}
        style={{
          elevation: 4,
          shadowColor: '#000000',
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.5,
          shadowRadius: 4,
        }}>
        <Native.Image
          style={{
            width: window.width / 1.2,
            height: window.width / 1.2,
            borderRadius: 4,
          }}
          source={{
            uri: props.uri,
            width: window.width / 1.2,
            height: window.width / 1.2,
          }}
        />
      </Native.View>
    </React.Fragment>
  );
};
