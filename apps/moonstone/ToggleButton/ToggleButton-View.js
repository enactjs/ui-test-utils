import ToggleButton from '@enact/moonstone/ToggleButton';
import MoonstoneDecorator from '@enact/moonstone/MoonstoneDecorator';
import React from 'react';
import spotlight from '@enact/spotlight';

window.spotlight = spotlight;

// NOTE: Forcing pointer mode off so we can be sure that regardless of webOS pointer mode the app
// runs the same way
spotlight.setPointerMode(false);

const app = (props) => <div {...props}>
	<div>
		<ToggleButton
			id="toggleButton1"
		>
			Missing Toggle Label
		</ToggleButton>

		<ToggleButton
			id="toggleButton2"
			toggleOnLabel="On"
			toggleOffLabel="Off"
		>
			Missing Toggle Label
		</ToggleButton>

		<ToggleButton
			id="toggleButton3"
			toggleOnLabel="On"
			toggleOffLabel="Off"
			defaultSelected
		>
			Missing Toggle Label
		</ToggleButton>

		<ToggleButton
			id="toggleButton4"
			toggleOnLabel="On"
			toggleOffLabel="Off"
			defaultSelected
			disabled
		>
			Missing Toggle Label
		</ToggleButton>

		<ToggleButton
			id="toggleButton5"
			toggleOnLabel="Small On"
			toggleOffLabel="Small Off"
			small
		>
			Missing Toggle Label
		</ToggleButton>

		<ToggleButton
			id="toggleButton6"
			toggleOnLabel="toggle on"
			toggleOffLabel="toggle off"
			casing='preserve'
		>
			Missing Toggle Label
		</ToggleButton>

		<ToggleButton
			id="toggleButton7"
			toggleOnLabel="toggle on"
			toggleOffLabel="toggle off"
			casing='sentence'
		>
			Missing Toggle Label
		</ToggleButton>

		<ToggleButton
			id="toggleButton8"
			toggleOnLabel="toggle on"
			toggleOffLabel="toggle off"
			casing='word'
		>
			Missing Toggle Label
		</ToggleButton>

		<ToggleButton
			id="toggleButton9"
			toggleOnLabel="toggle on"
			toggleOffLabel="toggle off"
			casing='upper'
		>
			Missing Toggle Label
		</ToggleButton>

		<ToggleButton
			id="toggleButton10"
			toggleOnLabel="on"
			toggleOffLabel="off"
			backgroundOpacity=''
		>
			Missing Toggle Label
		</ToggleButton>

		<ToggleButton
			id="toggleButton11"
			toggleOnLabel="on"
			toggleOffLabel="off"
			backgroundOpacity='translucent'
		>
			Missing Toggle Label
		</ToggleButton>

		<ToggleButton
			id="toggleButton12"
			toggleOnLabel="on"
			toggleOffLabel="off"
			backgroundOpacity='transparent'
		>
			Missing Toggle Label
		</ToggleButton>
	</div>
</div>;

export default MoonstoneDecorator(app);
