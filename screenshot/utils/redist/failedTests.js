/* eslint-env browser */
((results) => {
	const h = document.querySelector('h1');
	const list = document.querySelector('.list > ol');
	const count = results.length;
	let currentIndex = -1;

	h.innerText += ` (${count})`;

	results.forEach((item, index) => {
		const li = document.createElement('li');
		li.appendChild(document.createTextNode(item.title));
		li.onclick= function () {loadImage(index);};
		list.appendChild(li);
	});

	initializeButtons();
	if (count > 0) {
		loadImage(0);
	}

	function loadImage (index = currentIndex, type = 'diff') {
		const image = document.querySelector('#image');
		const title = document.querySelector('#title');
		const preview = document.querySelector('.preview-image');
		currentIndex = index;
		image.src = results[index][`${type}Path`];
		title.innerText = `${results[index].title} (${currentIndex + 1} / ${count})`;
		updateButtons(type);
		if (results[index].title.indexOf('ar-SA') >= 0) {
			const pos = preview.scrollWidth - preview.clientWidth;
			preview.scrollLeft = pos;
		} else {
			preview.scrollLeft = 0;
		}
	}

	function nextImage () {
		loadImage(currentIndex + 1);
	}

	function prevImage () {
		loadImage(currentIndex - 1);
	}

	function appendButton (target, text, action) {
		let btn;

		btn = document.createElement('button');
		btn.innerText = text;
		btn.id = action;
		btn.onclick = () => loadImage(undefined, action);
		target.appendChild(btn);
		return btn;
	}
	function initializeButtons () {
		const inc = document.querySelector('#inc'),
			dec = document.querySelector('#dec');
		let nextTarget = inc;

		const buttonbox = document.createElement('span');
		buttonbox.classList.add('buttonbox');

		appendButton(buttonbox, 'diff', 'diff');
		appendButton(buttonbox, 'reference', 'reference');
		appendButton(buttonbox, 'screen', 'screen');

		nextTarget.insertAdjacentElement('afterend', buttonbox);

		const btn = document.createElement('button');
		btn.innerText = 'test case';
		btn.id = 'testcase';
		btn.onclick = () => {
			let path = results[currentIndex].url;
			if (window.location.protocol === 'file:') {
				path = 'http://localhost:5000' + path;
			} else {
				path = 'dist' + path;
			}
			document.defaultView.open(path, '_blank');
		};
		buttonbox.insertAdjacentElement('afterend', btn);

		inc.onclick = nextImage;
		dec.onclick = prevImage;
	}

	function updateButtons (type) {
		const inc = document.querySelector('#inc'),
			dec = document.querySelector('#dec'),
			testCase = document.querySelector('#testcase'),
			activeButton = document.querySelector('.active'),
			targetButton = document.querySelector(`#${type}`);

		inc.disabled = (count <= 0 || currentIndex >= (count - 1));
		dec.disabled = (count <= 0 || currentIndex <= 0);
		testCase.disabled = count <= 0;

		if (activeButton) {
			activeButton.classList.remove('active');
		}
		if (targetButton) {
			targetButton.classList.add('active');
		}
	}

	document.onkeydown = (ev) => {
		switch (ev.keyCode) {
			case 37:
				if (count > 0 && currentIndex > 0) {
					prevImage();
				}
				break;
			case 39:
				if (count > 0 && currentIndex < (count - 1)) {
					nextImage();
				}
				break;
		}
	};
// eslint-disable-next-line no-undef
})(results);
