import React from 'react';
import MoonstoneDecorator from '@enact/moonstone/MoonstoneDecorator';
import spotlight from '@enact/spotlight';
import {Panel, Header} from '@enact/moonstone/Panels';
import {ToggleButton} from '@enact/moonstone/ToggleButton';

spotlight.setPointerMode(false);

class ToggleButtonSample extends React.Component {

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
				<Header title="ToggleButton" titleBelow="If you click the 'PLUS' button, that will be disabled. At that time, spotlight have to move to next ToggleButton." />
				<ToggleButton id="firstBtn" onClick={this.handleClick} disabled={this.state.disabled} toggleOnLabel="on" toggleOffLabel="off" />
				<ToggleButton id="secondBtn" toggleOnLabel="on" toggleOffLabel="off" />
				<ToggleButton toggleOnLabel="on" toggleOffLabel="off" />
			</Panel>
		);
	}
}

export default MoonstoneDecorator(ToggleButtonSample);
