import IncrementSlider from '@enact/moonstone/IncrementSlider';
import React from 'react';
import MoonstoneDecorator from '@enact/moonstone/MoonstoneDecorator';
import spotlight from '@enact/spotlight';
import {Panel, Header} from '@enact/moonstone/Panels';
import Divider from '@enact/moonstone/Divider';

spotlight.setPointerMode(false);

class SliderView extends React.Component {
	render () {
		return (
			<Panel {...this.props}>
				<Header title="IncrementSlider" />
				<Divider>IncrementSlider - step : 25</Divider>
				<IncrementSlider id="slider1" max={100} min={0} step={25} />
				<Divider>IncrementSlider - step : 1</Divider>
				<IncrementSlider id="slider2" max={100} min={0} step={1} />
			</Panel>
		);
	}
}

export default MoonstoneDecorator(SliderView);
