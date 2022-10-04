import { useState, useEffect } from "preact/hooks";
import style from './style.css';
import { useSelector } from 'react-redux';
import fetchRiders from "../../components/fetchRiders";

const Rider = ( props ) => {
    // console.log('props', props);

    const riderId = parseInt( props.id );
    const allRiders = useSelector( ( state ) => state.allRiders.allRiders );
    const [ rider, setRider ] = useState( {} );

    if ( allRiders.length === 0 ) {
        const { isPending, error } = fetchRiders();
    }

    useEffect( () => {
        const selectedRider = allRiders.filter( rider => rider.legacy_id === riderId );
        setRider( selectedRider[ 0 ] );
    // Watch any changes to riders state so it knows when to update
    }, [] );

    return (
        <div class={ style.rider }>
            <h2>Rider data</h2>

            {/* { rider && console.log( 'rider', rider ) } */}
            {
                rider &&
                rider.current_career_step &&
                    <div className="rider-info">
                    <div className="name">{ rider.name } { rider.surname }</div>
                    <div className="number">{ rider.current_career_step.number }</div>
                    <div className="manufacturer">{ rider.current_career_step.team.name }</div>
                </div>
            }
        </div>
    );
}
 
export default Rider;