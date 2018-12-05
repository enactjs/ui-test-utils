import Divider from '@enact/moonstone/Divider';
import React from 'react';
import MoonstoneDecorator from '@enact/moonstone/MoonstoneDecorator';
import spotlight from '@enact/spotlight';
import {SwitchItem as SwitchItemBase} from '@enact/moonstone/SwitchItem';
import Toggleable from '@enact/ui/Toggleable';
import {Panel, Header} from '@enact/moonstone/Panels';

spotlight.setPointerMode(false);

const SwitchItem = Toggleable({prop: 'selected'}, SwitchItemBase);

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
				<Header title="SwitchItem" />
				<Divider>SwitchItem</Divider>
				<SwitchItem id="switchItem">SwitchItem 1</SwitchItem>
				<SwitchItem id="switchItem2" disabled={this.state.disabled} onClick={this.handleClick}>SwitchItem 2</SwitchItem>
			</Panel>
		);
	}
}
export default MoonstoneDecorator(ItemView);
