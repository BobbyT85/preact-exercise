import { createSlice } from '@reduxjs/toolkit';

export const moto3RidersSlice = createSlice( {
    name: 'moto3Riders',
    initialState: {
        moto3Riders: []
    },
    reducers: {
        setMoto3Riders: ( state, action ) => {
            state.moto3Riders = [ ...action.payload ];
        }
    }
} );

export const { setMoto3Riders } = moto3RidersSlice.actions;
export default moto3RidersSlice.reducer;