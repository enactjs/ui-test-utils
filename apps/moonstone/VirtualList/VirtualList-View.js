import {Button} from '@enact/moonstone/Button';
import ri from '@enact/ui/resolution';
import {Row, Column, Cell} from '@enact/ui/Layout';
import Scroller from '@enact/moonstone/Scroller';
import SwitchItem from '@enact/moonstone/SwitchItem';
import VirtualList from '@enact/moonstone/VirtualList';
import MoonstoneDecorator from '@enact/moonstone/MoonstoneDecorator';
import React from 'react';
import spotlight from '@enact/spotlight';
import SpotlightContainerDecorator from '@enact/spotlight/SpotlightContainerDecorator';

const Container = SpotlightContainerDecorator({leaveFor: {down: '', up: ''}}, 'div');

const list1 = 'list1';
const list2 = 'list2';
const list3 = 'list3';
const fullHeightStyle = {
	height: '100%'
};

// NOTE: Forcing pointer mode off so we can be sure that regardless of webOS pointer mode the app
// runs the same way
spotlight.setPointerMode(false);

const items = [],
	itemSize = 72,
	itemStyle = {
		borderBottom: ri.unit(3, 'rem') + ' solid #202328',
		boxSizing: 'border-box'
	},
	numItems = 50;

const renderItem = (list, size) => ({index, ...rest}) => {
	const style = {height: size + 'px', ...itemStyle};
	return (
		<StatefulSwitchItem index={index} style={style} {...rest} id={`${list}Item${index}`}>
			{items[index].item}
		</StatefulSwitchItem>
	);
};

const updateDataSize = (dataSize) => {
	const
		itemNumberDigits = dataSize > 0 ? ((dataSize - 1) + '').length : 0,
		headingZeros = Array(itemNumberDigits).join('0');

	items.length = 0;

	for (let i = 0; i < dataSize; i++) {
		items.push({item :'Item ' + (headingZeros + i).slice(-itemNumberDigits), selected: false});
	}

	return dataSize;
};

updateDataSize(numItems);

class StatefulSwitchItem extends React.Component {
	constructor (props) {
		super(props);
		this.state = {
			prevIndex: props.index,
			selected: items[props.index].selected
		};
	}

	static getDerivedStateFromProps (props, state) {
		if (state.prevIndex !== props.index) {
			return {
				prevIndex: props.index,
				selected: items[props.index].selected
			};
		}

		return null;
	}

	onToggle = () => {
		items[this.props.index].selected = !items[this.props.index].selected;
		this.setState(({selected}) => ({
			selected: !selected
		}));
	}

	render () {
		const props = Object.assign({}, this.props);
		delete props.index;

		return (
			<SwitchItem {...props} onToggle={this.onToggle} selected={this.state.selected}>
				{this.props.children}
			</SwitchItem>
		);
	}
}

class app extends React.Component {
	constructor (props) {
		super(props);
		this.state = {
			list1KeyDown: 0,
			list2KeyDown: 0,
			list3KeyDown: 0
		};
	}

	onKeyDown = (list) => () => {
		const key = `${list}KeyDown`;
		this.setState((state) => {
			return ({[key]: state[key] + 1});
		});
	}

	render () {
		return (
			<Scroller {...this.props}>
				<Container id={list1} data-keydown-events={this.state.list1KeyDown} style={fullHeightStyle}>
					<Row align="center" style={fullHeightStyle}>
						<Cell component={Button} shrink className="left">
							Left
						</Cell>
						<Cell align="stretch">
							<Column align="center" style={fullHeightStyle}>
								<Cell component={Button} shrink className="top">
									Top
								</Cell>
								<Cell>
									<VirtualList
										dataSize={numItems}
										focusableScrollbar
										itemRenderer={renderItem(list1, itemSize)}
										itemSize={itemSize}
										onKeyDown={this.onKeyDown(list1)}
										spacing={0}
										verticalScrollbar="auto"
									/>
								</Cell>
								<Cell component={Button} shrink className="bottom">
									Bottom
								</Cell>
							</Column>
						</Cell>
						<Cell component={Button} shrink className="right">
							Right
						</Cell>
					</Row>
				</Container>
				<Container id={list2} data-keydown-events={this.state.list2KeyDown} style={fullHeightStyle}>
					<Row align="center" style={fullHeightStyle}>
						<Cell component={Button} shrink className="left">
							Left
						</Cell>
						<Cell align="stretch">
							<Column align="center" style={fullHeightStyle}>
								<Cell component={Button} shrink className="top">
									Top
								</Cell>
								<Cell>
									<VirtualList
										dataSize={numItems}
										focusableScrollbar
										itemRenderer={renderItem(list2, itemSize)}
										itemSize={itemSize}
										onKeyDown={this.onKeyDown(list2)}
										spacing={0}
										verticalScrollbar="hidden"
									/>
								</Cell>
								<Cell component={Button} shrink className="bottom">
									Bottom
								</Cell>
							</Column>
						</Cell>
						<Cell component={Button} shrink className="right">
							Right
						</Cell>
					</Row>
				</Container>
				<Container id={list3} data-keydown-events={this.state.list3KeyDown} style={fullHeightStyle}>
					<Row align="center" style={fullHeightStyle}>
						<Cell component={Button} shrink className="left">
							Left
						</Cell>
						<Cell align="stretch">
							<Column align="center" style={fullHeightStyle}>
								<Cell component={Button} shrink className="top">
									Top
								</Cell>
								<Cell>
									<VirtualList
										dataSize={numItems}
										focusableScrollbar={false}
										itemRenderer={renderItem(list3, itemSize)}
										itemSize={itemSize}
										onKeyDown={this.onKeyDown(list3)}
										spacing={0}
										verticalScrollbar="auto"
									/>
								</Cell>
								<Cell component={Button} shrink className="bottom">
									Bottom
								</Cell>
							</Column>
						</Cell>
						<Cell component={Button} shrink className="right">
							Right
						</Cell>
					</Row>
				</Container>
			</Scroller>
		);
	}
}

export default MoonstoneDecorator(app);
