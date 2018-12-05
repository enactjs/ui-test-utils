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
	render () {
		return (
			<Panels {...this.props}>
				<Panel>
					<Header title="Spotlight-Multiple containers" />
					<div>
						<div>{'Specifying "self-only" indicates that elements in other containers cannot be navigated to by using 5-way navigation.'}</div>
						<div style={style.flexBox}>
							<Container style={style.container} spotlightId="leftContainer" spotlightRestrict="self-only">
								<Item>1</Item>
								<Item>2</Item>
								<Item id="three">3</Item>
								<div>Non-spottable content 1</div>
								<div>Non-spottable content 2</div>
								<div>Non-spottable content 3</div>
							</Container>
							<Container style={style.container} spotlightId="rightContainer">
								<div>Non-spottable content A</div>
								<div>Non-spottable content B</div>
								<div>Non-spottable content C</div>
								<Item>A</Item>
								<Item id="B">B</Item>
								<Item>C</Item>
							</Container>
						</div>
					</div>
				</Panel>
			</Panels>
		);
	}
}
export default MoonstoneDecorator(CustomPanel);
