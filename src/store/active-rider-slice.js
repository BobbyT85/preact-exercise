import { createSlice } from '@reduxjs/toolkit';

export const activeRiderSlice = createSlice( {
    name: 'activeRider',
    initialState: {
        activeRider: {}
    },
    reducers: {
        setActiveRider: ( state, action ) => {
            state.activeRider = action.payload;
        }
    }
} );

export const { setActiveRider } = activeRiderSlice.actions;
export default activeRiderSlice.reducer;