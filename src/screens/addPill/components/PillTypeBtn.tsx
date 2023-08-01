import React from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import Container from '@components/Container';
import {colors} from '@theme/colors';
import updateStatusBar from '@hooks/updateStatusBar';
import CustomText from '@components/CustomText';
import {hp, wp} from '@utils/responsive-dimension';
import {FontAwesome5, Fontisto, Ionicons} from '@expo/vector-icons';

const PillTypeBtn = ({
  name,
  onPress,
  selected,
}: {
  name: string;
  onPress: () => void;
  selected: boolean;
}) => {
  updateStatusBar('dark-content', colors?.mainBg, false);

  return (
    <TouchableOpacity
      style={[
        styles.pillTypeBtn,
        {backgroundColor: selected ? colors.primary : colors.grey},
      ]}
      onPress={onPress}>
      {name === 'pill' && (
        <Fontisto
          name={'pills'}
          size={wp(18)}
          color={selected ? colors.white : colors.gray}
        />
      )}
      {name === 'drop' && (
        <Fontisto
          name={'blood-drop'}
          size={wp(18)}
          color={selected ? colors.white : colors.gray}
        />
      )}
      {name === 'injection' && (
        <Fontisto
          name={'injection-syringe'}
          size={wp(18)}
          color={selected ? colors.white : colors.gray}
        />
      )}
      {name === 'syrup' && (
        <FontAwesome5
          name={'prescription-bottle'}
          size={wp(18)}
          color={selected ? colors.white : colors.gray}
        />
      )}
      <CustomText.BodySmall
        customStyles={{textTransform: 'capitalize'}}
        color={selected ? colors.white : colors.gray}
        fontFamily={'Poppins-Medium'}>
        {name}
      </CustomText.BodySmall>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  pillTypeBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: wp(8),
    justifyContent: 'center',
    backgroundColor: colors.grey,
    paddingHorizontal: wp(24),
    paddingVertical: hp(12),
    borderRadius: wp(12),
  },
});

export default PillTypeBtn;
