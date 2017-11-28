import React from 'react';
import spotlight from '@enact/spotlight';

window.spotlight = spotlight;

// NOTE: Forcing pointer mode off so we can be sure that regardless of webOS pointer mode the app
// runs the same way
spotlight.setPointerMode(false);

import PropTypes from 'prop-types';
import MoonstoneDecorator from '@enact/moonstone/MoonstoneDecorator';
import {ActivityPanels, Panel, Header} from '@enact/moonstone/Panels';
import Item from '@enact/moonstone/Item';
import Button from '@enact/moonstone/Button';

class App extends React.Component {
	static propTypes = {
		index: PropTypes.number
	}

	static defaultProps = {
		index: 0
	}

	constructor (props) {
		super(props);
		this.state = {
			index: this.props.index
		};
	}

	handleSelectBreadcrumb = ({index}) => this.setState({index})

	handleClick = () => this.setState({index: this.state.index + 1})

	render () {
		return (
			<ActivityPanels {...this.props} onSelectBreadcrumb={this.handleSelectBreadcrumb} index={this.state.index}>
				<MainPanel title="First" onClick={this.handleClick} />
				<ItemPanel title="Second" onClick={this.handleClick} />
				<ButtonPanel title="Third" onClick={this.handleClick} />
				<MainPanel title="Fourth" />
			</ActivityPanels>
		);
	}
}

const ButtonPanel = ({title, onClick, ...rest}) => (
    <Panel {...rest}>
        <Header title={title}>
            <Button onClick={onClick}>Click me</Button>
            <Button onClick={onClick}>Click me</Button>
        </Header>
    </Panel>
)

const ItemPanel = ({title, onClick, ...rest}) => (
    <Panel {...rest}>
        <Header title={title} />
        <Item onClick={onClick}>Click me</Item>
        <Item onClick={onClick}>Click me</Item>
        <Item onClick={onClick}>Click me</Item>
        <Item onClick={onClick}>Click me</Item>
    </Panel>
);

const MainPanel = ({title, onClick, ...rest}) => (
    <Panel {...rest}>
        <Header title={title}>
            <Button onClick={onClick}>Click me</Button>
            <Button onClick={onClick}>Click me</Button>
        </Header>
        <Item onClick={onClick}>Click me</Item>
        <Item onClick={onClick}>Click me</Item>
        <Item onClick={onClick}>Click me</Item>
        <Item onClick={onClick}>Click me</Item>
    </Panel>
)

export default MoonstoneDecorator(App);
