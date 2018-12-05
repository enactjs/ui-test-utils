import Divider from '@enact/moonstone/Divider';
import ExpandableItem from '@enact/moonstone/ExpandableItem';
import Icon from '@enact/moonstone/Icon';
import Item from '@enact/moonstone/Item';
import React from 'react';
import MoonstoneDecorator from '@enact/moonstone/MoonstoneDecorator';
import spotlight from '@enact/spotlight';
import {Panel, Header} from '@enact/moonstone/Panels';

spotlight.setPointerMode(false);

class ExpandableItemView extends React.Component {


	handleClick = () => {
		this.setState({
			disabled: !this.state.disabled
		});
	}
	render () {
		return (
			<Panel {...this.props}>
				<Header title="ExpandableItem" />
				<Divider>Default ExpandableItems</Divider>
				<ExpandableItem
					id="expandableItemDefault"
					aria-label="defaultExpandable"
					title="Default"
				>
					<Item id="itemInDefault">
						This can be any type of content you might want to
						render inside a labeled expandable container
					</Item>
					<Item>
						<Icon>star</Icon> You could include other components as well <Icon>star</Icon>
					</Item>
				</ExpandableItem>

				<Divider>AutoClose ExpandableItems</Divider>
				<ExpandableItem
					id="expandableAutoClose"
					aria-label="autoCloseExpandable"
					autoClose
					title="auto close"
				>
					<Item id="itemInAutoClose">
						This can be any type of content you might want to
						render inside a labeled expandable container
					</Item>
					<Item>
						<Icon>star</Icon> You could include other components as well <Icon>star</Icon>
					</Item>
				</ExpandableItem>

				<Divider>Lock Bottom ExpandableItems</Divider>
				<ExpandableItem
					id="expandableLockBottom"
					aria-label="lockBottomExpdandable"
					title="lockBottom"
					lockBottom
				>
					<Item id="itemInLockBottom">
						This can be any type of content you might want to
						render inside a labeled expandable container
					</Item>
					<Item id="item2InLockBottom">
						<Icon>star</Icon> You could include other components as well <Icon>star</Icon>
					</Item>
				</ExpandableItem>
				<Item id="extraItem">
					The extra item
				</Item>
				<ExpandableItem
					id="disabledExpandableItem"
					aria-label="disabledExpandable"
					title="disabledExpandable"
					spotlightDisabled
				>
					<Item>
						This can be any type of content you might want to
						render inside a labeled expandable container
					</Item>
				</ExpandableItem>
			</Panel>
		);
	}
}

export default MoonstoneDecorator(ExpandableItemView);
