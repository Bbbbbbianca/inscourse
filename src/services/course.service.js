/*
export interface Course {
	# 课程ID
	course_id: int
	# 上传者ID
	author_id: int (User foreign key)
	# 课程公开状态
	status: int (Enumeration [public/private])
	# 课程名
	name: string (length limit)
	# 课程简介
	description: string (length limit)
	# 课程评价（仅公开课程）
	level: int
	# 课程热度（仅公开课程）
	heat: int
	# 课程图标 url
	imagePath: string
	# 课程所属类别
	category: int
}
*/

/**
 * 
 * @param {string} courseName name of courses in the query result contains this string
 * @param {int} category specify the caategory of courses
 * @param {string} orderBy order strategy of the results
 * @param {int} pageNum which page to show, default to 1
 * @param {int} pageSize number of courses per page, default to 5
 */
function fetchCourses(courseName, category, orderBy, pageNum = 1, pageSize = 5) {
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