import React, {ReactNode, useCallback, useEffect, useState} from 'react';
import {
  Alert,
  Platform,
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
import Header from '@components/Header';
import Input from '@components/Input';
import PillTypeBtn from './components/PillTypeBtn';
import {frequency} from '@constant/staticData';
import {useForm, Controller, SubmitHandler} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from 'yup';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {Keyboard} from 'react-native';
import {useToast} from 'react-native-toast-notifications';
import {Medicine} from '@redux/medicine/medicine';
import {useNavigation} from '@react-navigation/native';
import BottomModal from '@components/BottomModal';
import DateTimePicker, {
  DateTimePickerAndroid,
  DateTimePickerEvent,
} from '@react-native-community/datetimepicker';
import {formatDate} from '@utils/helper';
import useNotification from '@hooks/useNotification';
import uuid from 'react-native-uuid';
import {useDispatch} from 'react-redux';
import {
  CalendarTriggerInput,
  NotificationTriggerInput,
} from 'expo-notifications';
import {setMedicine} from '@redux/medicine/medicineSlice';

const pillTypes = ['pill', 'syrup', 'injection', 'drop'];

const schema = yup.object().shape({
  name: yup.string().required('Name is required'),
  type: yup.mixed().oneOf(pillTypes).required('Please select medicine type'),
  singleDose: yup.string().required('Please enter medicine dose'),
  frequency: yup.number().required('Please select frequency'),
});

interface FormValue {
  name: string;
  type: 'pill' | 'syrup' | 'injection' | 'drop';
  frequency: number;
  singleDose: string;
}

const AddPills = () => {
  const [selectedPillType, setPillType] = useState(null);
  const [showTimeModal, setShowTimeModal] = useState(false);
  const [tempDate, setTempDate] = useState<Date>(new Date());
  const [schedules, setSchedules] = useState<Date[]>([]);
  const [scheduleError, setScheduleError] = useState<string | null>(null);

  updateStatusBar('dark-content', colors?.mainBg, false);

  const navigation = useNavigation();
  const dispatch = useDispatch();
  const toast = useToast();

  const {schedulePushNotification} = useNotification();

  const {
    control,
    handleSubmit,
    setValue,
    formState: {errors},
  } = useForm<FormValue>({resolver: yupResolver(schema)});

  const onChange = (event: DateTimePickerEvent, selectedDate?: Date) => {
    if (event?.type === 'dismissed') {
      DateTimePickerAndroid.dismiss('time');
      return;
    }
    const currentDate = selectedDate;
    if (Platform.OS === 'android') {
      setSchedules(prev => [...prev, currentDate!]);
    } else {
      setTempDate(currentDate!);
    }
  };

  const setTime = () => {
    setSchedules(prev => [...prev, tempDate]);
    setShowTimeModal(false);
  };

  const handleTime = () => {
    Keyboard.dismiss();
    if (Platform.OS === 'android') {
      DateTimePickerAndroid.open({
        value: new Date(),
        onChange,
        mode: 'time',
        is24Hour: false,
      });
      return;
    }
    setShowTimeModal(true);
  };

  const handleAddPill: SubmitHandler<FormValue> = async data => {
    try {
      Keyboard.dismiss();
      if (schedules.length < 1) {
        setScheduleError('Please enter at least one time for reminder');
        return;
      }
      setScheduleError(null);
      let notificationData = {...data, id: uuid.v4()};
      let title = `Time to take your ${data?.name}`;
      let description = `Time to get up and take your ${data?.name}`;
      let notificationSchedule = [];
      schedules;
      for (let x in schedules) {
        let time = new Date(schedules[x]);
        let trigger: NotificationTriggerInput;
        if (data.frequency === 1) {
          if (Platform.OS === 'ios') {
            trigger = {
              hour: time.getHours(),
              minute: time.getMinutes(),
              second: time.getSeconds(),
              repeats: true,
            };
          } else {
            trigger = time;
          }
        }
        let notificationId = await schedulePushNotification(
          notificationData,
          title,
          description,
          trigger,
        );
        let notif = {
          date: schedules[x],
          notificationId: notificationId,
        };
        notificationSchedule.push(notif);
      }

      dispatch(
        setMedicine({...data, id: uuid.v4(), schedules: notificationSchedule}),
      );
      toast.show('Medicine added successfully', {
        type: 'success',
      });
      navigation.goBack();
    } catch (error: any) {
      console.log(error);
      toast.show('message', {
        type: 'error',
      });
    }
  };

  return (
    <SafeAreaView style={styles.main}>
      <Header title={'Add Pills'} />
      <KeyboardAwareScrollView
        keyboardShouldPersistTaps={'handled'}
        keyboardDismissMode={'interactive'}>
        <Container marginTop={hp(24)}>
          <Controller
            name="name"
            control={control}
            render={({field: {onChange, onBlur, value}}) => (
              <Input
                label={'Enter pill name'}
                placeholder={'Enter medicine name'}
                onChangeText={text => onChange(text)}
                value={value}
                onBlur={onBlur}
                error={errors.name?.message}
              />
            )}
          />

          <Controller
            name="type"
            control={control}
            render={({field: {onChange, onBlur, value}}) => (
              <View style={{marginTop: hp(32)}}>
                <CustomText.BodyMedium fontFamily={'Poppins-Medium'}>
                  Select medicine type
                </CustomText.BodyMedium>
                <Row
                  customStyles={{gap: wp(12)}}
                  marginTop={hp(16)}
                  justifyContent={'flex-start'}
                  flexWrap={'wrap'}>
                  {pillTypes.map(item => (
                    <PillTypeBtn
                      onPress={() => onChange(item)}
                      selected={item === value}
                      key={item}
                      name={item}
                    />
                  ))}
                </Row>
                <CustomText.BodySmall
                  fontFamily={'Poppins-Medium'}
                  color={'red'}
                  marginTop={8}>
                  {errors.type?.message}
                </CustomText.BodySmall>
              </View>
            )}
          />

          <Controller
            name="singleDose"
            control={control}
            render={({field: {onChange, onBlur, value}}) => (
              <View style={{marginTop: hp(32)}}>
                <Input
                  label={'Medicine dose'}
                  placeholder={'Enter medicine dose eg. 2, 50ml, 2 drops'}
                  onChangeText={text => onChange(text)}
                  value={value}
                  onBlur={onBlur}
                  error={errors.singleDose?.message}
                />
              </View>
            )}
          />

          <Controller
            name={'frequency'}
            control={control}
            render={({field: {onChange, onBlur, value}}) => (
              <View style={{marginTop: hp(32)}}>
                <CustomText.BodyMedium fontFamily={'Poppins-Medium'}>
                  Select frequency
                </CustomText.BodyMedium>
                <Row
                  customStyles={{gap: wp(12)}}
                  marginTop={hp(16)}
                  justifyContent={'flex-start'}
                  flexWrap={'wrap'}>
                  {frequency.map(item => (
                    <PillTypeBtn
                      key={item?.title}
                      name={item?.title}
                      onPress={() => onChange(item?.interval)}
                      selected={item.interval === value}
                    />
                  ))}
                </Row>
                <CustomText.BodySmall
                  fontFamily={'Poppins-Medium'}
                  color={'red'}
                  marginTop={8}>
                  {errors.frequency?.message}
                </CustomText.BodySmall>
              </View>
            )}
          />

          <View style={{marginTop: hp(32)}}>
            <CustomText.BodyMedium fontFamily={'Poppins-Medium'}>
              Set notification time
            </CustomText.BodyMedium>
            {schedules.map((item, index) => (
              <View style={styles.timeView}>
                <CustomText.BodyMedium color={colors.primary}>
                  {formatDate(item, 'hh:mm a')}
                </CustomText.BodyMedium>
              </View>
            ))}
            <TouchableOpacity style={styles.addTimeBtn} onPress={handleTime}>
              <Ionicons
                name={'notifications'}
                size={18}
                color={colors.primary}
              />
              <CustomText.BodyMedium color={colors.primary}>
                Add notification time
              </CustomText.BodyMedium>
            </TouchableOpacity>
            <CustomText.BodySmall
              fontFamily={'Poppins-Medium'}
              color={'red'}
              marginTop={8}>
              {scheduleError}
            </CustomText.BodySmall>
          </View>
        </Container>
      </KeyboardAwareScrollView>

      <View style={styles.btnContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={handleSubmit(handleAddPill)}>
          <CustomText.BodyMedium color={colors.white}>
            Add new medicine
          </CustomText.BodyMedium>
        </TouchableOpacity>
      </View>
      <BottomModal
        isVisible={showTimeModal}
        closeModal={() => setShowTimeModal(false)}>
        <Row marginHorizontal={wp(16)} marginVertical={hp(16)}>
          <TouchableOpacity onPress={() => setShowTimeModal(false)}>
            <CustomText.BodyMedium fontFamily={'Poppins-SemiBold'}>
              Cancel
            </CustomText.BodyMedium>
          </TouchableOpacity>
          <TouchableOpacity onPress={setTime}>
            <CustomText.BodyMedium fontFamily={'Poppins-SemiBold'}>
              Done
            </CustomText.BodyMedium>
          </TouchableOpacity>
        </Row>
        <DateTimePicker
          testID="dateTimePicker"
          value={tempDate}
          mode={'time'}
          display={'spinner'}
          textColor={'#000000'}
          is24Hour={false}
          onChange={onChange}
        />
      </BottomModal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  main: {
    flex: 1,
    // backgroundColor: colors.mainBg,
  },
  btnContainer: {paddingHorizontal: wp(16), paddingBottom: hp(12)},
  addTimeBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.secondaryLighter,
    gap: wp(12),
    marginTop: wp(16),
    paddingHorizontal: wp(12),
    paddingVertical: hp(18),
    borderRadius: wp(12),
  },
  timeView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.grey,
    gap: wp(12),
    marginTop: wp(16),
    paddingHorizontal: wp(12),
    paddingVertical: hp(18),
    borderRadius: wp(12),
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.primary,
    paddingHorizontal: wp(12),
    paddingVertical: hp(18),
    borderRadius: wp(12),
  },
});

export default AddPills;
