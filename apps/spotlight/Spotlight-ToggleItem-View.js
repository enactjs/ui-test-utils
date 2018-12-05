import Divider from '@enact/moonstone/Divider';
import React from 'react';
import MoonstoneDecorator from '@enact/moonstone/MoonstoneDecorator';
import spotlight from '@enact/spotlight';
import Toggleable from '@enact/ui/Toggleable';
import {ToggleItem as ToggleItemBase} from '@enact/moonstone/ToggleItem';
import {Panel, Header} from '@enact/moonstone/Panels';

spotlight.setPointerMode(false);

const ToggleItem = Toggleable({prop: 'selected'}, ToggleItemBase);

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
				<Header title="ToggleItem" />
				<Divider>ToggleItem</Divider>
				<ToggleItem id="toggleItem">ToggleItem 1</ToggleItem>
				<ToggleItem id="toggleItem2" disabled={this.state.disabled} onClick={this.handleClick}>ToggleItem 2</ToggleItem>
			</Panel>
		);
	}
}

export default MoonstoneDecorator(ItemView);
