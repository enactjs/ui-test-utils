import TimePicker from '@enact/moonstone/TimePicker';
import Divider from '@enact/moonstone/Divider';
import React from 'react';
import MoonstoneDecorator from '@enact/moonstone/MoonstoneDecorator';
import spotlight from '@enact/spotlight';
import {Panel, Header} from '@enact/moonstone/Panels';

spotlight.setPointerMode(false);

class TimePickerView extends React.Component {
	render () {
		return (
			<Panel {...this.props}>
				<Header title="DatePicker" />
				<Divider>Default TimePicker</Divider>
				<TimePicker
					id="timePicker"
					noneText="none"
					title="Time Picker"
				/>
			</Panel>
		);
	}
}
export default MoonstoneDecorator(TimePickerView);
