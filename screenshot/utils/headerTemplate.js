module.exports = function (title) {
	return `<html>
<head>
	<link rel="stylesheet" href="utils/styles.css">
</head>
<body>
	<div class="column">
		<header class="cell fixed header">
			<h1>${title}</h1>
		</header>
		<div class="cell body">
			<div class="row">
				<div class="cell fixed list">
					<ol></ol>
				</div>
				<div class="cell preview">
					<div class="column">
						<div class="cell fixed preview-header">
							<button id="dec">&lt;</button>
							<button id="inc">&gt;</button>
							<div id="title">Select an image</div>
						</div>
						<div class="cell preview-image">
							<img id="image" tabindex="-1" />
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
	<script>
		const results = [
`;
};
