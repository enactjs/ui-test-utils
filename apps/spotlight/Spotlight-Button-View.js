import React from 'react';
import MoonstoneDecorator from '@enact/moonstone/MoonstoneDecorator';
import spotlight from '@enact/spotlight';
import {Panel, Header} from '@enact/moonstone/Panels';
import {Button} from '@enact/moonstone/Button';

spotlight.setPointerMode(false);

class ButtonSample extends React.Component {

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
				<Header title="Button" titleBelow="If you click the 'BUTTON 1', that will be disabled. At that time, spotlight have to move to next button." />
				<Button id="firstBtn" onClick={this.handleClick} disabled={this.state.disabled}>{'button 1'}</Button>
				<Button id="secondBtn">{'button 2'}</Button>
				<Button>{'button 3'}</Button>
			</Panel>
		);
	}
}

export default MoonstoneDecorator(ButtonSample);
