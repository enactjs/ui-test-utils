import React from 'react';
import MoonstoneDecorator from '@enact/moonstone/MoonstoneDecorator';
import spotlight from '@enact/spotlight';
import {Panels, Panel, Header} from '@enact/moonstone/Panels';
import Button from '@enact/moonstone/Button';

spotlight.setPointerMode(false);

class SpotlightDisappear extends React.Component {
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
			<Panels {...this.props}>
				<Panel>
					<Header title="Spotlight Disappear">
						<Button id="A" disabled={this.state.disabled} onClick={this.handleClick}>A</Button>
					</Header>
				</Panel>
			</Panels>
		);
	}
}

export default MoonstoneDecorator(SpotlightDisappear);
