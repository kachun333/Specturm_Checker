chrome.extension.sendMessage({}, function (response) {
	var readyStateCheckInterval = setInterval(function () {
		if (document.readyState === "complete") {
			clearInterval(readyStateCheckInterval);

			// ----------------------------------------------------------
			// This part of the script triggers when page is done loading
			console.log("Hello. This message was sent from scripts/inject.js");
			const domObj = $('#region-main');
			console.log(domObj.children())
			// const result = updateLocalStorage(domObj);
			// console.log(result)
			// ----------------------------------------------------------

		}
	}, 10);
});

const updateLocalStorage = (domObj) => {

	const storage = localStorage.getItem("spectrum_checker");
	if (storage) {
		 return JSON.parse(storage);
	} else {
		const domData = JSON.stringify(domObj);
		localStorage.setItem("spectrum_checker", domData)
		return "successfully store in local storage."
	}
}
//TODO
// if the spectrum is launched at not a spectrum site
// 