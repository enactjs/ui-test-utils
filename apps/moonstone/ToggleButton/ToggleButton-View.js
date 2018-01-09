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
			On/Off Toggle
		</ToggleButton>

		<ToggleButton
			id="toggleButton3"
			toggleOnLabel="On"
			toggleOffLabel="Off"
			defaultSelected
		>
			Selected Toggle
		</ToggleButton>

		<ToggleButton
			id="toggleButton4"
			toggleOnLabel="On"
			toggleOffLabel="Off"
			defaultSelected
			disabled
		>
			Disabled Selected Toggle
		</ToggleButton>

		<ToggleButton
			id="toggleButton5"
			toggleOnLabel="Small On"
			toggleOffLabel="Small Off"
			small
		>
			Small Toggle
		</ToggleButton>

		<ToggleButton
			id="toggleButton6"
			toggleOnLabel="toggle on"
			toggleOffLabel="toggle off"
			casing="preserve"
		>
			Preserved Casing Toggle
		</ToggleButton>

		<ToggleButton
			id="toggleButton7"
			toggleOnLabel="toggle on"
			toggleOffLabel="toggle off"
			casing="sentence"
		>
			Sentence Casing Toggle
		</ToggleButton>

		<ToggleButton
			id="toggleButton8"
			toggleOnLabel="toggle on"
			toggleOffLabel="toggle off"
			casing="word"
		>
			Word Casing Toggle
		</ToggleButton>

		<ToggleButton
			id="toggleButton9"
			toggleOnLabel="toggle on"
			toggleOffLabel="toggle off"
			casing="upper"
		>
			Upper Casing Toggle
		</ToggleButton>
	</div>
</div>;

export default MoonstoneDecorator(app);
