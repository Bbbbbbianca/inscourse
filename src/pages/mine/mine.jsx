import React, { Component } from 'react'
import { Image, View, Text} from '@tarojs/components'
import './mine.scss'
import heatPic from "../../assets/images/heat.png";
import Taro from "@tarojs/taro";
import UtilService from "../../services/utils";
import {APP_ROUTES} from "../../base/constant";

export default class Mine extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showJoinedCourse: true,
      showInvitations: false,
      optionOnIvtId: -1,
      optionOnIvtCode: '',
      optionOnIvtVisible: false,
      ivtDelDialogVisible: false,
      ivtCodeDialogVisible: false,
      user: {},
      courses: [],
      invitations: [],
    };
  }
  // 获取初始数据
  componentDidShow() {
    this.getMyInfo();
    this.getJoinedCourses();
    this.getInvitations();
  }
  getMyInfo() {
    let token = UtilService.fetchToken()
    let that = this;
    Taro.request({
      url: UtilService.BASE_URL + '/sys/getMyInfo',
      header: {
        'Token': token
      },
      method: 'GET',
      success: function (res) {
        if (res.statusCode == 200) {
          that.setState({
            user: res.data.user
          })
        } else {
          UtilService.showHint(res.data, '', 'none')
        }
      },
      fail: function (res) {
        UtilService.showHint('获取用户信息失败', '', 'none');
      }
    })
  }
  getJoinedCourses() {
    let token = UtilService.fetchToken()
    let that = this;
    Taro.request({
      url: UtilService.BASE_URL + '/course/queryMyJoinedCourse',
      header: {
        'Token': token
      },
      method: 'GET',
      success: function (res) {
        // console.log(res);
        if (res.statusCode == 200) {
          that.setState({
            courses: res.data.courses
          })
        } else {
          UtilService.showHint(res.data, '', 'none')
        }
      },
      fail: function (res) {
        UtilService.showHint('获取加入课程失败', '', 'none');
      }
    })
  }
  getInvitations() {
    this.setState({
      invitations:[
        {
          invitation_id: 1,
          invitation_code: 'HGFTUO',
          course_id: 1,
          description: 'lalalallal阿萨德就啊哈是多久阿萨德会撒娇的感觉啊哈是的哈就是啊还是大家撒的是大家撒的赶回家撒的a',
          request_time: '2021/1/1'
        }
      ]
    })
  }
  // 修改个人信息
  modifyInfo(id) {
    // console.log(id)
    Taro.navigateTo({
      url: APP_ROUTES.MODIFYINFO + '?workspace=' + this.state.user.workspace + '&email=' + this.state.user.email
            + '&username=' + this.state.user.username
    })
  }
  // 导航
  toShowJoinedCourse() {
    this.setState({
      showInvitations: false,
      showJoinedCourse: true
    })
  }
  toshowInvitations() {
    this.setState({
      showInvitations: true,
      showJoinedCourse: false
    })
  }
  // 查看课程
  onViewmine(id) {
    // console.log(id)
    Taro.navigateTo({
      url: APP_ROUTES.mine +'?id=' + id
    })
  }
  // 显示邀请的相关操作
  showOptionOnIvt(id, code) {
    this.setState({
      optionOnIvtVisible: true,
      optionOnIvtId: id,
      optionOnIvtCode: code
    })
  }
  // 查看邀请码
  toShowIvtCodeDialog() {
    this.setState({
      optionOnIvtVisible: false,
      ivtCodeDialogVisible: true
    })

  }
  toCopyIvtCode(code){
    wx.setClipboardData({
      data: code,
      success: function (res) {
        console.log("复制成功:", res)
      },
    })
    this.setState({
      ivtCodeDialogVisible: false
    })
  }
  toExitIvtCode(){
    this.setState({
      ivtCodeDialogVisible: false
    })
  }
  // 删除邀请
  toShowDeleteIvtDialog() {
    this.setState({
      optionOnIvtVisible: false,
      ivtDelDialogVisible: true
    })
  }
  toDeleteIvt(id) {
    // TO DO
    this.setState({
      ivtDelDialogVisible: false
    })
  }
  toCancelDeleteIvt() {
    this.setState({
      ivtDelDialogVisible: false
    })

  }

  render () {
    return (
      <View className='mine'>
        {/*个人信息*/}
        <View className='mine-msg'>
          <Image src={UtilService.BASE_URL + '/sys/getUserAvatar?user_id=' + this.state.user.user_id} className='mine-msg-img' />
          <View className='mine-msg-text'>
            <View className='mine-msg-text-top'>
              <View className='mine-msg-title'>
                {this.state.user.username}
              </View>
              {/*修改按钮*/}
              <View onClick={()=>{this.modifyInfo(this.state.user.user_id)}} className='mine-msg-button'>修改</View>
            </View>
            <View className='mine-msg-dct'>
              <View>公司/学校: {this.state.user.workspace}</View>
              <View>邮箱: {this.state.user.email}</View>
            </View>
          </View>
        </View>

        {/*细分页面*/}
        <View className='mine-relevant'>
          {/*导航栏*/}
          <View className='mine-choice'>
            <View className='mine-choice-course' onClick={()=>{this.toShowJoinedCourse()}}>我的课程</View>
            <View className='mine-choice-course' onClick={()=>{this.toshowInvitations()}}>我的邀请</View>
          </View>
          {/*所有课程*/}
          <View>
            {this.state.showJoinedCourse ?
                <View className='mine-course'>
                  <View className='mine-course-list'>
                    { this.state.courses.map((course)=>(
                        <View key={course.course_id} className='mine-course-item' onClick={()=>{this.onViewmine(course.course_id)}}>
                          <Image src={UtilService.BASE_URL + '/course/getCourseIcon?course_id=' + course.course_id} className='mine-course-img' />
                          <View className='mine-course-text'>
                            <View className='mine-course-name'>{course.name}</View>
                            <View className='mine-course-heat'>
                              <Image src={heatPic} className='mine-course-heat-img'/>{course.heat}
                            </View>
                          </View>
                        </View>
                    ))}
                  </View>
                  <View className='mine-course-end-line'>
                    ----------  没有更多了 &lt;(＃＃)&gt;彡  ----------
                  </View>
                </View>
            : null}
          </View>
          {/*我的邀请*/}
          <View>
            {this.state.showInvitations ?
                <View className='mine-ivt'>
                  <View className='mine-ivt-list'>
                    { this.state.invitations.map((invitation)=>(
                        <View key={invitation.invitation_id} className='mine-ivt-item' onClick={()=>{this.showOptionOnIvt(invitation.invitation_id, invitation.invitation_code)}}>
                          <Image src={UtilService.BASE_URL + '/course/getCourseIcon?course_id=' + invitation.course_id} className='mine-ivt-img' />
                          <View className='mine-ivt-text'>
                            <View className='mine-ivt-dct'>{invitation.description}</View>
                            <View className='mine-ivt-time'>{'发布时间：' + invitation.request_time}</View>
                          </View>
                        </View>
                    ))}
                  </View>
                  <View className='mine-ivt-end-line'>
                    ----------  没有更多了 &lt;(＃＃)&gt;彡  ----------
                  </View>
                </View>
            : null}
          </View>
        </View>
        {/*邀请下拉框*/}
        <View>
          {
          this.state.optionOnIvtVisible
          ?
          <View>
            <View className='mine-mask' />
            <View className='mine-layout'>
              <View
                className='mine-layout-ivt'
                onClick={()=>{this.toShowIvtCodeDialog()}}
              >
                查看邀请码
              </View>
              <View
                className='mine-layout-delete'
                onClick={()=>{this.toShowDeleteIvtDialog()}}
              >
                删除邀请
              </View>
            </View>
          </View>
          :
          null
        }
        </View>
        {/*删除邀请提示框*/}
        <View>
        { this.state.ivtDelDialogVisible ?
          <View>
            <View className='mine-mask' />
              <View className='mine-tip'>
              <View className='mine-tip-text'>
                确认删除邀请？
              </View>
              <View className='mine-tip-button'>
                <View className='mine-tip-comfirm' onClick={()=>{this.toDeleteIvt(this.state.optionOnIvtId)}}>
                  Yes！
                </View>
                <View className='mine-tip-cancel' onClick={()=>{this.toCancelDeleteIvt()}}>
                  Wait..
                </View>
              </View>
            </View>
          </View>
        : null }
        </View>
        {/*邀请码显示框*/}
        <View>
          { this.state.ivtCodeDialogVisible ?
            <View>
              <View className='mine-mask' />
              <View className='mine-code'>
                <View className='mine-code-title'>
                  复制邀请码给你的小伙伴吧！
                </View>
                <Text className='mine-code-text' selectable='true'>
                  {this.state.optionOnIvtCode}
                </Text>
                <View className='mine-code-button'>
                  <View className='mine-code-copy' onClick={()=>{this.toCopyIvtCode(this.state.optionOnIvtCode)}}>
                    Copy
                  </View>
                  <View className='mine-code-exit' onClick={()=>{this.toExitIvtCode()}}>
                    Exit
                  </View>
                </View>
              </View>
            </View>
          : null  }
        </View>
      </View>
    )
  }
}
