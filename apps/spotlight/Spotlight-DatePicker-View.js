import DatePicker from '@enact/moonstone/DatePicker';
import Divider from '@enact/moonstone/Divider';
import React from 'react';
import MoonstoneDecorator from '@enact/moonstone/MoonstoneDecorator';
import spotlight from '@enact/spotlight';
import {Panel, Header} from '@enact/moonstone/Panels';

spotlight.setPointerMode(false);

class DatePickerView extends React.Component {
	render () {
		return (
			<Panel {...this.props}>
				<Header title="DatePicker" />
				<Divider>Default DatePicker</Divider>
				<DatePicker
					id="datePicker"
					noneText="none"
					title="Date Picker"
				/>
			</Panel>
		);
	}
}

export default MoonstoneDecorator(DatePickerView);
