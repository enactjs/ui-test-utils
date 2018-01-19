import ExpandableItem from '@enact/moonstone/ExpandableItem';
import MoonstoneDecorator from '@enact/moonstone/MoonstoneDecorator';
import React from 'react';
import spotlight from '@enact/spotlight';

// NOTE: Forcing pointer mode off so we can be sure that regardless of webOS pointer mode the app
// runs the same way
spotlight.setPointerMode(false);

const children = <div>The Expanded Item</div>;

const app = (props) => <div {...props}>
	<div>
		<ExpandableItem
			id="expandableItemDefaultClosedWithoutNoneText"
			title="ExpandableItem Default"
		>
			{children}
		</ExpandableItem>
		<ExpandableItem
			id="expandableItemDefaultClosedWithNoneText"
			noneText="Nothing Selected"
			title="ExpandableItem Default With noneText"
		>
			{children}
		</ExpandableItem>
		<ExpandableItem
			id="expandableItemDefaultOpenWithNoneText"
			noneText="Nothing Selected"
			title="ExpandableItem Default Open"
			defaultOpen
		>
			{children}
		</ExpandableItem>
		<ExpandableItem
			id="expandableItemWithLabel"
			title="ExpandableItem With Label"
			label="Labeled Item"
		>
			{children}
		</ExpandableItem>
		<ExpandableItem
			id="expandableItemDisabledWithNoneText"
			noneText="Nothing Selected"
			title="ExpandableItem Disabled"
			disabled
		>
			{children}
		</ExpandableItem>
	</div>
</div>;

export default MoonstoneDecorator(app);
