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

	function loadImage (index) {
		const image = document.querySelector('#image');
		const title = document.querySelector('#title');
		const preview = document.querySelector('.preview-image');
		currentIndex = index;
		image.src = results[index].path;
		title.innerText = `${results[index].title} (${currentIndex + 1} / ${count})`;
		updateButtons();
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

	function initializeButtons () {
		const inc = document.querySelector('#inc'),
			dec = document.querySelector('#dec');
		inc.onclick = nextImage;
		dec.onclick = prevImage;
	}

	function updateButtons () {
		const inc = document.querySelector('#inc'),
			dec = document.querySelector('#dec');

		inc.disabled = (count < 0 || currentIndex >= (count - 1));
		dec.disabled = (count < 0 || currentIndex <= 0);
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
