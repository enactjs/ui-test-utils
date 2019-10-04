import {Button} from '@enact/moonstone/Button';
import ri from '@enact/ui/resolution';
import {Row, Column, Cell} from '@enact/ui/Layout';
import SwitchItem from '@enact/moonstone/SwitchItem';
import ToggleButton from '@enact/moonstone/ToggleButton';
import VirtualList from '@enact/moonstone/VirtualList';
import MoonstoneDecorator from '@enact/moonstone/MoonstoneDecorator';
import React from 'react';
import spotlight from '@enact/spotlight';
import SpotlightContainerDecorator from '@enact/spotlight/SpotlightContainerDecorator';

import {Panel, Header} from '@enact/moonstone/Panels';
import Scroller from '@enact/moonstone/Scroller';

const ListContainer = SpotlightContainerDecorator({leaveFor: {up: ''}}, 'div');
const OptionsContainer = SpotlightContainerDecorator({leaveFor: {down: '#left'}}, 'div');
const getScrollbarVisibility = (hidden) => hidden ? 'hidden' : 'visible';

const fullHeightStyle = {
	height: '100%'
};

// NOTE: Forcing pointer mode off so we can be sure that regardless of webOS pointer mode the app
// runs the same way
spotlight.setPointerMode(false);

const Page = ({children, ...rest}) => (
	<div style={fullHeightStyle} {...rest}>
		<Row align="center" style={fullHeightStyle}>
			<Cell>
				<Column align="center" style={fullHeightStyle}>
					<Cell shrink>{children}</Cell>
				</Column>
			</Cell>
		</Row>
	</div>
);

class app extends React.Component {
	constructor (props) {
		super(props);
		this.state = {
			focusableScrollbar: false,
			hideScrollbar: false,
			keyDownEvents: 0,
			wrap: false
		};
	}

	render () {
		return (
			<Panel className="enact-fit" {...this.props}>
				<Header title="Header" />
				<Scroller>
					<Page>
						<Button id="Page_1_Button">Page 1 Button</Button>
					</Page>
					<Page>
						<Button id="Page_2_Button">Page 2 Button</Button>
					</Page>
					<Page>
						<Button id="Page_3_Button">Page 3 Button</Button>
					</Page>
					<Page>
						<Button id="Page_4_Button">Page 4 Button</Button>
					</Page>
				</Scroller>
			</Panel>
		);
	}
}

export default MoonstoneDecorator(app);
