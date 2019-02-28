import DatePicker from '@enact/moonstone/DatePicker';
import MoonstoneDecorator from '@enact/moonstone/MoonstoneDecorator';
import React from 'react';
import spotlight from '@enact/spotlight';

// NOTE: Forcing pointer mode off so we can be sure that regardless of webOS pointer mode the app
// runs the same way
spotlight.setPointerMode(false);

const app = (props) => <div {...props}>
	<div>
		<DatePicker
			id="datePickerDefaultClosedWithoutNoneText"
			title="Date Picker Default"
		/>
		<DatePicker
			id="datePickerDefaultClosedWithNoneText"
			noneText="Nothing Selected"
			title="Date Picker Default With noneText"
		/>
		<DatePicker
			id="datePickerDefaultOpenWithNoneText"
			noneText="Nothing Selected"
			title="Date Picker Default Open"
			defaultOpen
		/>
		<DatePicker
			id="datePickerWithDefaultValue"
			defaultValue={new Date(2009, 5, 6)}
			title="Date Picker With Default Value"
		/>
		<DatePicker
			id="datePickerNoLabels"
			title="Date Picker noLabels"
			noLabels
		/>
		<DatePicker
			id="datePickerDisabledWithNoneText"
			noneText="Nothing Selected"
			title="Date Picker Disabled"
			disabled
		/>
		<DatePicker
			id="datePickerDisabledOpenWithNoneText"
			noneText="Nothing Selected"
			title="Date Picker Disabled Open"
			defaultOpen
			disabled
		/>
		<DatePicker
			id="datePickerDisabledOpenWithDefaultValue"
			defaultValue={new Date(2009, 5, 6)}
			noneText="Nothing Selected"
			title="Time Picker Disabled Open With Default Value"
		/>
		<DatePicker
			id="datePickerDisabledWithDefaultValue"
			defaultValue={new Date(2009, 5, 6)}
			noneText="Nothing Selected"
			title="Time Picker Disabled With Default Value"
		/>
		<DatePicker
			id="datePickerDefaultOpenWithDefaultValue"
			defaultOpen
			defaultValue={new Date(2009, 5, 6)}
			noneText="Nothing Selected"
			title="Time Picker Default Open With Default Value"
		/>
	</div>
</div>;

export default MoonstoneDecorator(app);
