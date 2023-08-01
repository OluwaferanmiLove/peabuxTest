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
import {FontAwesome5, Fontisto, Ionicons} from '@expo/vector-icons';

interface MedicineCardT {
  title?: string;
  subTitle: string;
  medicineType?: 'pill' | 'drop' | 'syrup' | 'injection';
  onPress?: (event: GestureResponderEvent) => void;
  onPressRightElement?: (event: GestureResponderEvent) => void;
  titleAlign?: 'center' | 'left' | 'right';
  titleStyle?: StyleProp<TextStyle>;
  leftElement?: ReactNode;
  rightElement?: ReactNode;
  textColor?: string;
}

const MedicineCard: React.FC<MedicineCardT> = ({
  title,
  subTitle,
  textColor = colors.primary,
  onPress,
  medicineType,
  leftElement,
  titleAlign,
  titleStyle,
}) => {
  const styles = StyleSheet.create({
    main: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: wp(8),
      backgroundColor: colors?.grey,
      paddingHorizontal: wp(24),
      paddingVertical: hp(32),
      borderRadius: wp(20),
      marginTop: hp(16),
    },
    titleContainer: {
      flex: 1,
      alignItems: 'flex-start',
      marginHorizontal: wp(8),
    },
  });

  const Space = () => {
    return <View style={{width: wp(20)}} />;
  };

  return (
    <TouchableOpacity onPress={onPress} style={styles.main}>
      {medicineType === 'pill' && (
        <Fontisto name={'pills'} size={wp(32)} color={colors.primary} />
      )}
      {medicineType === 'drop' && (
        <Fontisto name={'blood-drop'} size={wp(32)} color={colors.primary} />
      )}
      {medicineType === 'injection' && (
        <Fontisto
          name={'injection-syringe'}
          size={wp(32)}
          color={colors.primary}
        />
      )}
      {medicineType === 'syrup' && (
        <FontAwesome5
          name={'prescription-bottle'}
          size={wp(32)}
          color={colors.primary}
        />
      )}
      <View style={styles.titleContainer}>
        <CustomText.BodyLarge
          textAlign={titleAlign}
          customStyles={titleStyle}
          fontFamily={'Poppins-Medium'}
          color={textColor}>
          {title!}
        </CustomText.BodyLarge>
        <CustomText.BodySmall
          textAlign={titleAlign}
          marginTop={hp(6)}
          fontFamily={'Poppins-Regular'}
          color={colors.gray}>
          {subTitle!}
        </CustomText.BodySmall>
      </View>
      <Ionicons name={'chevron-forward'} size={wp(24)} color={colors.primary} />
    </TouchableOpacity>
  );
};
export default MedicineCard;
