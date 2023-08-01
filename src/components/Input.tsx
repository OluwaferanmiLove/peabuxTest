import React, {ReactNode} from 'react';
import {
  TextInput,
  StyleSheet,
  View,
  TextInputProps,
  StyleProp,
  ViewStyle,
  LayoutAnimation,
} from 'react-native';
import {colors} from '../theme/colors';
import {wp, hp} from '../utils/responsive-dimension';
import Row from './Row';
import CustomText from './CustomText';

export interface InputProps extends TextInputProps {
  height?: number;
  width?: number;
  label?: string;
  value?: string;
  error?: string;
  leftElement?: ReactNode;
  rightElement?: ReactNode;
  paddingVertical?: number;
  paddingHorizontal?: number;
  marginTop?: number;
  secureTextEntry?: boolean;
  autoFocus?: boolean;
  placeholder: string | number | any;
  onChangeText?: (arg: string) => void;
  inputBlur?: () => void;
  inputFocused?: () => void;
  textAlign?: 'center' | 'left' | 'right' | undefined;
  inputStyles?: StyleProp<TextInputProps>;
  inputContainerStyles?: StyleProp<ViewStyle>;
  reff?: any;
}

const Input: React.FC<InputProps> = ({
  secureTextEntry = false,
  label,
  error,
  marginTop,
  placeholder,
  onChangeText,
  inputFocused,
  inputBlur,
  value,
  autoFocus,
  textAlign,
  paddingVertical = hp(16),
  paddingHorizontal = wp(16),
  width = '100%',
  inputContainerStyles,
  inputStyles,
  leftElement,
  rightElement,
  reff,
  ...rest
}) => {
  const styles = StyleSheet.create({
    mainContainer: {
      marginTop: marginTop,
    },
    inputContainer: {
      paddingVertical,
      paddingHorizontal,
      backgroundColor: colors.grey,
      marginTop: label ? hp(12) : 0,
      width,
      borderRadius: wp(8),
      // borderWidth: wp(1),
    },
    textInput: {
      flex: 1,
      fontFamily: 'Poppins-Medium',
      color: colors.primary,
      fontSize: wp(14),
      lineHeight: hp(20),
      paddingVertical: 0,
      textAlign,
    },
  });

  const onFocus = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    inputFocused?.();
  };

  const onBlur = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    inputBlur?.();
  };

  return (
    <View style={[styles.mainContainer, inputContainerStyles]}>
      {label && (
        <CustomText.BodyMedium fontFamily={'Poppins-Medium'}>
          {label}
        </CustomText.BodyMedium>
      )}
      <View style={[styles.inputContainer, inputContainerStyles]}>
        <Row>
          {leftElement}
          <TextInput
            style={[styles.textInput, inputStyles]}
            placeholder={placeholder}
            secureTextEntry={secureTextEntry}
            onFocus={onFocus}
            autoFocus={autoFocus}
            value={value}
            ref={reff}
            onBlur={onBlur}
            onChangeText={onChangeText}
            {...rest}
          />
        </Row>
      </View>
      {error && (
        <CustomText.BodySmall
          fontFamily={'Poppins-Medium'}
          color={'red'}
          marginTop={8}>
          {error}
        </CustomText.BodySmall>
      )}
    </View>
  );
};

export default Input;
