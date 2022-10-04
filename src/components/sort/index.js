import { h } from 'preact';
import style from './style.css';

const Sort = ( { handleChange } ) => {
	// console.log(handleChange)

	return (
		<div className={ style.sort }>
			<span>Sort</span>
			<select className="sortSelect" onChange={ handleChange }>
			{/* <select className={ style.sortSelect } > */}
				<option value='' disabled selected>Sort...</option>
				<option value='age'>Age</option>
				<option value='firstName'>First Name</option>
				<option value='lastName'>Last Name</option>
				<option value='nationality'>Nationality</option>
				<option value='racingNumber'>Racing Number</option>
			</select>
		</div>
	)
};

export default Sort;
