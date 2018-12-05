import React from 'react';
import MoonstoneDecorator from '@enact/moonstone/MoonstoneDecorator';
import spotlight from '@enact/spotlight';
import {Panels, Panel, Header} from '@enact/moonstone/Panels';
import {SpotlightContainerDecorator} from '@enact/spotlight/SpotlightContainerDecorator';
import Item from '@enact/moonstone/Item';

spotlight.setPointerMode(false);

const Container = SpotlightContainerDecorator('div');

const style = {
	container: {
		width: '300px',
		border: '1px dashed red',
		margin: '0 12px',
		padding: '12px'
	},
	fittedContainer: {
		border: '1px dashed blue',
		margin: '0 12px',
		padding: '12px'
	},
	flexBox: {
		display: 'flex'
	},
	flexItem: {
		flex: '1'
	}
};

class CustomPanel extends React.Component {
	constructor (props) {
		super(props);
	}

	handleClick () {
		spotlight.setPointerMode(true);
	}

	render () {
		return (
			<Panels {...this.props}>
				<Panel>
					<Header title="Spotlight-Multiple containers" />
					<div>
						<p>
							The containers below will spot the last-focused element. Keep track of the
							last-focused element in the container when testing and ensure that the correct
							element is spotted when re-entering the container with 5-way. If the pointer is
							inside a container and a 5-way directional key is pressed, the nearest element
							to the pointer (in the direction specified by the key) will be spotted.
						</p>
						<div style={style.flexBox}>
							<Container style={style.container}>
								<Item>1</Item>
								<Item>2</Item>
								<Item>3</Item>
								<div>Non-spottable content 1</div>
								<div>Non-spottable content 2</div>
								<div>Non-spottable content 3</div>
							</Container>
							<Container style={style.container}>
								<div>Non-spottable content A</div>
								<div>Non-spottable content B</div>
								<div>Non-spottable content C</div>
								<Item id="A">A</Item>
								<Item id="B" onClick={this.handleClick}>B</Item>
								<Item id="C">C</Item>
							</Container>
						</div>
					</div>
				</Panel>
			</Panels>
		);
	}
}
export default MoonstoneDecorator(CustomPanel);
