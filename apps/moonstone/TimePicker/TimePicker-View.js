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
			defaultOpen
			noneText="Nothing Selected"
			title="Time Picker Default Open"
		/>
		<TimePicker
			id="timePickerWithValue"
			title="Time Picker With Value"
			value={new Date(2009, 5, 6)}
		/>
		<TimePicker
			id="timePickerNoLabels"
			noLabels
			title="Time Picker noLabels"
		/>
		<TimePicker
			id="timePickerDisabledWithNoneText"
			disabled
			noneText="Nothing Selected"
			title="Time Picker Disabled"
		/>
		<TimePicker
			id="timePickerDisabledOpenWithNoneText"
			defaultOpen
			disabled
			noneText="Nothing Selected"
			title="Time Picker Disabled Open"
		/>
	</div>
</div>;

export default MoonstoneDecorator(app);