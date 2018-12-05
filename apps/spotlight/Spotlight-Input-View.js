import Divider from '@enact/moonstone/Divider';
import Input from '@enact/moonstone/Input';
import React from 'react';
import MoonstoneDecorator from '@enact/moonstone/MoonstoneDecorator';
import spotlight from '@enact/spotlight';
import {Panel, Header} from '@enact/moonstone/Panels';
import Button from '@enact/moonstone/Button';

spotlight.setPointerMode(false);

class InputView extends React.Component {
	render () {
		return (
			<Panel {...this.props}>
				<Header title="Input" />
				<Divider>Default Input</Divider>
				<Input id="defaultInput" placeholder="Placeholder" />
				<Button id="btn">button</Button>

				<Divider>dismissOnEnter Input</Divider>
				<Input id="dismissInput" dismissOnEnter placeholder="Placeholder" />
			</Panel>
		);
	}
}

export default MoonstoneDecorator(InputView);
