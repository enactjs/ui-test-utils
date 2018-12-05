import Button from '@enact/moonstone/Button';
import Dialog from '@enact/moonstone/Dialog';
import React from 'react';
import MoonstoneDecorator from '@enact/moonstone/MoonstoneDecorator';
import spotlight from '@enact/spotlight';
import {Panel, Header} from '@enact/moonstone/Panels';
import Input from '@enact/moonstone/Input';

spotlight.setPointerMode(false);

class DialogView extends React.Component {
	constructor (props) {
		super(props);
		this.state = {
			open: false,
			open2: false
		};
	}

	handleClick = (e) => {
		const _id = e.target.textContent;
		switch (_id) {
			case 'DIALOG':
				this.setState({open: true});
				break;
			case 'INPUT DIALOG':
				this.setState({open2: true});
				break;
			default:
				this.setState({open: false, open2: false});
				break;
		}
	}

	render () {
		const {open, open2} = this.state;
		return (
			<Panel {...this.props}>
				<Header title="Dialog" />
				<Button id="openBtn" onClick={this.handleClick}>Dialog</Button>
				<Button id="inputBtn" onClick={this.handleClick}>Input Dialog</Button>
				<Dialog open={open}>
					<title>You&#39;ve been watching TV for a very long time so let&#39;s do a quick check-in.</title>
					<titleBelow>This TV has been active for 10 hours.</titleBelow>
					<span>Perhaps it is time to take a break and get some fresh air. There is a nice coffee shop around the corner</span>
					<buttons>
						<Button id="firstBtn" onClick={this.handleClick}>Go Get A Coffee</Button>
						<Button id="secondBtn" onClick={this.handleClick}>Keep Watching TV</Button>
					</buttons>
				</Dialog>
				<Dialog open={open2}>
					<titleBelow>This is Input</titleBelow>
					<Input id="dialogInput" />
					<buttons>
						<Button id="closeBtn" onClick={this.handleClick}>close</Button>
					</buttons>
				</Dialog>
			</Panel>
		);
	}
}

export default MoonstoneDecorator(DialogView);
