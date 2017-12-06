import React from 'react';
import kind from '@enact/core/kind';

const SpotlightStatusBase = kind({
	name: 'SpotlightStatus',

	render: ({onPause, onResume, onUpdateStatus, pointerMode, paused}) => (
		<div>
			<h1>Spotlight Status</h1>
			<dl className="spotlight-status">
				<dt>Pointer mode:</dt>
				<dd className="spotlight-status-pointerMode">{String(pointerMode)}</dd>
				<dt>Paused:</dt>
				<dd className="spotlight-status-paused">{String(paused)}</dd>
			</dl>
			<button className="spotlight-status-update" onClick={onUpdateStatus}>Update Status</button>
			<button className="spotlight-status-pause" onClick={onPause}>Pause Spotlight</button>
			<button className="spotlight-status-resume" onClick={onResume}>resume Spotlight</button>
		</div>
	)
});

const SpotlightStatusDecorator = (Wrapped) => class extends React.Component {
	constructor () {
		super();

		this.state = this.getCurrentStatus();
	}

	getCurrentStatus () {
		return {
			paused: spotlight.isPaused(),
			pointerMode: spotlight.getPointerMode()
		}
	}

	updateStatus = () => {
		this.setState(this.getCurrentStatus());
	}

	pause = () => {
		spotlight.pause();
		this.updateStatus();
	}

	pause = () => {
		spotlight.resume();
		this.updateStatus();
	}

	render () {
		return (
			<Wrapped
				onPause={this.pause}
				onResume={this.resume}
				onUpdateStatus={this.updateStatus}
				{...this.state}
			/>
		);
	}
};

const SpotlightStatus = SpotlightStatusDecorator(SpotlightStatusBase);

export default SpotlightStatus;
export {
	SpotlightStatus
};
