import Taro from '@tarojs/taro'
import UtilService from './utils'
import { APP_ROUTES } from "../base/constant"

function inscourseLogin(wxUsername, avatarUrl) {
  Taro.login({
    success: function (res) {
      console.log(res.code);
      Taro.request({
        url: UtilService.BASE_URL + '/sys/login',
        data: {
          'code': res.code,
          'username': wxUsername,
          'avatar_url': avatarUrl
        },
        method: 'POST',
        success: function (res) {
          console.log(res.data);
          // save the user info in local storage
          try {
            Taro.setStorage({
              key: "user",
              data: res.data.user,
            });
            Taro.setStorage({
              key: "token",
              data: res.data.token,
            });
            UtilService.showHint('登陆成功', '', 'success');
            Taro.switchTab({
              url: APP_ROUTES.COURSE
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
}

const UserService = {

	wxLogin: function() {
    Taro.getUserProfile({
      lang: 'zh_CN',
      desc: "获取你的昵称、头像、地区及性别",
      success: response => {
        console.log(response);
        let wxUsername = response.userInfo.nickName;
        let avatarUrl = response.userInfo.avatarUrl;
        inscourseLogin(wxUsername, avatarUrl);
      },
      fail: () => {
        console.error("您拒绝了请求");
        return;
      }}
    );


	},

	changeUsername: function(newName) {
    let token = UtilService.fetchToken();

		Taro.request({
		  url: UtilService.BASE_URL + '/sys/changeUsername',
		  header: {
			'Token': token
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
