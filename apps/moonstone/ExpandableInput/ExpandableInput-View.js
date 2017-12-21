import ExpandableInput from '@enact/moonstone/ExpandableInput';
import MoonstoneDecorator from '@enact/moonstone/MoonstoneDecorator';
import React from 'react';
import spotlight from '@enact/spotlight';

// NOTE: Forcing pointer mode off so we can be sure that regardless of webOS pointer mode the app
// runs the same way
spotlight.setPointerMode(false);


// ExpandableInput options:
// disabled, noneText, title, type
// defaultOpen, defaultValue

const app = (props) => <div {...props}>
	<div>
		<ExpandableInput
			id="expandable1"
			title="ExpandableInput Default"
			noneText="No Input Text"
		/>
		<ExpandableInput
			id="expandable2"
			title="ExpandableInput Default Value"
			noneText="No Input Text"
			defaultValue="Default Value"
		/>
		<ExpandableInput
			id="expandable3"
			title="ExpandableInput Default Open"
			noneText="No Input Text"
			defaultOpen
		/>
		<ExpandableInput
			id="expandable4"
			title="ExpandableInput Password"
			noneText="No Input Text"
			type ="password"
			defaultValue="Password"
		/>
		<ExpandableInput
			id="expandable5"
			title="ExpandableInput Disabled"
			noneText="No Input Text"
			disabled
		/>
	</div>
</div>;

export default MoonstoneDecorator(app);
