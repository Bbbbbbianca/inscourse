import Taro from '@tarojs/taro'

const UtilService = {
  // BASE_URL: "http://localhost:8000/api",
	BASE_URL: "http://116.63.39.40:8000/api",

	/**
	 *
	 * @param {string} title
	 * @param {string} content
	 * @param {string} type
	 */
	 showHint: function (title, content, type, duration=1500) {
		 Taro.showToast({
			 title: title,
			 icon: type,
			 duration: duration
		 });
	},

	fetchToken: function () {
    try {
      return Taro.getStorageSync('token')
    } catch (e) {
      UtilService.showHint('登录状态失效', '请重新进入小程序', 'fail');
      return null;
    }
  }
}

export default UtilService;
