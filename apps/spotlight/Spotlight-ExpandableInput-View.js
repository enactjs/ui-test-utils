import Divider from '@enact/moonstone/Divider';
import ExpandableInput from '@enact/moonstone/ExpandableInput';
import React from 'react';
import MoonstoneDecorator from '@enact/moonstone/MoonstoneDecorator';
import spotlight from '@enact/spotlight';
import {Panel, Header} from '@enact/moonstone/Panels';
import Button from '@enact/moonstone/Button';

spotlight.setPointerMode(false);

class InputView extends React.Component {

	render () {
		return (
			<Panel {...this.props}>
				<Header title="ExpandableInput" />
				<Divider>Expandable Input</Divider>
				<ExpandableInput id="expandableInput" title="Input with noneText" noneText="Nothing inputted" />
				<Button id="btn">button</Button>
			</Panel>
		);
	}
}

export default MoonstoneDecorator(InputView);
