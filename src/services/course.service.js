import Taro from '@tarojs/taro'
import UtilService from './utils'

const CourseService = {

	fetchOpenCourses: function (courseName, category, orderBy, pageNum = 1, pageSize = 5, compo) {
	  let token = UtilService.fetchToken();

		Taro.request({
			url: UtilService.BASE_URL + '/course/queryOpenCourses',
      header: {
        'Token': token
      },
			data: {
				'name': courseName,
				'category': category,
				'order_by': orderBy,
				'page_num': pageNum,
				'page_size': pageSize
			},
			method: 'GET',
      success: function (res) {
        console.log(res.data)
        UtilService.showHint('搜索成功', '', 'success')
        compo.updateCourses(res.data.courses)
      },
      fail: function (res) {
        console.log(res);
        UtilService.showHint('修改用户名失败', '请稍后重试', 'fail');
      }
		});


		return [
			{
				course_id: 1,
				author_id: 1,
				status: 1, // public status
				name: 'Java Programming language',
				description: 'A classic course for programming developers to learn the feature of Java language.',
				level: 5,
				heat: 100,
				image_path: 'unknown',
				category: 1
			},
			{
				course_id: 2,
				author_id: 1,
				status: 1, // public status
				name: 'Operating System',
				description: 'This course give you basic concepts and ideas of all kinds of operating systems such as Windows, Linux and MacOS. ',
				level: 4,
				heat: 200,
				image_path: 'unknown',
				category: 1
			},
			{
				course_id: 3,
				author_id: 1,
				status: 1, // public status
				name: 'Cryptography',
				description: 'This is a magical course.',
				level: 4,
				heat: 100,
				image_path: 'unknown',
				category: 1
			},
			{
				course_id: 4,
				author_id: 1,
				status: 1, // public status
				name: 'Linear Algebra',
				description: 'This is also a magical math course. You will not want to take this course .',
				level: 4,
				heat: 120,
				image_path: 'unknown',
				category: 1
			},
			{
				course_id: 5,
				author_id: 1,
				status: 1, // public status
				name: 'Cooking',
				description: 'Let\'s go to the kitchen!',
				level: 4,
				heat: 120,
				image_path: 'unknown',
				category: 1
			},
		];
	},

	upload_course: function (courseName, description, category) {
		try {
			var token = Taro.getStorageSync('token')
		} catch (e) {
			UtilService.showHint('登录状态失效', '请重新进入小程序', 'fail');
			return;
		}

		Taro.request({
		  url: UtilService.BASE_URL + '/sys/uploadCourse',
		  header: {
			'HTTP_AUTHORIZATION': token
		  },
		  data: {
			'name': courseName,
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
}

export default CourseService;
