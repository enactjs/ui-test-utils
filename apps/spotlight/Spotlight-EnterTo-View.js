import React from 'react';
import MoonstoneDecorator from '@enact/moonstone/MoonstoneDecorator';
import spotlight from '@enact/spotlight';
import Button from '@enact/moonstone/Button';
import {Panel, Header} from '@enact/moonstone/Panels';
import {SpotlightContainerDecorator} from '@enact/spotlight/SpotlightContainerDecorator';
import Divider from '@enact/moonstone/Divider';

spotlight.setPointerMode(false);

const ControlsContainer = SpotlightContainerDecorator(
	{
		enterTo: 'last-focused'
	},
	'div'
);

class CustomPanel extends React.Component {
	render () {
		return (
			<Panel {...this.props}>
				<Header title="Spotlight Sample" />
				<ControlsContainer>
					<Divider>Container A</Divider>
					<Button id="A">A</Button>
					<Button id="AA">AA</Button>
					<Button id="AAA">AAA</Button>
				</ControlsContainer>
				<ControlsContainer>
					<Divider>Container B</Divider>
					<Button id="B">B</Button>
					<Button id="BB">BB</Button>
					<Button id="BBB">BBB</Button>
				</ControlsContainer>
			</Panel>
		);
	}
}
export default MoonstoneDecorator(CustomPanel);
