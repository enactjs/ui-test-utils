import Button from '@enact/moonstone/Button';
import Divider from '@enact/moonstone/Divider';
import Popup from '@enact/moonstone/Popup';
import React from 'react';
import MoonstoneDecorator from '@enact/moonstone/MoonstoneDecorator';
import spotlight from '@enact/spotlight';
import {Panel, Header} from '@enact/moonstone/Panels';

spotlight.setPointerMode(false);

class PopupView extends React.Component {
	constructor (props) {
		super(props);
		this.state = {
			open: false,
			config: 'self-only'
		};
	}

	handleOpen = () => {
		this.setState({
			open: true
		});
	}

	handleClose = () => {
		this.setState({
			open: false
		});
	}

	handleRestrict = () => {
		this.setState({
			config: 'self-first'
		});
	}

	render () {
		const {open} = this.state;

		return (
			<Panel {...this.props}>
				<Header title="Popup" />
				<Button id="openBtn" onClick={this.handleOpen}>Button In Popup</Button>
				<Popup
					open={open}
					onClose={this.handleClose}
					spotlightRestrict={this.state.config}
				>
					<Divider>Buttons In Popup Example</Divider>
					<Button id="firstBtn" onClick={this.handleRestrict}>Hello</Button>
					<Button id="secondBtn" onClick={this.handleClose}>Goodbye</Button>
				</Popup>
			</Panel>
		);
	}
}

export default MoonstoneDecorator(PopupView);
