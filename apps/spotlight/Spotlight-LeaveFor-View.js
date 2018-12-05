import React from 'react';
import MoonstoneDecorator from '@enact/moonstone/MoonstoneDecorator';
import spotlight from '@enact/spotlight';
import Button from '@enact/moonstone/Button';
import {Panel, Header} from '@enact/moonstone/Panels';
import {SpotlightContainerDecorator} from '@enact/spotlight/SpotlightContainerDecorator';
import Divider from '@enact/moonstone/Divider';

spotlight.setPointerMode(false);

const Container = SpotlightContainerDecorator('div');

const ControlsContainer = SpotlightContainerDecorator(
	{
		leaveFor: {down:''}
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
					<Button>AAA</Button>
				</ControlsContainer>
				<Container>
					<Divider>Container B</Divider>
					<Button>B</Button>
					<Button>BB</Button>
					<Button>BBB</Button>
				</Container>
			</Panel>
		);
	}
}
export default MoonstoneDecorator(CustomPanel);
