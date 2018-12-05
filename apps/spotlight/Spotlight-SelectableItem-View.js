import Divider from '@enact/moonstone/Divider';
import React from 'react';
import MoonstoneDecorator from '@enact/moonstone/MoonstoneDecorator';
import spotlight from '@enact/spotlight';
import {SelectableItem as SelectItemBase} from '@enact/moonstone/SelectableItem';
import Toggleable from '@enact/ui/Toggleable';
import {Panel, Header} from '@enact/moonstone/Panels';

spotlight.setPointerMode(false);

const SelectableItem = Toggleable({prop: 'selected'}, SelectItemBase);

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
				<Header title="SelectableItem" />
				<Divider>SelectableItem</Divider>
				<SelectableItem id="selectableItem">SelectableItem 1</SelectableItem>
				<SelectableItem id="selectableItem2" disabled={this.state.disabled} onClick={this.handleClick}>SelectableItem 2</SelectableItem>
			</Panel>
		);
	}
}
export default MoonstoneDecorator(ItemView);
