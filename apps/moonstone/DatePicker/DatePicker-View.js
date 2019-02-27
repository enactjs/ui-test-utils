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
	</div>
</div>;

export default MoonstoneDecorator(app);
