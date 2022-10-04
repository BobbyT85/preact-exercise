import { Link } from 'preact-router/match';
import style from './style.css';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from "preact/hooks";

// import { setMotoERiders } from "../../store/motoE-riders-slice";
// import { setMoto3Riders } from "../../store/moto3-riders-slice";
// import { setMoto2Riders } from "../../store/moto2-riders-slice";
// import { setMotoGpRiders } from "../../store/motogp-riders-slice";
// import { setAllRiders } from "../../store/all-riders-slice";

import fetchRiders from '../../components/fetchRiders';
import { setActiveRider } from '../../store/active-rider-slice';
import RiderHero from '../../components/rider-hero';
import Sort from '../../components/sort';
import Filter from '../../components/filter';

const Riders = ( props ) => {
    const motoERiders = useSelector( ( state ) => state.motoERiders.motoERiders );
    const moto3Riders = useSelector( ( state ) => state.moto3Riders.moto3Riders );
    const moto2Riders = useSelector( ( state ) => state.moto2Riders.moto2Riders );
    const motoGpRiders = useSelector( ( state ) => state.motoGpRiders.motoGpRiders );
    const allRiders = useSelector( ( state ) => state.allRiders.allRiders );
    const activeRider = useSelector( ( state ) => state.activeRider.activeRider );

    const [ filteredRiders, setFilteredRiders ] = useState( [] );
    // const [ filteredConstructors, setFilteredConstructors ] = useState( [] );

    const [ sortState, setSortState ] = useState( '' );

    const dispatch = useDispatch();

    const defaultProfile = '../../assets/default-profile.png';

    const [ raceClass, setRaceClass ] = useState( '' );
    const [ raceClassRiders, setRaceClassRiders ] = useState( [] );

    // console.log('props', props)

    if ( allRiders.length === 0 ) {
        const { isPending, error } = fetchRiders();
    }

    useEffect( () => {
        const riders = [ ...filteredRiders ];

        switch ( sortState ) {
            case 'age':
                riders.sort((a, b) => a.years_old - b.years_old);
                break;

            case 'firstName':
                riders.sort( ( a, b ) => ( a.name.toUpperCase() > b.name.toUpperCase() ) ? 1 :
                    ( ( b.name.toUpperCase() > a.name.toUpperCase() ) ? -1 : 0 ) );
                break;

            case 'lastName':
                riders.sort( ( a, b ) => ( a.surname.toUpperCase() > b.surname.toUpperCase() ) ? 1 :
                    ( ( b.surname.toUpperCase() > a.surname.toUpperCase() ) ? -1 : 0 ) );
                break;

            case 'nationality':
                riders.sort( ( a, b ) => ( a.country.name.toUpperCase() > b.country.name.toUpperCase() ) ? 1 :
                    ( ( b.country.name.toUpperCase() > a.country.name.toUpperCase() ) ? -1 : 0 ) );
                break;

            case 'racingNumber':
                riders.sort((a, b) => a.current_career_step.number - b.current_career_step.number);
                break;
        }
        setFilteredRiders( riders );
    }, [ sortState ] );

    useEffect( () => {
        console.log('updating race class to', raceClass);
        console.log('props.raceClass', props.raceClass);

        setRaceClass( props.raceClass );

        resetFilters();

        setFilteredRiders( [] );
        setRaceClassRiders( [] );   

        setRiders();
    }, [ raceClass ] );

    setRaceClass( props.raceClass );

    const setRiders = () => {
        switch ( raceClass ) {
            case 'motogp':
                setFilteredRiders( motoGpRiders );
                setRaceClassRiders( motoGpRiders );                
                dispatch( setActiveRider( motoGpRiders[ 0 ] ) );
                break;
            
            case 'moto2':
                setFilteredRiders( moto2Riders );
                setRaceClassRiders( moto2Riders );   
                dispatch( setActiveRider( moto2Riders[ 0 ] ) );
                break;
    
            case 'moto3':
                setFilteredRiders( moto3Riders );
                setRaceClassRiders( moto3Riders );   
                dispatch( setActiveRider( moto3Riders[ 0 ] ) );
                break;
    
            case 'motoe':
                setFilteredRiders( motoERiders );
                setRaceClassRiders( motoERiders );   
                dispatch( setActiveRider( motoERiders[ 0 ] ) );
                break;
    
            default:
                setFilteredRiders( allRiders );
                setRaceClassRiders( allRiders );   
                dispatch( setActiveRider( allRiders[ 0 ] ) );
        }
    }

    const handleMouseOver = ( e ) => {
        const riderElement = e.target;
        const riderId = parseInt( riderElement.dataset.riderId );
        const selectedRider = filteredRiders.filter( rider => rider.legacy_id === riderId );

        dispatch( setActiveRider( selectedRider[ 0 ] ) );
    }
    
    const handleSortChange = ( e ) => {
        const sortValue = e.target.value;
        setSortState( sortValue );
    }
    
    const handleFilterChange = ( e ) => {
        const filterValue = e.target.value;
        const metric = e.target.dataset.filterMetric
        console.log(metric, filterValue)

        switch ( metric ) {
            case 'constructors':
                if ( filterValue === 'All Constructors' ) {
                    setFilteredRiders( raceClassRiders );
                    dispatch( setActiveRider( raceClassRiders[ 0 ] ) );
                } else {
                    const riders = raceClassRiders.filter( rider => rider.current_career_step.team.constructor.name === filterValue );
                    setFilteredRiders( riders );
                    dispatch( setActiveRider( riders[ 0 ] ) );
                }
                break;

            case 'countries':
                if ( filterValue === 'All Countries' ) {
                    setFilteredRiders( raceClassRiders );
                    dispatch( setActiveRider( raceClassRiders[ 0 ] ) );
                } else {
                    const riders = raceClassRiders.filter( rider => rider.country.name === filterValue );
                    setFilteredRiders( riders );
                    dispatch( setActiveRider( riders[ 0 ] ) );
                }
                break;
        }
    }

    const resetFilters = () => {
        const sortSelect = document.querySelector( '.sortSelect' );
        sortSelect.selectedIndex = 0;

        const filterSelect = document.querySelectorAll( '.filterSelect' );
        filterSelect.forEach( filter => filter.selectedIndex = 0 );

        setRiders();
    }

    return (
        <div class={ style.riders }>
            <div className={ style.hero }>

                {
                    activeRider &&
                    Object.keys( activeRider ).length !== 0 &&
                    <Link href={ `/rider/${ activeRider.legacy_id }` }>
                        <RiderHero rider={ activeRider } />
                    </Link>
                }
            </div>

            <div className={ style.rightPanel }>
                <div className={ style.filters }>
                    <Sort handleChange={ handleSortChange } />
                    <Filter 
                        riders={ raceClassRiders }
                        filterObject={ {
                            defaultMetric: 'All Constructors',
                            metric: 'constructors',
                            riders: raceClassRiders
                        } }
                        handleChange={ handleFilterChange }
                    />
                    <Filter 
                        riders={ raceClassRiders }
                        filterObject={ {
                            defaultMetric: 'All Countries',
                            metric: 'countries',
                            riders: raceClassRiders
                        } }
                        handleChange={ handleFilterChange }
                    />
                    <button className={ style.resetButton } onClick={ resetFilters }>Reset</button>
                </div>

                <div className={ style.container }>
                    { filteredRiders.map( ( rider ) => {
                        const teamName = ( rider.current_career_step.team ) ?
                            rider.current_career_step.team.name : '';
                        
                        // Bespoke check to see if the url is to an actual image or not
                        // const imageRider = rider.current_career_step.pictures.portrait.includes( '.jpg' ) ?
                        // rider.current_career_step.pictures.portrait : defaultProfile;
                        const imageRider = rider.current_career_step.pictures.portrait !== null ? rider.current_career_step.pictures.portrait : defaultProfile;
                        const imageRiderStyle = {
                            backgroundImage: `url(${ imageRider })`
                        }
                        
                        const imageNumber = rider.current_career_step.pictures.number;
                        const imageNumberStyle = {
                            backgroundImage: `url(${ imageNumber })`
                        }

                        return (
                            <Link 
                                className={ style.rider }
                                data-rider-id={ rider.legacy_id }
                                href={ `/rider/${ rider.legacy_id }` }
                                onMouseOver={ handleMouseOver }
                                style={ imageRiderStyle }>
                                <div className={ style.info }>
                                    <div className={ style.name }>
                                        <div className={ style.firstName }>{ rider.name }</div>
                                        <div className={ style.lastName }>{ rider.surname }</div>
                                    </div>
                                    { imageNumber && <div className={ style.number } style={ imageNumberStyle }></div> }
                                    { !imageNumber && <div className={ style.number }>{ rider.current_career_step.number }</div> }
                                    <div className={ style.bikeName }>{ teamName }</div>
                                </div>
                            </Link>
                        )
                    } ) }
                </div>
            </div>
        </div>
    );
}
 
export default Riders;