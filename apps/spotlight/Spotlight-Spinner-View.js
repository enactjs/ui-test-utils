import React from 'react';
import MoonstoneDecorator from '@enact/moonstone/MoonstoneDecorator';
import spotlight from '@enact/spotlight';
import {Panel, Header} from '@enact/moonstone/Panels';
import {Spinner} from '@enact/moonstone/Spinner';
import {Button} from '@enact/moonstone/Button';

spotlight.setPointerMode(false);

class SpinnerSample extends React.Component {
	constructor (props) {
		super(props);
		this.state = {
			loading: false
		};
	}

	showSpinner = () => {
		setTimeout(() => {
			this.setState({
				loading: false
			});
		}, 5000);
		this.setState({
			loading: true
		});
	}

	render () {
		return (
			<Panel {...this.props}>
				<Header title="Spinner" />
				<Button id="showSpinnerBtn" onClick={this.showSpinner}>Show loading</Button>
				{this.state.loading && <Spinner id="spinner" centered scrim transparent blockClickOn={'screen'} />}
			</Panel>
		);
	}
}

export default MoonstoneDecorator(SpinnerSample);
