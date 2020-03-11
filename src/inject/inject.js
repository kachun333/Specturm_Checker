chrome.extension.sendMessage({}, function (response) {
	var readyStateCheckInterval = setInterval(function () {
		if (document.readyState === "complete") {
			clearInterval(readyStateCheckInterval);

			// ----------------------------------------------------------
			// This part of the script triggers when page is done loading
			console.log("Hello. This message was sent from scripts/inject.js");

			const courseTitle = $(".page-header-headings h1")[0].innerText || $("title")[0].innerText;
			const prevDom = getPrevDom(courseTitle);
			const currentDom = getCurrentDom();

			if (!prevDom) {
				storeDom(courseTitle, currentDom);
			} else {
				//compare Dom
				let changes = null;

				currentDom.topics.forEach(currentDomTopic => {
					let isOldTopic = false;
					prevDom.topics.forEach(prevDomTopic => {
						if (currentDomTopic.topicName == prevDomTopic.topicName) {
							isOldTopic = true;
							const subChanges = findSubChanges(prevDomTopic, currentDomTopic)
							if (subChanges) {
								changes.push({
									topicName: currentDomTopic.topicName,
									subChanges: subChanges
								})
							}

							break;
						}
					});

					if (!isOldTopic) {
						changes.push({
							topicName: currentDomTopic.topicName
						})
					}
				});

			}

			//before exit or refresh
			// const result = updateLocalStorage(currentDom);
			// ----------------------------------------------------------

		}
	}, 10);
});

const getPrevDom = (courseTitle) => {
	const storage = localStorage.getItem("spectrum_checker");
	if (storage && storage[courseTitle]) {
		return storage[courseTitle];
	}
	return null;
}

const getCurrentDom = () => {
	let topics = [];
	$("ul.topics").children().each((i, el) => {
		const text = el.innerText
		topics.push({
			topicName: text.substr(0, text.indexOf(" ")),
			content: text.substr(text.indexOf(" "))
		});
	});

	return {
		topics: topics,
		lastCheckedTime: new Date()
	}

}

const findSubChanges = (prevDomTopic, currentDomTopic) => {
	return null;
}

const storeDom = (courseTitle, currentDom) => {
	//create new obj if not found in local storage
	const storage = localStorage.getItem("spectrum_checker") || {};
	storage[courseTitle] = currentDom;
	localStorage.setItem("spectrum_checker", JSON.stringify(storage))
}
//TODO
// if the spectrum is launched at not a spectrum site
//