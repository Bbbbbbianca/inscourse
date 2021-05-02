import Taro from '@tarojs/taro'
import UtilService from './utils'

const UserService = {
	wxLogin: function() {
		Taro.login({
		  success: function (res) {
			Taro.request({
			  url: UtilService.BASE_URL + '/sys/login',
			  data: {
				'code': res.code
			  },
			  method: 'POST',
			  success: function (res) {
				console.log(res.data);
				// save the user info in local storage
				try {
				  Taro.setStorageSync({
					key: "user",
					data: res.data.user,
				  });
				  Taro.setStorageSync({
					key: "token",
					data: res.data.token,
				  });
				  Taro.switchTab({
					url: '../course/course'
				  })
				} catch (e) {
				  console.log(e);
				  return false;
				}
			  },
			  fail: function (res) {
				console.log(res.message);
			  }
			})
		  },
		  fail: function (res) {
			console.log(res.message);
		  }
		});
	},

	changeUsername: function(newName) {
		try {
		  var token = Taro.getStorageSync('token')
		} catch (e) {
			UtilService.showHint('修改用户名失败', '请稍后重试', 'fail');
		}
	  
		Taro.request({
		  url: BASE_URL + '/sys/changeUsername',
		  header: {
			'HTTP_AUTHORIZATION': token
		  },
		  data: {
			'newName': newName
		  },
		  method: 'POST',
		  success: function (res) {
			console.log(res.data)
			UtilService.showHint(res.data.message, '', 'success')
		  },
		  fail: function (res) {
			console.log(res);
			UtilService.showHint('修改用户名失败', '请稍后重试', 'fail');
		  }
		})
	}
}

export default UserService;