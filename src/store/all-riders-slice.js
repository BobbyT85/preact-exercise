import { createSlice } from '@reduxjs/toolkit';

export const allRidersSlice = createSlice( {
    name: 'allRiders',
    initialState: {
        allRiders: []
    },
    reducers: {
        setAllRiders: ( state, action ) => {
            state.allRiders = [ ...action.payload ];
        }
    }
} );

export const { setAllRiders } = allRidersSlice.actions;
export default allRidersSlice.reducer;