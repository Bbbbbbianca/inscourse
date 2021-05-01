/*
export interface User {
	# 用户ID
	user_id: int
	# 用户微信ID
	wechat_id: string
	# 用户名
	username: string
	# 用户类型
	user_type: int (Enumeration [middleSchool/undergraduate/postgraduate/doctor/others])
}
*/

function wxLogin() {
	return {
		user_id: 1,
		wechat_id: 'icer_wxid',
		username: 'magicAdmin',
		user_type: 0
	};
}