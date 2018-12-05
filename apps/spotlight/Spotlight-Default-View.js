import React from 'react';
import MoonstoneDecorator from '@enact/moonstone/MoonstoneDecorator';
import spotlight from '@enact/spotlight';
import {PropTypes} from 'prop-types';
import {ActivityPanels, Panel, Header} from '@enact/moonstone/Panels';
import Item from '@enact/moonstone/Item';
import Scroller from '@enact/moonstone/Scroller';
import {spotlightDefaultClass} from '@enact/spotlight/SpotlightContainerDecorator';

spotlight.setPointerMode(false);

class CustomPanel extends React.Component {
	clickHandler = () => {
		this.props.nextPage();
	}

	render () {
		const {list, hideChildren, loaded, focusIndex, ...rest} = this.props;
		delete rest.nextPage;

		return (
			<Panel {...rest} hideChildren={hideChildren || !loaded}>
				<Header title="Explicit Focus" />
				<Scroller>
					{
						list.map((item, key) => {
							return (
								<Item
									id={`item${key + 1}`}
									key={key}
									onClick={this.clickHandler}
									className={key === focusIndex ? spotlightDefaultClass : null}
								>
									{item}
								</Item>
							);
						})
					}
				</Scroller>
			</Panel>
		);
	}
}

CustomPanel.propTypes = {
	focusIndex: PropTypes.number,
	hideChildren: PropTypes.bool,
	list: PropTypes.array,
	loaded: PropTypes.bool,
	nextPage: PropTypes.func
};

class PanelSample extends React.Component {
	constructor (props) {
		super(props);

		this.state = {
			page: 0,
			totalPage: 2,
			list: [],
			loaded: false
		};

		setTimeout(() => { // this code simulate asynchronus response
			this.addItems(20);
			this.setState({
				loaded: true
			});
		}, 3000);
	}

	addItems = (count) => {
		let lastArray = [...this.state.list];
		let lastIndex = lastArray.length;

		for (let i = 1; i <= count; i++) {
			lastArray.push('item' + (lastIndex + i) );
		}

		this.setState({
			list: lastArray
		});
	}

	nextPage = () => {
		if (this.state.page < this.state.totalPage - 1) {
			this.setState({
				page: this.state.page + 1
			});
		}
	}

	breadcrumbHandler = () => {
		if ( this.state.page > 0 ) {
			this.setState({
				page: this.state.page - 1
			});
		}
	}

	render () {
		return (
			<ActivityPanels
				{...this.props}
				index={this.state.page}
				childProps={{
					nextPage: this.nextPage,
					list: this.state.list,
					loaded: this.state.loaded
				}}
				onSelectBreadcrumb={this.breadcrumbHandler}
			>
				<CustomPanel focusIndex={3} />
				<CustomPanel focusIndex={6} />
			</ActivityPanels>
		);
	}
}

export default MoonstoneDecorator({noAutoFocus: true}, PanelSample);
