import { createSlice } from '@reduxjs/toolkit';

export const moto2RidersSlice = createSlice( {
    name: 'moto2Riders',
    initialState: {
        moto2Riders: []
    },
    reducers: {
        setMoto2Riders: ( state, action ) => {
            state.moto2Riders = [ ...action.payload ];
        }
    }
} );

export const { setMoto2Riders } = moto2RidersSlice.actions;
export default moto2RidersSlice.reducer;