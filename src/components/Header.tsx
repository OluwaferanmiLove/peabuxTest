/* eslint-disable react/no-unstable-nested-components */
import React, {ReactNode} from 'react';
import {
  GestureResponderEvent,
  StyleProp,
  StyleSheet,
  TextStyle,
  TouchableOpacity,
  View,
} from 'react-native';
import {colors} from '@theme/colors';
import {hp, wp} from '@utils/responsive-dimension';
import CustomText from './CustomText';
import {Ionicons} from '@expo/vector-icons';
import {useNavigation} from '@react-navigation/native';

interface HeaderT {
  title?: string;
  onPressLeftElement?: (event: GestureResponderEvent) => void;
  onPressRightElement?: (event: GestureResponderEvent) => void;
  titleAlign?: 'center' | 'left' | 'right';
  titleStyle?: StyleProp<TextStyle>;
  leftElement?: ReactNode;
  rightElement?: ReactNode;
  textColor?: string;
}

const Header: React.FC<HeaderT> = ({
  title,
  textColor = colors.primary,
  onPressLeftElement,
  onPressRightElement,
  rightElement,
  leftElement,
  titleAlign,
  titleStyle,
}) => {
  const styles = StyleSheet.create({
    main: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingHorizontal: hp(14),
      paddingVertical: hp(8),
      paddingTop: hp(18),
    },
    titleContainer: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      marginHorizontal: wp(8),
    },
    image: {
      width: wp(165),
      height: hp(34),
      resizeMode: 'contain',
    },
  });

  const navigation = useNavigation();

  const Space = () => {
    return <View style={{width: wp(40)}} />;
  };

  return (
    <View style={styles.main}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Ionicons
          name={'ios-chevron-back'}
          color={colors.primary}
          size={wp(32)}
        />
      </TouchableOpacity>
      <View style={styles.titleContainer}>
        {title && (
          <CustomText.Header
            textAlign={titleAlign}
            customStyles={titleStyle}
            color={textColor}>
            {title!}
          </CustomText.Header>
        )}
      </View>
      <Space />
    </View>
  );
};
export default Header;
