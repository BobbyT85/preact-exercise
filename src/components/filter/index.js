import style from './style.css';

const Filter = ( { filterObject, handleChange } ) => {
	console.log('filters', filterObject.metric)

	const riders = filterObject.riders;
	// const constructors = Array.from( new Set( riders.map( rider => rider.current_career_step.team.constructor.name ) ) ).sort();
	// const filteredRiders = Array.from( new Set( riders.map( rider => filterObject.metric ) ) ).sort();
	let filteredRiders = [];

	switch ( filterObject.metric ) {
		case 'constructors':
			filteredRiders = Array.from( new Set( riders.map( rider => rider.current_career_step.team.constructor.name ) ) ).sort();
			break;

		case 'countries':
			filteredRiders = Array.from( new Set( riders.map( rider => rider.country.name ) ) ).sort();
			break;

		default:

	} 
	// console.log('filter', 'constructors', constructors)

	// return (
	// 	<div className={ style.filter }>
	// 		<span>Filters</span>
	// 		<select class="filterSelect" onChange={ handleChange }>
	// 			<option value='All Constructors' selected>All Constructors</option>
	// 			{ constructors.map( ( factory ) => {
	// 				return (
	// 					<option value={ factory }>{ factory }</option>
	// 				)
	// 			} ) }
	// 		</select>
	// 	</div>
	// )

	return (
		<div className={ style.filter }>
			<span>Filters</span>
			<select class="filterSelect" onChange={ handleChange } data-filter-metric={ filterObject.metric }>
				<option value={ filterObject.defaultMetric } selected>{ filterObject.defaultMetric }</option>
				{ filteredRiders.map( ( result ) => {
					return (
						<option value={ result }>{ result }</option>
					)
				} ) }
			</select>
		</div>
	)
};

export default Filter;
