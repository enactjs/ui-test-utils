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
		<DatePicker
			id="datePicker1"
			noneText="Nothing Selected"
			title="Date Picker Default"
		/>
		<DatePicker
			id="datePicker2"
			noneText="Nothing Selected"
			title="Date Picker Default Open"
			defaultOpen
		/>
		<DatePicker
			id="datePicker3"
			noneText="Nothing Selected"
			title="Date Picker Disabled"
			disabled
		/>
		<DatePicker
			id="datePicker4"
			noneText="Nothing Selected"
			title="Date Picker Disabled Open"
			defaultOpen
			disabled
		/>
	</div>
</div>;

export default MoonstoneDecorator(app);
