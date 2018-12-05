import {Panel, Header} from '@enact/moonstone/Panels';
import React from 'react';
import MoonstoneDecorator from '@enact/moonstone/MoonstoneDecorator';
import spotlight from '@enact/spotlight';
import Button from '@enact/moonstone/Button';

spotlight.setPointerMode(false);

class NoAutoFocusPanel extends React.Component {

	render () {
		return (
			<Panel {...this.props} autoFocus="none">
				<Header title="No auto focus">
					<Button id="headerBtn" small>button</Button>
				</Header>
				<div>There should be no focus.</div>
			</Panel>
		);
	}
}

export default MoonstoneDecorator({noAutoFocus: true}, NoAutoFocusPanel);
