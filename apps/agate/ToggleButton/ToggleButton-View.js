import ToggleButton from '@enact/agate/ToggleButton';
import AgateDecorator from '@enact/agate/AgateDecorator';
import React from 'react';

const app = (props) => <div {...props}>
	<div>
		<div>
			<ToggleButton
				id="toggleButton1"
			>
				Missing Toggle Label
			</ToggleButton>
		</div>

		<div>
			<ToggleButton
				id="toggleButton2"
				size="small"
			>
				ON
			</ToggleButton>
		</div>
		<div>
			<ToggleButton
				id="toggleButton3"
				toggleOnLabel="On"
				toggleOffLabel="Off"
			/>
		</div>
	</div>
</div>;

export default AgateDecorator(app);
