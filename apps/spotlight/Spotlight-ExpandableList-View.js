import Divider from '@enact/moonstone/Divider';
import ExpandableList from '@enact/moonstone/ExpandableList';
import React from 'react';
import MoonstoneDecorator from '@enact/moonstone/MoonstoneDecorator';
import spotlight from '@enact/spotlight';
import {Panel, Header} from '@enact/moonstone/Panels';
import Item from '@enact/moonstone/Item';
import Scroller from '@enact/moonstone/Scroller';
import Notification from '@enact/moonstone/Notification';
import Button from '@enact/moonstone/Button';

spotlight.setPointerMode(false);

const itemList = [];
for (let i = 0; i < 50; i++) {
	itemList.push('item' + i);
}

class ExpandableListView extends React.Component {
	constructor (props) {
		super(props);
		this.state = {
			open: false
		};
	}

	handlePopup = () => {
		this.setState({
			open: !this.state.open
		});
	}

	render () {
		return (
			<Panel {...this.props}>
				<Header title="ExpandableList" />
				<Scroller direction="vertical">
					<Divider>Default ExpandableLists</Divider>
					<ExpandableList
						id="expandableListDefault"
						aria-label="defaultExpandable"
						noneText="nothing selected"
						title="title"
					>
						{[
							{key: 0, id: 'option1', children: 'option1'},
							{key: 1, id: 'option2', children: 'option2'},
							{key: 2, id: 'option3', children: 'option3'}
						]}
					</ExpandableList>

					<Divider>closeOnSelect ExpandableLists</Divider>
					<ExpandableList
						id="expandableListCOS"
						aria-label="cosExpandable"
						closeOnSelect
						noneText="nothing selected"
						title="title"
					>
						{[
							{key: 0, id: 'option4', children: 'option4'},
							{key: 1, id: 'option5', children: 'option5'},
							{key: 2, id: 'option6', children: 'option6'}
						]}
					</ExpandableList>

					<Divider>noLockBottom ExpandableLists</Divider>
					<ExpandableList
						id="expandableListNLB"
						aria-label="nlbExpandable"
						closeOnSelect
						noLockBottom
						noneText="nothing selected"
						title="title"
					>
						{[
							{key: 0, id: 'option7', children: 'option7'},
							{key: 1, id: 'option8', children: 'option8'},
							{key: 2, id: 'option9', children: 'option9'}
						]}
					</ExpandableList>
					<Item id="extraItem">
						The extra item
					</Item>
					<ExpandableList
						id="expandableList"
						aria-label="manyExpandable"
						noneText="nothing selected"
						title="title"
						onSelect={this.handlePopup}
					>
						{itemList}
					</ExpandableList>
				</Scroller>
				<Notification open={this.state.open}>
					<title>You&#39;ve been watching TV for a very long time so let&#39;s do a quick check-in.</title>
					<titleBelow>This TV has been active for 10 hours.</titleBelow>
					<span>Perhaps it is time to take a break and get some fresh air. There is a nice coffee shop around the corner</span>
					<buttons>
						<Button id="closeBtn" onClick={this.handlePopup}>Close</Button>
					</buttons>
				</Notification>
			</Panel>
		);
	}
}

export default MoonstoneDecorator(ExpandableListView);
