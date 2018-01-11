import ToggleButton from '@enact/moonstone/ToggleButton';
import MoonstoneDecorator from '@enact/moonstone/MoonstoneDecorator';
import React from 'react';
import spotlight from '@enact/spotlight';

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
		</ToggleButton>

		<ToggleButton
			id="toggleButton3"
			toggleOnLabel="On"
		>
			Missing Toggle Off Label
		</ToggleButton>

		<ToggleButton
			id="toggleButton4"
			toggleOffLabel="Off"
		>
			Missing Toggle On Label
		</ToggleButton>

		<ToggleButton
			id="toggleButton5"
			toggleOnLabel="On"
			toggleOffLabel="Off"
			defaultSelected
		>
		</ToggleButton>

		<ToggleButton
			id="toggleButton6"
			toggleOnLabel="On"
			toggleOffLabel="Off"
			defaultSelected
			disabled
		>
		</ToggleButton>

		<ToggleButton
			id="toggleButton7"
			toggleOnLabel="Small On"
			toggleOffLabel="Small Off"
			small
		>
		</ToggleButton>

		<ToggleButton
			id="toggleButton8"
			toggleOnLabel="toggle on"
			toggleOffLabel="toggle off"
			casing="preserve"
		>
		</ToggleButton>

		<ToggleButton
			id="toggleButton9"
			toggleOnLabel="toggle on"
			toggleOffLabel="toggle off"
			casing="sentence"
		>
		</ToggleButton>

		<ToggleButton
			id="toggleButton10"
			toggleOnLabel="toggle on"
			toggleOffLabel="toggle off"
			casing="word"
		>
		</ToggleButton>

		<ToggleButton
			id="toggleButton11"
			toggleOnLabel="toggle on"
			toggleOffLabel="toggle off"
			casing="upper"
		>
		</ToggleButton>
	</div>
</div>;

export default MoonstoneDecorator(app);
