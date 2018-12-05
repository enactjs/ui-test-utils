import {ActivityPanels, Panel, Header} from '@enact/moonstone/Panels';
import Item from '@enact/moonstone/Item';
import VirtualList from '@enact/moonstone/VirtualList';
import ri from '@enact/ui/resolution';
import React from 'react';
import MoonstoneDecorator from '@enact/moonstone/MoonstoneDecorator';
import spotlight from '@enact/spotlight';
import Scroller from '@enact/moonstone/Scroller';
import Spotlight from '@enact/spotlight';
import Button from '@enact/moonstone/Button';

spotlight.setPointerMode(false);

const itemList = [],
	smallItemList = [];
for (let i = 1; i < 51; i++) {
	itemList.push('item' + i);
}

for (let i = 1; i < 5; i++) {
	smallItemList.push('item' + i);
}


class PanelsView extends React.Component {
	constructor (props) {
		super(props);
		this.state = {
			panelIndex: 0,
			smallData: false
		};
	}

	componentWillMount () {
		Spotlight.setPointerMode(false);
	}

	nextPanel = () => {
		this.setState({panelIndex: 1});
	}

	prevPanel = () => {
		this.setState({panelIndex: 0});
	}

	customItem = ({index, ...rest}) => {
		const data = this.state.smallData ? smallItemList : itemList;
		return (<Item {...rest} id={`item${index + 1}`} onClick={this.nextPanel}>{data[index]}</Item>);
	};

	setSmallData = () => {
		this.setState({
			smallData: true
		});
	}

	render () {
		return (
			<ActivityPanels {...this.props} index={this.state.panelIndex} onSelectBreadcrumb={this.prevPanel}>
				<Panel>
					<Header title="Panel 1">
						<Button id="headerBtn" small onClick={this.setSmallData}>button</Button>
					</Header>
					<VirtualList
						spotlightId="vl"
						focusableScrollbar
						containerId={'virtualList_1'}
						direction="vertical"
						dataSize={this.state.smallData ? smallItemList.length : itemList.length}
						itemRenderer={this.customItem}
						itemSize={ri.scale(72)}
					/>
				</Panel>
				<Panel {...this.props}>
					<Header title="Panel 2" />
					<Scroller focusableScrollbar>
						{
							itemList.map((item, key) => {
								return (
									<Item onClick={this.prevPanel} key={key} id={`scrollitem${key + 1}`}>{item}</Item>
								);
							})
						}
					</Scroller>
				</Panel>
			</ActivityPanels>
		);
	}
}

export default MoonstoneDecorator(PanelsView);
