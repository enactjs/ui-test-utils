import RadioItem from '@enact/agate/RadioItem';
import AgateDecorator from '@enact/agate/AgateDecorator';
import React from 'react';

const app = (props) => <div {...props}>
	<div>
		<RadioItem
			id="radioItem1"
		>
			Radio Item1
		</RadioItem>
		<RadioItem
			id="radioItem2"
			defaultSelected
		>
			Radio Item selected
		</RadioItem>
	</div>
</div>;

export default AgateDecorator(app);
