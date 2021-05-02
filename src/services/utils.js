
const UtilService = {
	BASE_URL: "http://116.63.39.40:8000/api",

	/**
	 * 
	 * @param {string} title 
	 * @param {string} content 
	 * @param {string} type 
	 */
	 showHint: function (title, content, type) {
		console.log('title: [' + title + '] content: [' + content + '] type: [' + type + ']');
	}
}

export default UtilService;