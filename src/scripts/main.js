let videosSection, diagnosedSection, button, sections, myCatSection, isFixed;

window.addEventListener('load', () => {
	videosSection = document.querySelector('.section.section-video');
	diagnosedSection = document.querySelector('.section.section-diagnosed');
	button = document.getElementById('check-my-cat-btn');

	if (videosSection && diagnosedSection) {
		window.addEventListener('resize', () => {
			handleVideosSectionMargin();
		});
		handleVideosSectionMargin();
	}

	if (button) {
		handleCheckButton();
	}

	if (diagnosedSection) {
		window.addEventListener('resize', handleDiagnosedSectionImage);
		handleDiagnosedSectionImage();
	}
});

function handleDiagnosedSectionImage() {
	let height = '';
	let mediaDiv;

	if (window.matchMedia('(max-width: 575px)').matches) {
		mediaDiv = diagnosedSection.querySelector('.media');
		if (mediaDiv) {
			height = mediaDiv.clientHeight - 36;
		}
	}

	const title = diagnosedSection.querySelector('.title');
	title.style.minHeight = height ? height + 'px' : '';

	if (mediaDiv) {
		const top = parseInt(
			title.getBoundingClientRect().bottom -
				diagnosedSection.getBoundingClientRect().top -
				mediaDiv.clientHeight
		);

		mediaDiv.style.top = top > 0 ? top + 'px' : '';
	}
}

function handleVideosSectionMargin() {
	if (window.matchMedia('(max-width: 500px)').matches) return;

	const paddingBottomBase = window.matchMedia('(max-width: 768px)').matches
		? '80px'
		: '100px';

	videosSection.style.paddingBottom = `calc(${paddingBottomBase} + ${
		diagnosedSection.clientHeight / 2
	}px)`;

	diagnosedSection.style.marginTop = `-${diagnosedSection.clientHeight / 2}px`;
}

function handleCheckButton() {
	sections = new Map(
		[...document.querySelectorAll('.section')].map((el) => {
			return [el, false];
		})
	);

	const observer = new IntersectionObserver(handleIntersection);
	sections.forEach((value, section) => {
		observer.observe(section);
	});

	myCatSection = document.querySelector('.section-my-cat');

	window.addEventListener('scroll', handleCheckButtonColor);
}

function handleIntersection(entries) {
	function shouldBeFixed() {
		let fixed = true;

		sections.forEach((value, section) => {
			if (
				(value &&
					!section.classList.contains('section-hero') &&
					!section.classList.contains('section-my-cat')) ||
				Array.from(sections).every((v, s) => !v[1])
			) {
				fixed = false;
			}
		});

		return fixed;
	}

	entries.forEach((entry) => {
		sections.set(entry.target, entry.isIntersecting);
	});

	if (shouldBeFixed()) {
		button.classList.add('fixed');
		isFixed = true;
	} else {
		button.classList.remove('fixed');
		button.classList.remove('pink');
	}

	handleCheckButtonColor();
}

function handleCheckButtonColor() {
	if (!isFixed) return;

	if (sections.get(myCatSection)) {
		let margin = 0;

		const offset =
			myCatSection.getBoundingClientRect().top - window.innerHeight;

		try {
			margin = parseInt(
				window.getComputedStyle(myCatSection.querySelector('.landing-card'))
					.marginTop
			);
		} catch (error) {}

		button.classList.toggle('pink', offset > -94 + margin);
	} else {
		button.classList.add('pink');
	}
}
