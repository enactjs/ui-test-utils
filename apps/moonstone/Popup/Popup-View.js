import Button from '@enact/moonstone/Button';
import Popup from '@enact/moonstone/Popup';
import MoonstoneDecorator from '@enact/moonstone/MoonstoneDecorator';
import React, {Component} from 'react';
import spotlight from '@enact/spotlight';
import SpotlightContainerDecorator from '@enact/spotlight/SpotlightContainerDecorator';

const Container = SpotlightContainerDecorator('div');

spotlight.setPointerMode(false);

class app extends Component {

	constructor (props) {
		super (props);
		this.state = {
			open: false
		};

		this.clickHandler = this.clickHandler.bind(this);
		this.closeHandler = this.closeHandler.bind(this);
	}

	clickHandler () {
		this.setState({open: true});
	}

	closeHandler () {
		this.setState({open: false});
	}

	render () {
		return (
			<div {...this.props}>
				<p>
					The contents of the popup below should contain the only controls that can be
					navigated to using 5-way. This is because the popup is using a `spotlightRestrict`
					value of `self-only`. If the value changes to `self-first`, the other panel controls
					can receive focus, but priority will be given to controls within the popup first. If
					the value changes to `none`, there is no priority.
				</p>
				<Button id="ButtonPopup" onClick={this.clickHandler}>Button</Button>
				<Popup
					id="PopupMain"
					open={this.state.open}
					noAnimation={false}
					noAutoDismiss={false}
					showCloseButton
					spotlightRestrict="self-only"
					onClose={this.closeHandler}
				>
					<div>Hello Popup</div>
					<br />
					<Container>
						<Button id="ButtonOK" onClick={this.closeHandler}>OK</Button>
						<Button id="ButtonCancel" onClick={this.closeHandler}>Cancel</Button>
					</Container>
				</Popup>
			</div>
		);
	}
}

export default MoonstoneDecorator(app);
