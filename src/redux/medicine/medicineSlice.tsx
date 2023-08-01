import {createSlice} from '@reduxjs/toolkit';
import {revertAll} from '../sharedAction';
import {Medicine} from './medicine';

interface initialStateType {
  medicine: Medicine[];
}

const initialState: initialStateType = {
  medicine: [],
};

export const medicineSlice = createSlice({
  name: 'medicine',
  initialState,
  extraReducers: builder => builder.addCase(revertAll, () => initialState),
  reducers: {
    setMedicine: (state, action) => {
      state.medicine = [...state.medicine, action.payload];
    },
  },
});

export const {setMedicine} = medicineSlice.actions;

export default medicineSlice.reducer;
