import React, { Component } from 'react'
import { View, Image, Button, Text, Textarea } from '@tarojs/components'
import Taro from '@tarojs/taro'
import { AtFab } from 'taro-ui'
import { APP_ROUTES } from "../../base/constant"
import './detail.scss'
import heatPic from '../../assets/images/heat.png'
import UtilService from "../../services/utils";
import addPic from '../../assets/images/add.png'
import favorPic from '../../assets/images/favor.png'
import sharePic from '../../assets/images/share.png'

function getCourseId() {
  let course_id = Taro.getCurrentInstance().router.params.id
  if (course_id)
    return course_id
  else {
    Taro.navigateTo({
      url: APP_ROUTES.COURSE
    })
  }
}

export default class Detail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showRes: true,
      showCar: false,
      showType: -1,
      is_joined: false,
      is_owner: false,
      is_public: false,
      maskVisible: false,
    // 四个弹出框显示参数
      addIvtDialogVisible: false,
      acceptIvtDialogVisible: false,
      joinMateDialogVisible: false,
      endIvtDialogVisible: false,
      pubCourseDialogVisible: false,
      delCourseDialogVisible: false,
      ivtCodeDialogVisible: false,
    // 发起邀请的描述信息
      addDescription: '',
    // 接受邀请的邀请码信息
      joinCode: '',
      course: {},
      resources: [],
      cars: [],
    };
    let course_id = getCourseId();
    // console.log(this.state.icon)
    this.getCourseDetail(course_id)
    this.getCourseResources(course_id, this.state.showType)
  }

  getOpenInvitations(id) {
    let token = UtilService.fetchToken();
    let that = this;
    Taro.request({
      url: UtilService.BASE_URL + '/mate/queryCourseMateInvitations',
      header: {
        'Token': token
      },
      data: {
        'course_id': id,
      },
      method: 'GET',
      success: function (res) {
        // console.log(res)
        // console.log(res.data)
        // console.log(res.data.invitations)
        if (res.statusCode == 200) {
          that.setState({
            cars: res.data.invitations
          });
        }
      },
      fail: function (res) {
        // console.log(res);
        UtilService.showHint('获取收藏列表失败', '请稍后重试', 'fail');
      }
    })
  }
  getCourseDetail(id) {
    let token = UtilService.fetchToken();
    let that = this;
    Taro.request({
      url: UtilService.BASE_URL + '/course/queryCertainCourse',
      header: {
        'Token': token
      },
      data: {
        'course_id': id
      },
      method: 'GET',
      success: function (res) {
        if (res.statusCode == 200) {
          // console.log(res.data.course)
          that.setState({
            course: res.data.course
          });
          that.setState({
            is_joined: res.data.course.is_joined
          })

          if (res.data.course.is_joined) {
            that.getCourseResources(that.state.course.course_id, that.state.showType)
          }
        }
      },
      fail: function (res) {
        // console.log(res);
        UtilService.showHint('获取课程信息失败', '请稍后重试', 'fail');
      }
    })
  }
  getFavoredResources(course_id) {
    let token = UtilService.fetchToken();
    let that = this;
    Taro.request({
      url: UtilService.BASE_URL + '/resource/queryFavoredResources',
      header: {
        'Token': token
      },
      data: {
        'course_id': course_id,
      },
      method: 'GET',
      success: function (res) {
        // console.log(res.data.resources)
        if (res.statusCode == 200) {
          that.setState({
            resources: res.data.resources
          });
        }
      },
      fail: function (res) {
        // console.log(res);
        UtilService.showHint('获取收藏列表失败', '请稍后重试', 'fail');
      }
    })
  }
  getCourseResources(course_id, content_type) {
    this.setState({
      showType: content_type
    })
    let token = UtilService.fetchToken();
    let that = this;
    Taro.request({
      url: UtilService.BASE_URL + '/resource/queryResourceByCourse',
      header: {
        'Token': token
      },
      data: {
        'course_id': course_id,
        'content_type': content_type
      },
      method: 'GET',
      success: function (res) {
        // console.log(res.data.resources)
        if (res.statusCode == 200) {
          that.setState({
            resources: res.data.resources
          });
        }
      },
      fail: function (res) {
        // console.log(res);
        UtilService.showHint('获取资源列表失败', '请稍后重试', 'fail');
      }
    })
  }
  // 加入和退出课程
  toJoinCourse(invitation_code) {
    // console.log('join ' + invitation_code)
    let token = UtilService.fetchToken();
    let that = this;
    Taro.request({
      url: UtilService.BASE_URL + '/course/joinCourse',
      header: {
        'Token': token
      },
      data: {
        'invitation_code': invitation_code
      },
      method: 'POST',
      success: function (res) {
        if (res.statusCode == 200) {
          // console.log(res.data.message)
          that.setState({
            is_joined: true
          });
          UtilService.showHint(res.data.message, '', 'success', 1200)
        } else {
          UtilService.showHint(res.data, '', 'none')
        }
      },
      fail: function (res) {
        // console.log(res);
        UtilService.showHint(res.message, '', 'fail');
      }
    })
  }
  toQuitCourse(course_id) {
    console.log('to quit course ' + course_id)
    // TO DO
    let token = UtilService.fetchToken();
    let that = this;
    Taro.request({
      url: UtilService.BASE_URL + '/course/dropOutCourse',
      header: {
        'Token': token
      },
      data: {
        'course_id': course_id
      },
      method: 'POST',
      success: function (res) {
        if (res.statusCode == 200) {
          that.setState({
            is_joined: false
          });
          UtilService.showHint(res.data.message, '', 'success', 1200)
        } else {
          UtilService.showHint(res.data, '', 'none')
        }
      },
      fail: function (res) {
        UtilService.showHint('退出课程失败', '请稍后重试', 'fail');
      }
    })
  }
  // 公开课程
  toShowPubCourseDialog(invitation_code) {
    this.setState({
      maskVisible: true,
      pubCourseDialogVisible: true,
      joinCode: invitation_code
    })
  }
  toPublicCourse(invitation_code) {
    console.log('to public course' + invitation_code)
    // TO DO
    this.setState({
      maskVisible: false,
      pubCourseDialogVisible: false
    })
  }
  toCancelPublicCourse(){
    this.setState({
      maskVisible: false,
      pubCourseDialogVisible: false
    })
  }
  // 删除课程
  toShowDelCourseDialog(invitation_code) {
    this.setState({
      maskVisible: true,
      delCourseDialogVisible: true,
      joinCode: invitation_code
    })
  }
  toDeleteCourse(invitation_code) {
    console.log('to delete course' + invitation_code)
    // TO DO
    this.setState({
      maskVisible: false,
      delCourseDialogVisible: false
    })
  }
  toCancelDeleteCourse() {
    this.setState({
      maskVisible: false,
      delCourseDialogVisible: false
    })
  }
  //获取资源、课友信息
  toShowCar() {
    this.setState({
      showCar: true,
      showRes: false
    })
    this.getOpenInvitations(this.state.course.course_id)
  }
  toShowRes() {
    this.setState({
      showCar: false,
      showRes: true
    })
  }
  onViewResDetail(id) {
    // console.log('view detail of resource' + id)
    Taro.navigateTo({
      url: APP_ROUTES.RESOURCE + '?id=' + id
    })
  }
  // 添加资源
  toAddResource() {
    // console.log('to add resource')
    Taro.navigateTo({
      url: APP_ROUTES.ADDRES +'?id=' + this.state.course.course_id
    })
  }
  // 新建邀请
  toShowAddInvitationDialog() {
    // console.log('add invitation dialog visible.')
    this.setState({
      maskVisible: true,
      addIvtDialogVisible: true
    })
  }
  onChangeDescription = e => {
    let value = e.detail.value
    this.setState({
      addDescription: value
    })
  }
  toAddInvitation() {
    // console.log('to add invitation')
    let token = UtilService.fetchToken();
    let that = this;
    Taro.request({
      url: UtilService.BASE_URL + '/mate/inviteMate',
      header: {
        'Token': token
      },
      data: {
        'course_id': that.state.course.course_id,
        'description': that.state.addDescription
      },
      method: 'POST',
      success: function (res) {
        if (res.statusCode == 200) {
          // console.log(res.data.message)
          UtilService.showHint(res.data.message + '\n' + res.data.invitation_code, '', 'none')
          that.getOpenInvitations(that.state.course.course_id)
        } else {
          // console.log(res)
          UtilService.showHint(res.data.message, '', 'none')
        }
      },
      fail: function (res) {
        // console.log(res);
        UtilService.showHint('发布邀请失败', '请稍后重试', 'fail');
      }
    })
    this.setState({
      maskVisible: false,
      addIvtDialogVisible: false
    })
  }
  toCancelAddInvitation() {
    // console.log('cancel add invitation')
    this.setState({
      maskVisible: false,
      addIvtDialogVisible: false
    })
  }
  // 输入邀请码接受邀请
  toShowAcceptInvitationDialog() {
    // console.log('accept invitation dialog visible.')
    this.setState({
      maskVisible: true,
      acceptIvtDialogVisible: true
    })
  }
  onChangeJoinCode = e => {
    let value = e.detail.value
    this.setState({
      joinCode: value
    })
    // console.log(this.state.joinCode)
  }
  toAcceptInvitation() {
    // console.log('to accept invitation')
    this.setState({
      maskVisible: false,
      acceptIvtDialogVisible: false
    })
    // TO DO
    // console.log(this.state.joinCode)
  }
  toCancelAcceptInvitation() {
    // console.log('cancel accept invitation')
    this.setState({
      maskVisible: false,
      acceptIvtDialogVisible: false
    })
  }
  // 点击卡片接受邀请
  toShowJoinMateDialog(invitation_code) {
    // console.log('join mate dialog visible.')
    this.setState({
      maskVisible: true,
      joinMateDialogVisible: true,
      joinCode: invitation_code
    })
  }
  toJoinMate(invitation_code) {
    // console.log('to join mate')
    let token = UtilService.fetchToken();
    Taro.request({
      url: UtilService.BASE_URL + '/mate/acceptMateInvitation',
      header: {
        'Token': token
      },
      data: {
        'invitation_code': invitation_code
      },
      method: 'POST',
      success: function (res) {
        if (res.statusCode == 200) {
          // console.log(res.data.message)
          UtilService.showHint(res.data.message, '', 'none')
        } else {
          // console.log(res)
          UtilService.showHint(res.data.message, '', 'none')
        }
      },
      fail: function (res) {
        // console.log(res);
        UtilService.showHint('接受邀请失败', '请稍后重试', 'fail');
      }
    })
    this.setState({
      maskVisible: false,
      joinMateDialogVisible: false
    })
  }
  toCancelJoinMate() {
    // console.log('cancel join mate')
    this.setState({
      maskVisible: false,
      joinMateDialogVisible: false
    })
  }
  // 查询课程邀请码
  toShareCourse() {
    this.setState({
      maskVisible: true,
      ivtCodeDialogVisible: true,
    })
  }
  toCopyCode(code) {
    wx.setClipboardData({
      data: code,
      success: function (res) {
        console.log("复制成功:", res)
      },
    })
    this.setState({
      maskVisible: false,
      ivtCodeDialogVisible: false,
    })
  }
  toExitShareDialog() {
    this.setState({
      maskVisible: false,
      ivtCodeDialogVisible: false,
    })
  }

  render() {
    return (
      <View className='detail'>
        <View className='detail-msg'>
          <Image
            src={UtilService.BASE_URL + '/course/getCourseIcon?course_id=' + this.state.course.course_id}
            className='detail-msg-img'
          />
          <View className='detail-msg-text'>
            <View className='detail-msg-text-top'>
              <View className='detail-msg-title'>
                {this.state.course.name}
              </View>
              {
                this.state.is_owner
                ?
                <View className='detail-msg-opt'>
                  <View>
                  {
                  this.state.is_public
                  ?
                  null
                  :
                  <View
                    onClick={() => {
                      this.toShowPubCourseDialog(this.state.course.invitation_code)
                    }}
                    className='detail-msg-button-public'
                  >
                    公开
                  </View>
                  }
                  </View>
                  <View
                    onClick={() => {
                      this.toShowDelCourseDialog(this.state.course.invitation_code)
                    }}
                    className='detail-msg-button-delete'
                  >
                    删除
                  </View>
                </View>
                :
                <View>
                  {
                  this.state.is_joined
                  ?
                  <View
                    onClick={() => {
                      this.toQuitCourse(this.state.course.course_id)
                    }}
                    className='detail-msg-button-join'
                  >
                    已加入
                  </View>
                  :
                  <View
                    onClick={() => {
                      this.toJoinCourse(this.state.course.invitation_code)
                    }}
                    className='detail-msg-button-join'
                  >
                    加入
                  </View>
                  }
                </View>
              }

            </View>
            <View className='detail-msg-dct'>
              {this.state.course.description}
            </View>
          </View>
        </View>
        <View className='detail-relevant'>
          <View className='detail-choice'>
            <View
              className='detail-choice-resource'
              onClick={() => {
                this.toShowRes()
              }}
            >
              资源
            </View>
            <View
              className='detail-choice-car'
              onClick={() => {
                this.toShowCar()
              }}
            >
              课友
            </View>
            <View className='detail-heat'>
              <View className='detail-heat-num'>
                {this.state.course.heat}
              </View>
              <Image
                src={heatPic}
                className='detail-heat-img'
              />
            </View>
          </View>
          <View>
            {
            this.state.showRes
              ?
              <View className='detail-resource'>
                <View className='detail-resource-type'>
                  <View
                    className='detail-resource-type-item'
                    onClick={() => {
                      this.getCourseResources(this.state.course.course_id, -1)
                    }}
                  >
                    all
                  </View>
                  <View
                    className='detail-resource-type-item'
                    onClick={() => {
                      this.getCourseResources(this.state.course.course_id, 0)
                    }}
                  >
                    docx
                  </View>
                  <View
                    className='detail-resource-type-item'
                    onClick={() => {
                      this.getCourseResources(this.state.course.course_id, 1)
                    }}
                  >
                    video
                  </View>
                  <View
                    className='detail-resource-type-item'
                    onClick={() => {
                      this.getCourseResources(this.state.course.course_id, 2)
                    }}
                  >
                    pdf
                  </View>
                  <View
                    className='detail-resource-type-item'
                    onClick={() => {
                      this.getFavoredResources(this.state.course.course_id)
                    }}
                  >
                    <Image
                      src={favorPic}
                      style='width: 14px; height: 14px;'
                    />
                  </View>
                </View>
                <View className='detail-resource-list'>
                  {this.state.resources.map((resource) => (
                    <View
                      key={resource.course_id}
                      className='detail-resource-item'
                      onClick={() => {
                        this.onViewResDetail(resource.resource_id)
                      }}
                    >
                      <View className='detail-resource-item-title'>
                        {resource.resource_key}
                      </View>
                      <View className='detail-resource-item-dct'>
                        {resource.description}
                      </View>
                      <View className='detail-resource-item-bottom'>
                        <View className='detail-resource-item-heat'>
                          {resource.favors}
                        </View>
                        <Image
                          src={heatPic}
                          className='detail-resource-item-heat-img'
                        />
                      </View>
                    </View>
                  ))}
                </View>
                <View className='detail-resource-end-line'>
                  ----------  没有更多了 &lt;(＃＃)&gt;彡  ----------
                </View>
                <AtFab className='detail-resource-add'>
                  <Image
                    src={addPic}
                    className='detail-resource-add-img'
                    onClick={()=>{this.toAddResource()}}
                  />
                </AtFab>
              </View>
              :
              null
            }
          </View>
          <View>
            {
            this.state.showCar
            ?
            <View className='detail-car'>
              <View className='detail-car-opt'>
                <View
                  className='detail-car-opt-button'
                  onClick={()=>{this.toShowAddInvitationDialog()}}
                >
                  发起邀请
                </View>
                <View
                  className='detail-car-opt-button'
                  onClick={()=>{this.toShowAcceptInvitationDialog()}}
                >
                  接受邀请
                </View>
              </View>
              <View className='detail-car-list'>
                { this.state.cars.map((car)=>(
                <View
                  key={car.invitation_id}
                  className='detail-car-item'
                  onClick={()=>{this.toShowJoinMateDialog(car.invitation_code)}}
                >
                  <Image
                    src={UtilService.BASE_URL + '/sys/getUserAvatar?user_id=' + car.requester_id}
                    className='detail-car-img'
                  />
                  <View className='detail-car-text'>
                    <View className='detail-car-dct'>
                      {car.description}
                    </View>
                    <View className='detail-car-bottom'>
                      {'发布者: ' + car.requester_name + '  发布时间: ' + car.request_time}
                    </View>
                  </View>
                </View>
                ))}
              </View>
              <View className='detail-car-end-line'>
                  ----------  没有更多了 &lt;(＃＃)&gt;彡  ----------
              </View>
            </View>
            :
            null
            }
          </View>
        </View>
        <AtFab className='detail-share'>
          <Image
            src={sharePic}
            className='detail-share-img'
            onClick={()=>{this.toShareCourse()}}
          />
        </AtFab>
        <View>
        {
          this.state.maskVisible
          ?
          <View className='detail-mask'>
          </View>
          :
          null
        }
        </View>
        <View>
        {
          this.state.addIvtDialogVisible
          ?
          <View className='detail-car-form'>
            <Text className='detail-car-form-text'>
              请输入描述：
            </Text>
            <Textarea
              className='detail-car-form-input'
              type='text'
              value={this.state.addDescription}
              onInput={this.onChangeDescription}
            />
            <View className='detail-car-form-button'>
              <View
                className='detail-car-form-comfirm'
                onClick={()=>{this.toAddInvitation()}}
              >
                确定
              </View>
              <View
                className='detail-car-form-cancel'
                onClick={()=>{this.toCancelAddInvitation()}}
              >
                取消
              </View>
            </View>
          </View>
          :
          null
        }
        </View>
        <View>
        {
          this.state.acceptIvtDialogVisible
          ?
          <View className='detail-car-form'>
            <Text className='detail-car-form-text'>
              请输入邀请码：
            </Text>
            <Textarea
              className='detail-car-form-input'
              value={this.state.joinCode}
              onInput={this.onChangeJoinCode}
            />
            <View className='detail-car-form-button'>
              <View
                className='detail-car-form-comfirm'
                onClick={()=>{this.toAcceptInvitation()}}
              >
                确定
              </View>
              <View className='detail-car-form-cancel'
                onClick={()=>{this.toCancelAcceptInvitation()}}
              >
                取消
              </View>
            </View>
          </View>
          :
          null
        }
        </View>
        <View>
          {
          this.state.joinMateDialogVisible
          ?
          <View className='detail-tip'>
            <View className='detail-tip-text'>
              是否建立课友关系？
            </View>
            <View className='detail-tip-button'>
              <View
                className='detail-tip-comfirm'
                onClick={()=>{this.toJoinMate(this.state.joinCode)}}
              >
                Yes！
              </View>
              <View
                className='detail-tip-cancel'
                onClick={()=>{this.toCancelJoinMate()}}
              >
                Wait..
              </View>
            </View>
          </View>
          :
          null
          }
        </View>
        <View>
          {
          this.state.endIvtDialogVisible
          ?
          <View className='detail-tip'>
            <View className='detail-tip-text'>
              是否结束邀请？
            </View>
            <View className='detail-tip-button'>
              <View
                className='detail-tip-comfirm'
                onClick={()=>{this.toEndIvt()}}
              >
                Yes！
              </View>
              <View
                className='detail-tip-cancel'
                onClick={()=>{this.toCancelEndIvt()}}
              >
                Wait..
              </View>
            </View>
          </View>
          :
          null
          }
        </View>
        <View>
          {
          this.state.pubCourseDialogVisible
          ?
          <View className='detail-tip'>
            <View className='detail-tip-text'>
              是否公开课程？
            </View>
            <View className='detail-tip-button'>
              <View
                className='detail-tip-comfirm'
                onClick={()=>{this.toPublicCourse()}}
              >
                Yes！
              </View>
              <View
                className='detail-tip-cancel'
                onClick={()=>{this.toCancelPublicCourse()}}
              >
                Wait..
              </View>
            </View>
          </View>
          :
          null
          }
        </View>
        <View>
          {
          this.state.delCourseDialogVisible
          ?
          <View className='detail-tip'>
            <View className='detail-tip-text'>
              是否删除课程？
            </View>
            <View className='detail-tip-button'>
              <View
                className='detail-tip-comfirm'
                onClick={()=>{this.toDeleteCourse()}}
              >
                Yes！
              </View>
              <View
                className='detail-tip-cancel'
                onClick={()=>{this.toCancelDeleteCourse()}}
              >
                Wait..
              </View>
            </View>
          </View>
          :
          null
          }
        </View>
        <View>
          {
          this.state.ivtCodeDialogVisible
          ?
          <View className='detail-code'>
            <View className='detail-code-title'>
              复制邀请码给你的小伙伴吧！
            </View>
            <Text className='detail-code-text' selectable='true'>
              {this.state.course.invitation_code}
            </Text>
            <View className='detail-code-button'>
              <View
                className='detail-code-copy'
                onClick={()=>{this.toCopyCode(this.state.course.invitation_code)}}
              >
                Copy
              </View>
              <View
                className='detail-code-exit'
                onClick={()=>{this.toExitShareDialog()}}
              >
                Exit
              </View>
            </View>
          </View>
          :
          null
          }
        </View>
      </View>
    )
  }
}
