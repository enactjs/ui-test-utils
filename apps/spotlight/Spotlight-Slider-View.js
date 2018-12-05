import Divider from '@enact/moonstone/Divider';
import {Panel, Header} from '@enact/moonstone/Panels';
import React from 'react';
import MoonstoneDecorator from '@enact/moonstone/MoonstoneDecorator';
import spotlight from '@enact/spotlight';
import Slider from '@enact/moonstone/Slider';

spotlight.setPointerMode(false);

class SliderView extends React.Component {
	render () {
		return (
			<Panel {...this.props}>
				<Header title="Slider" />
				<Divider>Default Sliders</Divider>
				<Slider id="slider" />
			</Panel>
		);
	}
}

export default MoonstoneDecorator(SliderView);
