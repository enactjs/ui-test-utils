import React from 'react';

import css from './TestChooser.module.css';

const TestChooser = ({metadata}) => {
	const tests = Object.keys(metadata);

	return (
		<div className={css.index}>
			{tests.map((key) => (
				<div key={key}>
					<h3 className={css.component}>{key}</h3>
					<ol start="0" className={css.list}>
						{metadata[key].map(({title}, index) => (
							<li key={index} className={css.listitem}>
								<a href={`?component=${key}&testId=${index}`} className={css.link}>{title}</a>
							</li>
						))}
					</ol>
				</div>
			))}
		</div>
	)
}

export default TestChooser;
