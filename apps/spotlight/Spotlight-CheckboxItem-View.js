import {CheckboxItem as CheckboxItemBase} from '@enact/moonstone/CheckboxItem';
import Divider from '@enact/moonstone/Divider';
import React from 'react';
import MoonstoneDecorator from '@enact/moonstone/MoonstoneDecorator';
import spotlight from '@enact/spotlight';
import Toggleable from '@enact/ui/Toggleable';
import {Panel, Header} from '@enact/moonstone/Panels';

spotlight.setPointerMode(false);
const CheckboxItem = Toggleable({prop: 'selected'}, CheckboxItemBase);

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
				<Header title="CheckboxItem" />
				<Divider>Checkbox Item</Divider>
				<CheckboxItem id="checkboxItem">Checkbox item 1</CheckboxItem>
				<CheckboxItem id="checkboxItem2" disabled={this.state.disabled} onClick={this.handleClick}>Checkbox item 2</CheckboxItem>
			</Panel>
		);
	}
}

export default MoonstoneDecorator(ItemView);
