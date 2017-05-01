import Button from '@enact/moonstone/Button';
import MoonstoneDecorator from '@enact/moonstone/MoonstoneDecorator';
import React from 'react';

const app = () => <div>
	<Button id="button">Hello!</Button>
</div>;

export default MoonstoneDecorator(app);

