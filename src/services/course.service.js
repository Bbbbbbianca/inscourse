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
        // console.log(res)
        if (res.statusCode == 200) {
          UtilService.showHint('搜索成功', '', 'success')
          compo.updateCourses(res.data.courses)
        } else {
          UtilService.showHint(res.data, '', 'none')
        }
      },
      fail: function (res) {
        // console.log(res);
        UtilService.showHint('修改用户名失败', '请稍后重试', 'fail');
      }
		});
	},

	upload_course: function (courseName, description, category) {
		try {
			var token = Taro.getStorageSync('token')
		} catch (e) {
			UtilService.showHint('登录状态失效', '请重新进入小程序', 'none');
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
			// console.log(res.data)
        UtilService.showHint(res.data.message, '', 'success')
		  },
		  fail: function (res) {
			// console.log(res);
        UtilService.showHint(res.message, '', 'none');
		  }
		})
	  }
}

export default CourseService;
