import DatePicker from '@enact/moonstone/DatePicker';
import MoonstoneDecorator from '@enact/moonstone/MoonstoneDecorator';
import React from 'react';
import spotlight from '@enact/spotlight';

window.spotlight = spotlight;

// NOTE: Forcing pointer mode off so we can be sure that regardless of webOS pointer mode the app
// runs the same way
spotlight.setPointerMode(false);

const app = (props) => <div {...props}>
	<div>
		<div>
			<DatePicker
				id="picker1"
				defaultValue={new Date()}
			/>
			{/*<DatePicker*/}
				{/*id="picker2"*/}
			{/*/>*/}
		</div>
	</div>
</div>;

export default MoonstoneDecorator(app);
