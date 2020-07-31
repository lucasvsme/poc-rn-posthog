import React from 'react';
import Native from 'react-native';

type ButtonProps = {
  onPress(): void;
  disabled: boolean;
  colorEnabled: string;
  colorDisabled: string;
  testID?: string;
};

const Button: React.FC<ButtonProps> = (props) => {
  return (
    <React.Fragment>
      <Native.TouchableOpacity
        testID={props.testID}
        onPress={() => {
          // https://github.com/callstack/react-native-testing-library/issues/28
          if (props.disabled === false) {
            props.onPress();
          }
        }}
        disabled={props.disabled}
        activeOpacity={0.8}
        delayPressIn={0.1}
        delayPressOut={0.1}
        style={{
          backgroundColor: props.disabled
            ? props.colorDisabled
            : props.colorEnabled,
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

export type AnswerButtonProps = Pick<ButtonProps, 'onPress' | 'disabled'>;

export const PositiveButton: React.FC<AnswerButtonProps> = (props) => {
  return (
    <Button
      testID={'positive-button'}
      onPress={props.onPress}
      disabled={props.disabled}
      colorDisabled={'#c3c3c3'}
      colorEnabled={'#4caf50'}>
      {props.children}
    </Button>
  );
};

export const NegativeButton: React.FC<AnswerButtonProps> = (props) => {
  return (
    <Button
      testID={'negative-button'}
      onPress={props.onPress}
      disabled={props.disabled}
      colorDisabled={'#c3c3c3'}
      colorEnabled={'#d32f2f'}>
      {props.children}
    </Button>
  );
};
