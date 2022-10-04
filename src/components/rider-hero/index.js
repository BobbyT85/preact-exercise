import style from './style.css';
import '../../../node_modules/flag-icons/css/flag-icons.min.css';

const RiderHero = ( { rider } ) => {
    const defaultRider = '../../assets/default-rider.png';

    const imageRider = rider.current_career_step.pictures.profile.main || defaultRider;
    const imageRiderStyle = {
        backgroundImage: `url(${ imageRider })`
    }

    const teamName = ( rider.current_career_step.team ) ?
                        rider.current_career_step.team.name : '';
                        
    const imageNumber = rider.current_career_step.pictures.number;
    const imageNumberStyle = {
        backgroundImage: `url(${ imageNumber })`
    }

    return (
        <div className={ style.heroRider } style={ imageRiderStyle }>
        { imageNumber && <div className={ style.number } style={ imageNumberStyle }></div> }
        { !imageNumber && <div className={ style.heroNumber}>{ rider.current_career_step.number }</div> }
            <div className={ style.heroInfo }>
                {/* { imageNumber && <div className={ style.number } style={ imageNumberStyle }></div> }
                { !imageNumber && <div className={ style.heroNumber}>{ rider.current_career_step.number }</div> } */}
                <div className={ `${ style.flag } fi fi-${ rider.country.iso.toLowerCase() }` }></div>
                <div className={ style.heroAge }>{ rider.years_old }</div>
                <div className={ style.heroName }>{ rider.name }</div>
                <div className={ style.heroSurname }>{ rider.surname }</div>
                <div className={ style.heroNickname}>{ rider.current_career_step.short_nickname }</div>
                <div className={ style.heroClass }>{ rider.current_career_step.category.name }</div>
                <div className={ style.heroBikeName }>{ teamName }</div>
            </div>
        </div>
    );
}
 
export default RiderHero;