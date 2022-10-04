import { createSlice } from '@reduxjs/toolkit';

export const motoGpRidersSlice = createSlice( {
    name: 'motoGpRiders',
    initialState: {
        motoGpRiders: []
    },
    reducers: {
        setMotoGpRiders: ( state, action ) => {
            state.motoGpRiders = [ ...action.payload ];
        }
    }
} );

export const { setMotoGpRiders } = motoGpRidersSlice.actions;
export default motoGpRidersSlice.reducer;