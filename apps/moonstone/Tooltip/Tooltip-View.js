import Button from '@enact/moonstone/Button';
import MoonstoneDecorator from '@enact/moonstone/MoonstoneDecorator';
import React from 'react';
import spotlight from '@enact/spotlight';

const style = {
	posctl: {
		position: 'absolute',
		top: 0,
		left: 0
	},
	poscml: {
		position: 'absolute',
		top: '40%',
		left: 0
	},
	poscbl: {
		position: 'absolute',
		bottom: 0,
		left: 0
	},
	posctc: {
		position: 'absolute',
		top: 0,
		left: '40%'
	},
	poscbc: {
		position: 'absolute',
		bottom: 0,
		left: '40%'
	},
	posctr: {
		position: 'absolute',
		top: 0,
		right: 0
	},
	poscmr: {
		position: 'absolute',
		top: '40%',
		right: 0
	},
	poscbr: {
		position: 'absolute',
		right: 0,
		bottom: 0
	},
	main: {
		display: 'grid',
		'grid-template-columns': 'repeat(3, 1fr)',
		'grid-gap': '6px',
		'margin-top': '100px'
	}
};

spotlight.setPointerMode(false);

const app = (props) => <div {...props}>
	<div>
		<Button
			style={style.posctl}
			id="tooltipctl"
			tooltipCasing="preserve"
			tooltipDelay={500}
			tooltipText="tooltip position - top left"
			tooltipPosition="above left"
		>
			Top Left
		</Button>
		<Button
			style={style.poscml}
			id="tooltipcml"
			tooltipCasing="preserve"
			tooltipDelay={500}
			tooltipText="tooltip position - middle left"
			tooltipPosition="below left"
		>
			Middle Left
		</Button>
		<Button
			style={style.poscbl}
			id="tooltipcbl"
			tooltipCasing="preserve"
			tooltipDelay={500}
			tooltipText="tooltip position - bottom left"
			tooltipPosition="below left"
		>
			Bottom Left
		</Button>
		<Button
			style={style.posctc}
			id="tooltipctc"
			tooltipCasing="preserve"
			tooltipDelay={500}
			tooltipText="tooltip position - top center"
			tooltipPosition="above right"
		>
			Top Center
		</Button>
		<Button
			style={style.poscbc}
			id="tooltipcbc"
			tooltipCasing="preserve"
			tooltipDelay={500}
			tooltipText="tooltip position - bottom center"
			tooltipPosition="below right"
		>
			Bottom Center
		</Button>
		<Button
			style={style.posctr}
			id="tooltipctr"
			tooltipCasing="preserve"
			tooltipDelay={500}
			tooltipText="tooltip position - top right"
			tooltipPosition="above right"
		>
			Top Right
		</Button>
		<Button
			style={style.poscmr}
			id="tooltipcmr"
			tooltipCasing="preserve"
			tooltipDelay={500}
			tooltipText="tooltip position - middle right"
			tooltipPosition="below right"
		>
			Middle Right
		</Button>
		<Button
			style={style.poscbr}
			id="tooltipcbr"
			tooltipCasing="preserve"
			tooltipDelay={500}
			tooltipText="tooltip position - bottom right"
			tooltipPosition="below right"
		>
			Bottom Right
		</Button>
	</div>
	<div style={style.main}>
		<Button
			id="tooltipmar"
			tooltipCasing="preserve"
			tooltipDelay={500}
			tooltipText="tooltip position - above right"
			tooltipPosition="above right"
		>
			Above Right
		</Button>
		<Button
			id="tooltipmac"
			tooltipCasing="preserve"
			tooltipDelay={500}
			tooltipText="tooltip position - above center"
			tooltipPosition="above center"
		>
			Above Center
		</Button>
		<Button
			id="tooltipmal"
			tooltipCasing="preserve"
			tooltipDelay={500}
			tooltipText="tooltip position - above left"
			tooltipPosition="above left"
		>
			Above Left
		</Button>
		<Button
			id="tooltipmbr"
			tooltipCasing="preserve"
			tooltipDelay={500}
			tooltipText="tooltip position - below right"
			tooltipPosition="below right"
		>
			Below Right
		</Button>
		<Button
			id="tooltipmbc"
			tooltipCasing="preserve"
			tooltipDelay={500}
			tooltipText="tooltip position - below center"
			tooltipPosition="below center"
		>
			Below Center
		</Button>
		<Button
			id="tooltipmbl"
			tooltipCasing="preserve"
			tooltipDelay={500}
			tooltipText="tooltip position - below left"
			tooltipPosition="below left"
		>
			Below Left
		</Button>
		<Button
			id="tooltipmrt"
			tooltipCasing="preserve"
			tooltipDelay={500}
			tooltipText="tooltip position - right top"
			tooltipPosition="right top"
		>
			Right Top
		</Button>
		<Button
			id="tooltipmrm"
			tooltipCasing="preserve"
			tooltipDelay={500}
			tooltipText="tooltip position - right middle"
			tooltipPosition="right middle"
		>
			Right Middle
		</Button>
		<Button
			id="tooltipmlt"
			tooltipCasing="preserve"
			tooltipDelay={500}
			tooltipText="tooltip position - left top"
			tooltipPosition="left top"
		>
			Left Top
		</Button>
		<Button
			id="tooltipmrb"
			tooltipCasing="preserve"
			tooltipDelay={500}
			tooltipText="tooltip position - right bottom"
			tooltipPosition="right bottom"
		>
			Right Bottom
		</Button>
		<Button
			id="tooltipmlm"
			tooltipCasing="preserve"
			tooltipDelay={500}
			tooltipText="tooltip position - left middle"
			tooltipPosition="left middle"
		>
			Left Middle
		</Button>
		<Button
			id="tooltipmlb"
			tooltipCasing="preserve"
			tooltipDelay={500}
			tooltipText="tooltip position - left bottom"
			tooltipPosition="left bottom"
		>
			Left Bottom
		</Button>
		<Button
			id="tooltipmup"
			tooltipCasing="upper"
			tooltipDelay={500}
			tooltipText="tooltip casing - upper"
			tooltipPosition="above"
		>
			Upper
		</Button>
		<Button
			id="tooltipmst"
			tooltipCasing="sentence"
			tooltipDelay={500}
			tooltipText="tooltip casing - sentence"
			tooltipPosition="below"
		>
			Sentence
		</Button>
		<Button
			id="tooltipmwd"
			tooltipCasing="word"
			tooltipDelay={500}
			tooltipText="tooltip casing - word"
			tooltipPosition="above"
		>
			Word
		</Button>
		<Button
			id="tooltipmdl"
			tooltipCasing="preserve"
			tooltipDelay={1000}
			tooltipText="tooltip delay - 1000"
			tooltipPosition="above"
		>
			Delay 1000
		</Button>
	</div>
</div>;

export default MoonstoneDecorator(app);
