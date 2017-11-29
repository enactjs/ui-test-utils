import ToggleItem from '@enact/moonstone/ToggleItem';
import MoonstoneDecorator from '@enact/moonstone/MoonstoneDecorator';
import React from 'react';
import spotlight from '@enact/spotlight';

window.spotlight = spotlight;

// NOTE: Forcing pointer mode off so we can be sure that regardless of webOS pointer mode the app
// runs the same way
spotlight.setPointerMode(false);

const app = (props) => <div {...props}>
	<div>
		<ToggleItem
			id="toggleItem1"
			icon="lock"
		>
			Toggle Item1
		</ToggleItem>
		<ToggleItem
			id="toggleItem2"
			icon="search"
			defaultSelected
		>
			Toggle Item selected
		</ToggleItem>
		<ToggleItem
			id="toggleItem3"
			icon="search"
			iconPosition="after"
			defaultSelected
		>
			Toggle Item after
		</ToggleItem>
		<ToggleItem
			id="toggleItem4"
			icon="search"
			defaultSelected
			inline
		>
			Toggle Item inline
		</ToggleItem>
		<ToggleItem
			id="toggleItem5"
			icon="search"
			iconPosition="after"
			defaultSelected
			inline
		>
			Toggle Item inline after
		</ToggleItem>
		<ToggleItem
			id="toggleItem6"
			icon="search"
			defaultSelected
			disabled
		>
			Toggle Item disabled
		</ToggleItem>
	</div>
</div>;

export default MoonstoneDecorator(app);
