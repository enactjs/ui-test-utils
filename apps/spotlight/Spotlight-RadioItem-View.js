import Divider from '@enact/moonstone/Divider';
import {RadioItem as RadioItemBase} from '@enact/moonstone/RadioItem';
import React from 'react';
import MoonstoneDecorator from '@enact/moonstone/MoonstoneDecorator';
import spotlight from '@enact/spotlight';
import Toggleable from '@enact/ui/Toggleable';
import {Panel, Header} from '@enact/moonstone/Panels';

spotlight.setPointerMode(false);

const RadioItem = Toggleable({prop: 'selected'}, RadioItemBase);

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
				<Header title="RadioItem" />
				<Divider>Radio Item</Divider>
				<RadioItem id="radioItem">RadioItem 1</RadioItem>
				<RadioItem id="radioItem2" disabled={this.state.disabled} onClick={this.handleClick}>RadioItem 2</RadioItem>
			</Panel>
		);
	}
}

export default MoonstoneDecorator(ItemView);
