import Divider from '@enact/moonstone/Divider';
import ExpandablePicker from '@enact/moonstone/ExpandablePicker';
import React from 'react';
import MoonstoneDecorator from '@enact/moonstone/MoonstoneDecorator';
import spotlight from '@enact/spotlight';
import {Panel, Header} from '@enact/moonstone/Panels';

spotlight.setPointerMode(false);

const alphabets = ['A', 'B', 'C'];

const
	expandableSpanStyle = {
		display: 'inline-block',
		width: '40%',
		verticalAlign: 'top'
	};

class ExpandablePickerView extends React.Component {
	render () {
		return (
			<Panel {...this.props}>
				<Header title="ExpandablePicker" />
				<span style={expandableSpanStyle}>
					<Divider>ExpandablePicker</Divider>
					<ExpandablePicker
						id="expandablePicker"
						aria-label="defaultPicker"
						title="Favorite Emoji"
						width="medium"
					>
						{alphabets}
					</ExpandablePicker>
				</span>
			</Panel>
		);
	}
}

export default MoonstoneDecorator(ExpandablePickerView);
