import Divider from '@enact/moonstone/Divider';
import Item from '@enact/moonstone/Item';
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
				<Header title="Item" />
				<Divider>Item</Divider>
				<Item id="item" >Item 1</Item>
				<Item id="item2" disabled={this.state.disabled} onClick={this.handleClick}>Item 2</Item>
			</Panel>
		);
	}
}

export default MoonstoneDecorator(ItemView);
