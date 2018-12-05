import DayPicker from '@enact/moonstone/DayPicker';
import Divider from '@enact/moonstone/Divider';
import React from 'react';
import MoonstoneDecorator from '@enact/moonstone/MoonstoneDecorator';
import spotlight from '@enact/spotlight';
import {Panel, Header} from '@enact/moonstone/Panels';

spotlight.setPointerMode(false);

class DayPickerView extends React.Component {
	render () {
		return (
			<Panel {...this.props}>
				<Header title="DayPicker" />
				<Divider>Default DayPickers</Divider>
				<DayPicker
					id="dayPicker"
					noneText="none"
					title="Day Picker"
				/>
			</Panel>
		);
	}
}

export default MoonstoneDecorator(DayPickerView);
