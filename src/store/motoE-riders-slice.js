import { createSlice } from '@reduxjs/toolkit';

export const motoERidersSlice = createSlice( {
    name: 'motoERiders',
    initialState: {
        motoERiders: []
    },
    reducers: {
        setMotoERiders: ( state, action ) => {
            state.motoERiders = [ ...action.payload ];
        }
    }
} );

export const { setMotoERiders } = motoERidersSlice.actions;
export default motoERidersSlice.reducer;