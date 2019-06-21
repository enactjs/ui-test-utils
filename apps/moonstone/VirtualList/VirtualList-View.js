import {Button} from '@enact/moonstone/Button';
import ri from '@enact/ui/resolution';
import {Row, Column, Cell} from '@enact/ui/Layout';
import SwitchItem from '@enact/moonstone/SwitchItem';
import VirtualList from '@enact/moonstone/VirtualList';
import MoonstoneDecorator from '@enact/moonstone/MoonstoneDecorator';
import React from 'react';
import spotlight from '@enact/spotlight';

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

const renderItem = (size) => ({index, ...rest}) => {
	const style = {height: size + 'px', ...itemStyle};
	return (
		<StatefulSwitchItem index={index} style={style} {...rest} id={`item${index}`}>
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

const app = (props) => <div {...props}>
	<Row align="center" style={{height: '100%'}}>
		<Cell component={Button} shrink id="left">
			Left
		</Cell>
		<Cell align="stretch">
			<Column align="center" style={{height: '100%'}}>
				<Cell component={Button} shrink id="top">
					Top
				</Cell>
				<Cell>
					<VirtualList
						dataSize={numItems}
						focusableScrollbar
						itemRenderer={renderItem(itemSize)}
						itemSize={itemSize}
						spacing={0}
					/>
				</Cell>
				<Cell component={Button} shrink id="bottom">
					Bottom
				</Cell>
			</Column>
		</Cell>
		<Cell component={Button} shrink id="right">
			Right
		</Cell>
	</Row>
</div>;


export default MoonstoneDecorator(app);
