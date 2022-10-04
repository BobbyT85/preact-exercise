import { configureStore } from "@reduxjs/toolkit";
import activeRiderReducer from "./active-rider-slice";
import allRidersReducer from "./all-riders-slice";
import motoERidersReducer from "./motoE-riders-slice";
import moto3RidersReducer from "./moto3-riders-slice";
import moto2RidersReducer from "./moto2-riders-slice";
import motoGpRidersReducer from './motogp-riders-slice';

export const store = configureStore( {
    reducer: {
        activeRider: activeRiderReducer,
        allRiders: allRidersReducer,
        motoERiders: motoERidersReducer,
        moto3Riders: moto3RidersReducer,
        moto2Riders: moto2RidersReducer,
        motoGpRiders: motoGpRidersReducer
    }
} );