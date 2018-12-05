import React from 'react';
import MoonstoneDecorator from '@enact/moonstone/MoonstoneDecorator';
import spotlight from '@enact/spotlight';
import Spotlight from '@enact/spotlight';
import {Panels, Panel, Header} from '@enact/moonstone/Panels';
import Button from '@enact/moonstone/Button';

spotlight.setPointerMode(false);

class SpotlightDirection extends React.Component {
	spotlightHandler = (e) => {
		e.preventDefault();
		e.stopPropagation();
		Spotlight.focus('buttonA');
	}

	render () {
		return (
			<Panels>
				<Panel {...this.props}>
					<Header title="onSpotlightRight" />
					<Button id="A" spotlightId="buttonA">A</Button>
					<Button id="B">B</Button>
					<Button id="C" onSpotlightRight={this.spotlightHandler} onSpotlightDown={this.spotlightHandler}>C</Button>
				</Panel>
			</Panels>
		);
	}
}

export default MoonstoneDecorator(SpotlightDirection);
