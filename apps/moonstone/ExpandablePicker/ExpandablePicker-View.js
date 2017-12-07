import ExpandablePicker from '@enact/moonstone/ExpandablePicker';
import MoonstoneDecorator from '@enact/moonstone/MoonstoneDecorator';
import React from 'react';
import spotlight from '@enact/spotlight';

// NOTE: Forcing pointer mode off so we can be sure that regardless of webOS pointer mode the app
// runs the same way
spotlight.setPointerMode(false);

const children = ['option1', 'option2', 'option3'];

// ExpandablePicker options:
// select, disabled, noneText, title, closeOnSelect noAutoClose, noLockBottom,
// defaultOpen, defaultSelected

const app = (props) => <div {...props}>
	<div>
		<ExpandablePicker
			id="expandable1"
			title="ExpandablePicker"
		>
			{children}
		</ExpandablePicker>
	</div>
</div>;

export default MoonstoneDecorator(app);


