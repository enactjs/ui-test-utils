import CheckboxItem from '@enact/moonstone/CheckboxItem';
import MoonstoneDecorator from '@enact/moonstone/MoonstoneDecorator';
import React from 'react';
import spotlight from '@enact/spotlight';

// NOTE: Forcing pointer mode off so we can be sure that regardless of webOS pointer mode the app
// runs the same way
spotlight.setPointerMode(false);

const app = (props) => <div {...props}>
	<div>
		<CheckboxItem
			id="checkboxItem1"
		>
			Checkbox Item
		</CheckboxItem>
		<CheckboxItem
			id="checkboxItem2"
			defaultSelected
		>
			Checkbox Item selected
		</CheckboxItem>
		<CheckboxItem
			id="checkboxItem3"
			iconPosition="after"
			defaultSelected
		>
			Checkbox Item after
		</CheckboxItem>
		<CheckboxItem
			id="checkboxItem4"
			defaultSelected
			inline
		>
			Checkbox Item inline
		</CheckboxItem>
		<CheckboxItem
			id="checkboxItem5"
			iconPosition="after"
			defaultSelected
			inline
		>
			Checkbox Item inline after
		</CheckboxItem>
		<CheckboxItem
			id="checkboxItem6"
			defaultSelected
			disabled
		>
			Checkbox Item disabled
		</CheckboxItem>
		<CheckboxItem
			id="checkboxItem7"
			defaultSelected
			inline
		>
			Checkbox Item inline 1
		</CheckboxItem>
		<CheckboxItem
			id="checkboxItem8"
			defaultSelected
			inline
		>
			Checkbox Item inline 2
		</CheckboxItem>
	</div>
</div>;

export default MoonstoneDecorator(app);
