import Divider from '@enact/moonstone/Divider';
import Picker from '@enact/moonstone/Picker';
import {Panel, Header} from '@enact/moonstone/Panels';
import React from 'react';
import MoonstoneDecorator from '@enact/moonstone/MoonstoneDecorator';
import spotlight from '@enact/spotlight';

spotlight.setPointerMode(false);

const airports = [
	'San Francisco Airport Terminal Gate 1',
	'Boston Airport Terminal Gate 2',
	'Tokyo Airport Terminal Gate 3'
];

const
	pickerSpanStyle = {
		display: 'inline-block',
		width: '30%',
		verticalAlign: 'top'
	};


class PickerView extends React.Component {
	render () {
		return (
			<Panel {...this.props}>
				<Header title="Picker" />
				<span style={pickerSpanStyle}>
					<Divider>Picker</Divider>
					<div>
						<Picker
							aria-label="defaultPicker"
							orientation="horizontal"
							width="medium"
						>
							{airports}
						</Picker>
					</div>

					<Divider>Joined Picker</Divider>
					<div>
						<Picker
							aria-label="joinedPicker"
							joined
							orientation="horizontal"
							width="medium"
						>
							{airports}
						</Picker>
					</div>
				</span>
			</Panel>
		);
	}
}

export default MoonstoneDecorator(PickerView);
