import React, {ReactNode, useCallback, useEffect, useState} from 'react';
import {
  Alert,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import Container from '@components/Container';
import {colors} from '@theme/colors';
import updateStatusBar from '@hooks/updateStatusBar';
import CustomText from '@components/CustomText';
import {hp, wp} from '@utils/responsive-dimension';
import Row from '@components/Row';
import {FontAwesome5, Fontisto, Ionicons} from '@expo/vector-icons';
import MedicineCard from '@components/MedicineCard';
import {useNavigation} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import {RootState, persistor} from '@redux/store';
import {formatDate} from '@utils/helper';
// import AddMedicineModal from '@components/AddMedicineModal';

const Home = () => {
  updateStatusBar('dark-content', colors?.mainBg, false);

  const navigation = useNavigation();
  const {medicine} = useSelector((state: RootState) => state.medicineSlice);

  return (
    <SafeAreaView style={styles.main}>
      <ScrollView>
        <Container marginTop={hp(24)}>
          <Row>
            <View>
              <CustomText.Header3>Hello,</CustomText.Header3>
              <CustomText.Header3>User</CustomText.Header3>
            </View>
            <Ionicons
              name={'notifications'}
              size={wp(28)}
              color={colors.primary}
            />
          </Row>
          <View style={styles.homeBanner}>
            <Row gap={wp(8)}>
              <View style={{flex: 1}}>
                <CustomText.BodyLarge fontFamily={'Poppins-Medium'}>
                  Your medication reminder app
                </CustomText.BodyLarge>
                <CustomText.BodySmall color={colors.gray} marginTop={hp(12)}>
                  Set your medication reminder time and we take care of the rest
                </CustomText.BodySmall>
              </View>
              <Fontisto name={'pills'} size={wp(48)} color={colors.primary} />
            </Row>
          </View>
          <View style={styles.medicationReminderContainer}>
            <CustomText.BodyLarge fontFamily={'Poppins-Bold'}>
              Upcoming Reminders
            </CustomText.BodyLarge>
            {medicine.map(item => (
              <MedicineCard
                key={item.id}
                medicineType={item.type}
                title={item.name}
                subTitle={`${formatDate(item?.schedules[0]?.date, 'hh:mm A')}`}
              />
            ))}
            <TouchableOpacity
              onPress={() => navigation.navigate('AddPills')}
              style={styles.addBtn}>
              <Fontisto name={'pills'} size={wp(32)} color={colors.primary} />
              <View style={styles.addBtnTitleContainer}>
                <CustomText.BodyLarge fontFamily={'Poppins-Medium'}>
                  Add Medicine
                </CustomText.BodyLarge>
                <CustomText.BodySmall
                  marginTop={hp(6)}
                  fontFamily={'Poppins-Regular'}
                  color={colors.gray}>
                  Click here to add new medicine
                </CustomText.BodySmall>
              </View>
              {/* <Ionicons
                name={"chevron-forward"}
                size={wp(24)}
                color={colors.primary}
              /> */}
            </TouchableOpacity>
          </View>
        </Container>
      </ScrollView>
      {/* <View style={styles.btnContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("AddPills")}>
          <CustomText.BodyMedium color={colors.white}>
            Add new medicine
          </CustomText.BodyMedium>
          <Ionicons name={"arrow-forward"} color={colors.white} size={wp(24)} />
        </TouchableOpacity>
      </View> */}
      {/* <AddMedicineModal isVisible={true} /> */}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  main: {
    flex: 1,
    // backgroundColor: colors.mainBg,
  },
  homeBanner: {
    paddingVertical: wp(24),
    paddingHorizontal: wp(16),
    // backgroundColor: colors.secondaryLighter,
    backgroundColor: '#FDF3F3',
    borderRadius: 20,
    marginTop: 32,
  },
  medicationReminderContainer: {
    marginTop: 24,
  },
  btnContainer: {
    paddingHorizontal: wp(16),
    paddingBottom: hp(12),
    alignItems: 'flex-end',
  },
  button: {
    gap: wp(8),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.primary,
    paddingHorizontal: wp(24),
    paddingVertical: hp(18),
    borderRadius: wp(12),
  },

  addBtn: {
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
  addBtnTitleContainer: {
    flex: 1,
    alignItems: 'flex-start',
    marginHorizontal: wp(8),
  },
});

export default Home;
