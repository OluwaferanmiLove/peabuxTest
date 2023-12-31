import React, {useRef, useState} from 'react';
import CustomText from '@components/CustomText';
import BottomModal, {BottomModalProps} from '@components/BottomModal';
// import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {hp, wp} from '@utils/responsive-dimension';
import {StyleSheet, TextInput, TouchableOpacity, View} from 'react-native';
// import moment from 'moment';
import {colors} from '@theme/colors';
import Input from './Input';
import Row from './Row';
import {Ionicons, MaterialCommunityIcons} from '@expo/vector-icons';
import {dateFromNow} from '@utils/helper';

interface DateModalProps extends Partial<BottomModalProps> {
  closeModal: () => void;
  selectedDate: string | null;
  onPressSave: (stared: boolean) => void;
  taskTitle: string | null;
  taskDescription: string | null;
}

const AddMedicineModal = ({
  closeModal,
  selectedDate,
  onPressSave,
  taskTitle,
  taskDescription,
  ...rest
}: DateModalProps) => {
  const [showAddDetails, setShowAddDetails] = useState(false);
  const [stared, setStared] = useState(false);

  const newTaskRef = useRef<TextInput>(null);

  const styles = StyleSheet.create({
    main: {
      paddingTop: hp(16),
      paddingHorizontal: wp(16),
      // paddingBottom: hp(bottom + 24),
      paddingBottom: hp(24),
    },
    datePill: {
      alignSelf: 'flex-start',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      paddingHorizontal: hp(12),
      paddingVertical: hp(6),
      marginTop: hp(20),
      borderWidth: wp(1),
      borderColor: colors?.secondary,
      backgroundColor: '#36373B',
      borderRadius: wp(20),
    },
  });

  const handleSave = () => {
    onPressSave(stared);
    setStared(false);
    setShowAddDetails(false);
  };

  return (
    <BottomModal
      {...rest}
      onModalShow={() => newTaskRef?.current?.focus()}
      closeModal={closeModal}>
      <View style={styles.main}>
        <Row marginTop={hp(32)}>
          <Row>
            <TouchableOpacity
              onPress={() => setShowAddDetails(true)}
              style={{marginRight: wp(24)}}>
              <MaterialCommunityIcons
                name="menu"
                size={wp(24)}
                color={colors?.primary}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={{marginRight: wp(24)}}
              onPress={closeModal}>
              <MaterialCommunityIcons
                name="calendar-check"
                size={wp(24)}
                color={colors?.primary}
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setStared(prev => !prev)}>
              <MaterialCommunityIcons
                name={stared ? 'star' : 'star-outline'}
                size={wp(24)}
                color={colors?.primary}
              />
            </TouchableOpacity>
          </Row>
          <TouchableOpacity onPress={handleSave}>
            <CustomText.BodySmall color={colors?.primary}>
              Save
            </CustomText.BodySmall>
          </TouchableOpacity>
        </Row>
      </View>
    </BottomModal>
  );
};

export default AddMedicineModal;
