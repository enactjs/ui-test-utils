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
		super(props);
		this.state = {
			open1: false,
			open2: false,
			open3: false,
			open4: false
		};

		this.clickHandler1 = this.clickHandler1.bind(this);
		this.closeHandler1 = this.closeHandler1.bind(this);
		this.clickHandler2 = this.clickHandler2.bind(this);
		this.closeHandler2 = this.closeHandler2.bind(this);
		this.clickHandler3 = this.clickHandler3.bind(this);
		this.closeHandler3 = this.closeHandler3.bind(this);
		this.clickHandler4 = this.clickHandler4.bind(this);
		this.closeHandler4 = this.closeHandler4.bind(this);
	}

	clickHandler1 () {
		this.setState({open1: true});
	}

	closeHandler1 () {
		this.setState({open1: false});
	}

	clickHandler2 () {
		this.setState({open2: true});
	}

	closeHandler2 () {
		this.setState({open2: false});
	}

	clickHandler3 () {
		this.setState({open3: true});
	}

	closeHandler3 () {
		this.setState({open3: false});
	}

	clickHandler4 () {
		this.setState({open4: true});
	}

	closeHandler4 () {
		this.setState({open4: false});
	}

	render () {
		return  (
			<div id="popupMain" {...this.props}>
				<p>
					The containers below will spot the last-focused element. Keep track of the
					last-focused element in the container when testing and ensure that the correct
					element is spotted when re-entering the container with 5-way. If the pointer is
					inside a container and a 5-way directional key is pressed, the nearest element
					to the pointer (in the direction specified by the key) will be spotted.
				</p>
				<Button id="buttonPopup1" onClick={this.clickHandler1}>Button</Button>
				<Button id="buttonPopup2" onClick={this.clickHandler2}>Button</Button>
				<Button id="buttonPopup3" onClick={this.clickHandler3}>Button</Button>
				<Button id="buttonPopup4" onClick={this.clickHandler4}>Button</Button>
				<Popup
					id="popup1"
					open={this.state.open1}
					noAnimation={false}
					noAutoDismiss={false}
					showCloseButton
					spotlightRestrict="self-only"
					onClose={this.closeHandler1}
				>
					<div>Hello Popup1</div>
					<br />
					<Container>
						<Button id="buttonOK" onClick={this.closeHandler1}>OK</Button>
						<Button id="buttonCancel" onClick={this.closeHandler1}>Cancel</Button>
					</Container>
				</Popup>
				<Popup
					id="popup2"
					open={this.state.open2}
					noAnimation={false}
					noAutoDismiss
					showCloseButton
					spotlightRestrict="self-only"
					onClose={this.closeHandler2}
				>
					<div>Hello Popup2</div>
					<br />
					<Container>
						<Button id="buttonOK" onClick={this.closeHandler2}>OK</Button>
						<Button id="buttonCancel" onClick={this.closeHandler2}>Cancel</Button>
					</Container>
				</Popup>
				<Popup
					id="popup3"
					open={this.state.open3}
					noAnimation={false}
					noAutoDismiss={false}
					showCloseButton={false}
					spotlightRestrict="self-only"
					onClose={this.closeHandler3}
				>
					<div>Hello Popup3</div>
					<br />
					<Container>
						<Button id="buttonOK" onClick={this.closeHandler3}>OK</Button>
						<Button id="buttonCancel" onClick={this.closeHandler3}>Cancel</Button>
					</Container>
				</Popup>
				<Popup
					id="popup4"
					open={this.state.open4}
					noAnimation={false}
					noAutoDismiss={false}
					showCloseButton
					spotlightRestrict="none"
					onClose={this.closeHandler4}
				>
					<div>Hello Popup4</div>
					<br />
					<Container>
						<Button id="buttonOK" onClick={this.closeHandler4}>OK</Button>
						<Button id="buttonCancel" onClick={this.closeHandler4}>Cancel</Button>
					</Container>
				</Popup>
			</div>
		);
	}
}
export default MoonstoneDecorator(app);
