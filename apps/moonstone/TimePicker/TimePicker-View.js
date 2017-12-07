import TimePicker from '@enact/moonstone/TimePicker';
import MoonstoneDecorator from '@enact/moonstone/MoonstoneDecorator';
import React from 'react';
import spotlight from '@enact/spotlight';

window.spotlight = spotlight;

// NOTE: Forcing pointer mode off so we can be sure that regardless of webOS pointer mode the app
// runs the same way
spotlight.setPointerMode(false);

const app = (props) => <div {...props}>
	<div>
		<TimePicker
			id="timePicker1"
			noneText="Nothing Selected"
			title="Time Picker Default"
		/>
		<TimePicker
			id="timePicker2"
			noneText="Nothing Selected"
			title="Time Picker Default Open"
			defaultOpen
		/>
		<TimePicker
			id="timePicker3"
			noneText="Nothing Selected"
			title="Time Picker Disabled"
			disabled
		/>
		<TimePicker
			id="timePicker4"
			noneText="Nothing Selected"
			title="Time Picker Disabled Open"
			defaultOpen
			disabled
		/>
	</div>
</div>;

export default MoonstoneDecorator(app);
