import Button from '@enact/moonstone/Button';
import Notification from '@enact/moonstone/Notification';
import React from 'react';
import MoonstoneDecorator from '@enact/moonstone/MoonstoneDecorator';
import spotlight from '@enact/spotlight';
import {Panel, Header} from '@enact/moonstone/Panels';

spotlight.setPointerMode(false);

class NotificationView extends React.Component {
	constructor (props) {
		super(props);
		this.state = {
			open: false
		};
	}

	handleClick = () => {
		this.setState({
			open: !this.state.open
		});
	}

	render () {
		return (
			<Panel {...this.props}>
				<Header title="Notification" />
				<Button id="openBtn" onClick={this.handleClick}>Notification</Button>
				<Notification open={this.state.open}>
					<div>You&#39;ve been watching TV for a very long time so let&#39;s do a quick check-in.</div>
					<div>This TV has been active for 10 hours.</div>
					<span>Perhaps it is time to take a break and get some fresh air. There is a nice coffee shop around the corner</span>
					<buttons>
						<Button id="firstBtn" onClick={this.handleClick}>Go Get A Coffee</Button>
						<Button id="secondBtn" onClick={this.handleClick}>Keep Watching TV</Button>
					</buttons>
				</Notification>
			</Panel>
		);
	}
}

export default MoonstoneDecorator(NotificationView);
