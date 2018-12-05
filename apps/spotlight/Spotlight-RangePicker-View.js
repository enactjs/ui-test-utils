import Divider from '@enact/moonstone/Divider';
import {Panel, Header} from '@enact/moonstone/Panels';
import RangePicker from '@enact/moonstone/RangePicker';
import React from 'react';
import MoonstoneDecorator from '@enact/moonstone/MoonstoneDecorator';
import spotlight from '@enact/spotlight';

spotlight.setPointerMode(false);

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
				<Header title="RagnePicker" />
				<span style={pickerSpanStyle}>
					<Divider>RangePicker</Divider>
					<div>
						<RangePicker
							aria-label="defaultPicker"
							defaultValue={0}
							max={100}
							min={0}
							orientation="horizontal"
							step={25}
							width="medium"
						/>
					</div>

					<Divider>Joined RangePicker</Divider>
					<div>
						<RangePicker
							aria-label="joinedPicker"
							defaultValue={0}
							joined
							max={100}
							min={0}
							orientation="horizontal"
							step={25}
							width="medium"
						/>
					</div>
				</span>
			</Panel>
		);
	}
}

export default MoonstoneDecorator(PickerView);
