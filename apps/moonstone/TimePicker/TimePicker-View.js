import TimePicker from '@enact/moonstone/TimePicker';
import MoonstoneDecorator from '@enact/moonstone/MoonstoneDecorator';
import React from 'react';
import spotlight from '@enact/spotlight';

// NOTE: Forcing pointer mode off so we can be sure that regardless of webOS pointer mode the app
// runs the same way
spotlight.setPointerMode(false);

const app = (props) => <div {...props}>
	<div>
		<TimePicker
			id="timePickerDefaultClosedWithoutNoneText"
			title="Time Picker Default"
		/>
		<TimePicker
			id="timePickerDefaultClosedWithNoneText"
			noneText="Nothing Selected"
			title="Time Picker Default With noneText"
		/>
		<TimePicker
			id="timePickerDefaultOpenWithNoneText"
			noneText="Nothing Selected"
			title="Time Picker Default Open"
			defaultOpen
		/>
		<TimePicker
			id="timePickerNoLabels"
			title="Time Picker noLabels"
			noLabels
		/>
		<TimePicker
			id="timePickerDisabledWithNoneText"
			noneText="Nothing Selected"
			title="Time Picker Disabled"
			disabled
		/>
		<TimePicker
			id="timePickerDisabledOpenWithNoneText"
			noneText="Nothing Selected"
			title="Time Picker Disabled Open"
			defaultOpen
			disabled
		/>
	</div>
</div>;

export default MoonstoneDecorator(app);
