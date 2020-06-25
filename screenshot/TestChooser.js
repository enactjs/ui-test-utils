import React from 'react';

import css from './TestChooser.module.css';

const TestChooser = ({metadata}) => {
	const tests = Object.keys(metadata);

	return (
		<div>
			{tests.map((key) => (
				<div key={key}>
					<div className={css.component}>{key}</div>
					<ul>
					{metadata[key].map(({title}, index) => (
						<li key={index} className={css.test}>
							<a href={`?component=${key}&testId=${index}`}>{title}</a>
						</li>
					))}
					</ul>
				</div>
			))}
		</div>
	)
}

export default TestChooser;
