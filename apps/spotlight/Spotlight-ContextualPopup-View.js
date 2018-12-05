import Button from '@enact/moonstone/Button';
import ContextualPopupDecorator from '@enact/moonstone/ContextualPopupDecorator';
import Group from '@enact/ui/Group';
import RadioItem from '@enact/moonstone/RadioItem';
import React from 'react';
import MoonstoneDecorator from '@enact/moonstone/MoonstoneDecorator';
import spotlight from '@enact/spotlight';
import Toggleable from '@enact/ui/Toggleable';
import {Panel, Header} from '@enact/moonstone/Panels';

spotlight.setPointerMode(false);

const ContextualButton = Toggleable(
	{prop: 'open', toggle: 'onClick', deactivate: 'onClose'},
	ContextualPopupDecorator(
		Button
	)
);

const data = [
	{key: 0, id: 'creek', children: 'Creek'},
	{key: 1, id: 'river', children: 'River'},
	{key: 2, id: 'ocean', children: 'Ocean'}
];

class ContextualPopupDecoratorView extends React.Component {

	renderPopup1 = () => (
		<div>
			<span>Item 1</span>
			<br />
			<span>Item 2</span>
			<br />
			<span>Item 3</span>
			<br />
		</div>
	)

	renderPopup2 = () => (
		<div>
			<Button id="btn1">Button</Button>
			<Button id="btn2">Button2</Button>
			<Button id="btn3">Button3</Button>
		</div>
	)

	renderPopup3 = () => (
		<Group
			childComponent={RadioItem}
			childProp="data"
			defaultSelected={0}
			itemProps={{inline: false}}
			select="radio"
			selectedProp="selected"
		>
			{data}
		</Group>
	)

	render () {
		return (
			<Panel {...this.props}>
				<Header title="ContextualPopup" />
				<div style={{position: 'absolute', left: '0'}}>
					<ContextualButton
						id="averageBtn"
						direction="right"
						popupComponent={this.renderPopup1}
					>
						Average
					</ContextualButton>
				</div>
				<div style={{position: 'absolute', bottom: '0'}}>
					<ContextualButton
						id="modalBtn"
						direction="up"
						popupComponent={this.renderPopup2}
						showCloseButton
						spotlightRestrict="self-only"
					>
						Spotlight Modal
					</ContextualButton>
				</div>
				<div style={{position: 'absolute', right: '0'}}>
					<ContextualButton
						id="nestedBtn"
						direction="left"
						popupComponent={this.renderPopup3}
					>
						Nested Radio
					</ContextualButton>
				</div>
			</Panel>
		);
	}
}

export default MoonstoneDecorator(ContextualPopupDecoratorView);
