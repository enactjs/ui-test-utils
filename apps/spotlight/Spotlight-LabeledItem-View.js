import Divider from '@enact/moonstone/Divider';
import LabeledItem from '@enact/moonstone/LabeledItem';
import React from 'react';
import MoonstoneDecorator from '@enact/moonstone/MoonstoneDecorator';
import spotlight from '@enact/spotlight';
import {Panel, Header} from '@enact/moonstone/Panels';

spotlight.setPointerMode(false);

class ItemView extends React.Component {
	constructor (props) {
		super(props);
		this.state = {
			disabled: false
		};
	}

	handleClick = () => {
		this.setState({
			disabled: true
		});
	}

	render () {
		return (
			<Panel {...this.props}>
				<Header title="LabeledItem" />
				<Divider>LabeledItem</Divider>
				<LabeledItem id="labeledItem" label="label" >LabeledItem 1</LabeledItem>
				<LabeledItem id="labeledItem2" label="label" disabled={this.state.disabled} onClick={this.handleClick}>LabeledItem 2</LabeledItem>
			</Panel>
		);
	}
}

export default MoonstoneDecorator(ItemView);
