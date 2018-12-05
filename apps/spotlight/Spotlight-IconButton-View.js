import React from 'react';
import MoonstoneDecorator from '@enact/moonstone/MoonstoneDecorator';
import spotlight from '@enact/spotlight';
import {Panel, Header} from '@enact/moonstone/Panels';
import {IconButton} from '@enact/moonstone/IconButton';

spotlight.setPointerMode(false);

class IconButtonSample extends React.Component {

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
				<Header title="IconButton" titleBelow="If you click the 'PLUS' button, that will be disabled. At that time, spotlight have to move to next IconButton." />
				<IconButton id="firstBtn" onClick={this.handleClick} disabled={this.state.disabled}>{'plus'}</IconButton>
				<IconButton id="secondBtn">{'minus'}</IconButton>
				<IconButton>{'check'}</IconButton>
			</Panel>
		);
	}
}

export default MoonstoneDecorator(IconButtonSample);
