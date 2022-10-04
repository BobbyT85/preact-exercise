import {useEffect, useState} from "preact/hooks";
import { useDispatch } from 'react-redux';
import { setAllRiders } from "../../store/all-riders-slice";
import { setActiveRider } from "../../store/active-rider-slice";
import { setMotoERiders } from "../../store/motoE-riders-slice";
import { setMoto3Riders } from "../../store/moto3-riders-slice";
import { setMoto2Riders } from "../../store/moto2-riders-slice";
import { setMotoGpRiders } from "../../store/motogp-riders-slice";

const fetchRiders = () => {
    const url = 'http://localhost:8000/rider';
    const [ isPending, setIsPending ] = useState( true );
    const [ error, setError ] = useState( null );
    const dispatch = useDispatch();

    useEffect( () => {
        const abortController = new AbortController();

        fetch( url, { signal: abortController.signal } )
            .then( response => {
                if ( !response.ok ) {
                    throw Error( 'Could not fetch the data for that resource' );
                }
                return response.json();
            } )
            .then( ( data ) => {
                // Last rider in JSON has no team and has null category object
                // consts below were originally set from 'data' before being changed to 'filtered'
                const filtered = data.filter( rider => rider.current_career_step.category !== null );

                const motoE = filtered.filter( rider => rider.current_career_step.category.name === 'MotoE' );
                // console.log('motoE', motoE);
                const moto3 = filtered.filter( rider => rider.current_career_step.category.name === 'Moto3' || rider.current_career_step.category.name === '125cc' );
                // console.log('moto3', moto3);
                const moto2 = filtered.filter( rider => rider.current_career_step.category.name === 'Moto2' || rider.current_career_step.category.name === '250cc' );
                // console.log('moto2', moto2);
                const motoGp = filtered.filter( rider => rider.current_career_step.category.name === 'MotoGP' );
                // console.log('motogp', motoGp);

                // data.map( rider => console.log(rider.current_career_step.category.name));

                dispatch( setAllRiders( filtered ) );
                dispatch( setActiveRider( filtered[ 0 ] ) );
                dispatch( setMotoERiders( motoE ) );
                dispatch( setMoto3Riders( moto3 ) );
                dispatch( setMoto2Riders( moto2 ) );
                dispatch( setMotoGpRiders( motoGp ) );

                setIsPending( false );
                setError( null );
            } )
            .catch( error => {
                if ( error.name === 'AbortError') {
                    console.log('Fetch aborted');
                } else {
                    setError( error.message );
                    setIsPending( false );
                }
            } );


        return () => abortController.abort();
    }, [] );

    return { isPending, error };
}
 
export default fetchRiders;