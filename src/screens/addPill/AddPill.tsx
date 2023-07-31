import React, {ReactNode, useCallback, useEffect, useState} from 'react';
import {Alert, SafeAreaView, ScrollView, StyleSheet, TouchableOpacity, View} from 'react-native';
import Container from '@components/Container';
import {colors} from '@theme/colors';
import updateStatusBar from '@hooks/updateStatusBar';
import CustomText from '@components/CustomText';
import { hp, wp } from '@utils/responsive-dimension';
import Row from '@components/Row';
import { FontAwesome5, Fontisto, Ionicons } from '@expo/vector-icons';
import MedicineCard from '@components/MedicineCard';
import Header from '@components/Header';
import Input from '@components/Input';
// import AddMedicineModal from '@components/AddMedicineModal';

const AddPills = () => {
  updateStatusBar('dark-content', colors?.mainBg, false);

  return (
    <SafeAreaView style={styles.main}>
      <Header title={'Add Pills'} />
      <ScrollView>
        <Container marginTop={hp(24)}>
          <Input placeholder={'Enter medicine name'} />
        </Container>
      </ScrollView>
      <View style={styles.btnContainer}>
        <TouchableOpacity style={styles.button}>
          <CustomText.BodyMedium color={colors.white}>
            Add new medicine
          </CustomText.BodyMedium>
        </TouchableOpacity>
      </View>
      {/* <AddMedicineModal isVisible={true} /> */}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  main: {
    flex: 1,
    // backgroundColor: colors.mainBg,
  },
  btnContainer: {paddingHorizontal: wp(16), paddingBottom: hp(12)},
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.primary,
    paddingHorizontal: wp(12),
    paddingVertical: hp(18),
    borderRadius: wp(12),
  }
});

export default AddPills;
