import Item from '@enact/moonstone/Item';
import MoonstoneDecorator from '@enact/moonstone/MoonstoneDecorator';
import React from 'react';
import spotlight from '@enact/spotlight';
import SpotlightContainerDecorator from '@enact/spotlight/SpotlightContainerDecorator';

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

window.spotlight = spotlight;

// NOTE: Forcing pointer mode off so we can be sure that regardless of webOS pointer mode the app
// runs the same way
spotlight.setPointerMode(false);

const app = (props) => <div {...props}>
	<p>
		The containers below will spot the last-focused element. Keep track of the
		last-focused element in the container when testing and ensure that the correct
		element is spotted when re-entering the container with 5-way. If the pointer is
		inside a container and a 5-way directional key is pressed, the nearest element
		to the pointer (in the direction specified by the key) will be spotted.
	</p>
	<div style={style.flexBox}>
		<Container style={style.container}>
			<Item id="item1" className="spottable-default">1</Item>
			<Item id="item2">2</Item>
			<Item id="item3">3</Item>
			<div id="itemns1">Non-spottable content 1</div>
			<div id="itemns2">Non-spottable content 2</div>
			<div id="itemns3">Non-spottable content 3</div>
		</Container>
		<Container style={style.container}>
			<div id="itemnsA">Non-spottable content A</div>
			<div id="itemnsB">Non-spottable content B</div>
			<div id="itemnsC">Non-spottable content C</div>
			<Item id="itemA">A</Item>
			<Item id="itemB">B</Item>
			<Item id="itemC">C</Item>
		</Container>
	</div>
</div>;

export default MoonstoneDecorator(app);

