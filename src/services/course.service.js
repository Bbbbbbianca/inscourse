/**
 * 
 * @param {string} courseName name of courses in the query result contains this string
 * @param {int} category specify the caategory of courses
 * @param {string} orderBy order strategy of the results
 * @param {int} pageNum which page to show, default to 1
 * @param {int} pageSize number of courses per page, default to 5
 */

function fetchOpenCourses(courseName, category, orderBy, pageNum = 1, pageSize = 5) {
	// mock
	return [
		{
			course_id: 1,
			author_id: 1,
			status: 1, // public status
			name: 'Java Programming language',
			description: 'A classic course for programming developers to learn the feature of Java language.',
			level: 5,
			heat: 100,
			imagePath: 'unknown',
			category: _convert_category(1)
		},
		{
			course_id: 2,
			author_id: 1,
			status: 1, // public status
			name: 'Operating System',
			description: 'This course give you basic concepts and ideas of all kinds of operating systems such as Windows, Linux and MacOS. ',
			level: 4,
			heat: 200,
			imagePath: 'unknown',
			category: _convert_category(1)
		},
		{
			course_id: 3,
			author_id: 1,
			status: 1, // public status
			name: 'Cryptography',
			description: 'This is a magical course.',
			level: 4,
			heat: 100,
			imagePath: 'unknown',
			category: _convert_category(1)
		},
	];
}

function _convert_category(category, language = 'cn') {
	switch (category) {
		case 1:
			if (language === 'en') return 'computer science';
			return '计算机';
		default:
			if (language === 'en') return 'unknown category';
			return '未知类别';
	}
}

/**
 * 用户新建课程
 * @param {string} course_name 
 * @param {string} description 
 * @param {int} category 
 */
function upload_course(course_name, description, category) {
	Taro.request({
		url: BASE_URL + '/sys/uploadCourse',
		header: {
		  'HTTP_AUTHORIZATION': token
		},
		data: {
			'name': course_name,
			'description': description,
			'category': category
		},
		method: 'POST',
		success: function (res) {
		  console.log(res.data)
		  showHint(res.data.message, '', 'success')
		},
		fail: function (res) {
		  console.log(res);
		  showHint(res.message, '', 'fail');
		}
	  })
}