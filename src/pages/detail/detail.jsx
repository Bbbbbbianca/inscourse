import React, { Component } from 'react'
import { View, Image, Button, Text, Textarea } from '@tarojs/components'
import Taro from '@tarojs/taro'
import { AtFab } from 'taro-ui'
import { APP_ROUTES } from "../../base/constant"
import './detail.scss'
import heatPic from '../../assets/images/heat.png'
import UtilService from "../../services/utils";
import addPic from '../../assets/images/add.png'
import preferPic from '../../assets/images/prefer.png'
import favorPic from '../../assets/images/favor.png'
import personPic from '../../assets/images/person.png'

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
      course: {},
      showType: 0,
      maskVisible: false,
      addIvtDialogVisible: false,
      acceptIvtDialogVisible: false,
      joinMateDialogVisible: false,
      endIvtDialogVisible: false,
      addDescription: '',
      joinCode: '',
      course: {},
      resources: [
        // {
        //   resource_id: 1,
        //   resource_key: '一份学习笔记',
        //   description: '学习整理了第二章的内容，欢迎取用～',
        //   author_id: 1,
        //   heat: 577,
        //   content_type: 1,
        //   content: '1.数学分析是学不会的 2.数学分析是听不懂的 3.数学分析是要人命的',
        // },
        // {
        //   resource_id: 2,
        //   resource_key: '教材资料',
        //   description: '第三版的pdf版本，拿下留赞',
        //   author_id: 8,
        //   heat: 9,
        //   content_type: 2,
        //   content: '复制这段话粘贴到百度网盘···',
        // },
        // {
        //   resource_id: 3,
        //   resource_key: '交大网课',
        //   description: '交大教授讲第四章很好的视频',
        //   author_id: 11,
        //   heat: 1109,
        //   content_type: 2,
        //   content: 'http://jiaodanb.com',
        // }
      ],
      cars: [
        {
          invitation_id: 1,
          requester_img: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1605983591981&di=b075a1308a8228ac2e016f0b04c44e63&imgtype=0&src=http%3A%2F%2Fp6.itc.cn%2Fmpbp%2Fpro%2F20200927%2Ffc5dd7d801304fdb83b9f37c07ae97ae.jpeg',
          requester_name: 'lalal',
          invitation_code: '',
          requst_time: '2020/11/11',
          description: '啦啦啦找个好朋友,打算六月份开始暑假一起学数学分析所以有人吗有人吗'
        },
        {
          invitation_id: 2,
          requester_img: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1605983591981&di=b075a1308a8228ac2e016f0b04c44e63&imgtype=0&src=http%3A%2F%2Fp6.itc.cn%2Fmpbp%2Fpro%2F20200927%2Ffc5dd7d801304fdb83b9f37c07ae97ae.jpeg',
          requester_name: 'lalal',
          invitation_code: '',
          requst_time: '2020/11/11',
          description: '哈哈哈哈一起划水有人吗有人吗 有人吗有人吗有人吗有人吗有人吗有人吗有人吗有人吗有人吗有人吗有人吗有人吗有人吗有人吗有人吗有人吗有人吗有人吗有人吗有人吗v有人吗有人吗有人吗有人吗v'
        },
        {
          invitation_id: 3,
          requester_img: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1605983591981&di=b075a1308a8228ac2e016f0b04c44e63&imgtype=0&src=http%3A%2F%2Fp6.itc.cn%2Fmpbp%2Fpro%2F20200927%2Ffc5dd7d801304fdb83b9f37c07ae97ae.jpeg',
          requester_name: 'lalal',
          invitation_code: '',
          requst_time: '2020/11/11',
          description: '阿巴阿巴'
        },
        {
          invitation_id: 4,
          requester_img: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1605983591981&di=b075a1308a8228ac2e016f0b04c44e63&imgtype=0&src=http%3A%2F%2Fp6.itc.cn%2Fmpbp%2Fpro%2F20200927%2Ffc5dd7d801304fdb83b9f37c07ae97ae.jpeg',
          requester_name: 'lalal',
          invitation_code: '',
          requst_time: '2020/11/11',
          description: '阿巴阿巴'
        },
        {
          invitation_id: 5,
          requester_img: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1605983591981&di=b075a1308a8228ac2e016f0b04c44e63&imgtype=0&src=http%3A%2F%2Fp6.itc.cn%2Fmpbp%2Fpro%2F20200927%2Ffc5dd7d801304fdb83b9f37c07ae97ae.jpeg',
          requester_name: 'lalal',
          invitation_code: '',
          requst_time: '2020/11/11',
          description: '阿巴阿巴'
        }
      ],
    };
    let course_id = getCourseId();
    console.log(this.state.icon)
    this.getCourseDetail(course_id)
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
        console.log(res.data.course)
        that.setState({
          course: res.data.course
        });
        that.setState({
          is_joined: res.data.course.is_joined
        })

        if (res.data.course.is_joined) {
          that.getCourseResources(that.state.course.course_id, that.state.showType)
        }
      },
      fail: function (res) {
        console.log(res);
        UtilService.showHint('获取课程信息失败', '请稍后重试', 'fail');
      }
    })
  }

  getCourseResources(course_id, content_type) {
    this.setState({
      showType: content_type
    });
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
        console.log(res.data.resources)
        that.setState({
          resources: res.data.resources
        });
      },
      fail: function (res) {
        console.log(res);
        UtilService.showHint('获取课程信息失败', '请稍后重试', 'fail');
      }
    })
  }

  toJoinCourse(invitation_code) {
    console.log('join ' + invitation_code)
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
          console.log(res.data.message)
          that.setState({
            is_joined: true
          });
          UtilService.showHint(res.data.message, '', 'success')
          that.getCourseResources(that.state.course.course_id, that.state.showType);
        } else {
          UtilService.showHint(res.data, '', 'none')
        }
      },
      fail: function (res) {
        console.log(res);
        UtilService.showHint(res.message, '', 'fail');
      }
    })
  }

  toShowCar() {
    this.setState({
      showCar: true,
      showRes: false
    })
  }

  toShowRes() {
    this.setState({
      showCar: false,
      showRes: true
    })
  }

  onViewResDetail(id) {
    console.log('view detail of resource' + id)
    Taro.navigateTo({
      url: APP_ROUTES.RESOURCE + '?id=' + id
    })
  }

  toAddResource() {
    console.log('to add resource')
    Taro.navigateTo({
      url: APP_ROUTES.ADDRES
    })
  }

  toShowAddInvitationDialog() {
    console.log('add invitation dialog visible.')
    this.setState({
      maskVisible: true,
      addIvtDialogVisible: true
    })
  }

  onChangeDescription(e) {
    console.log(e.target.value)
    this.setState({
      addDescription: e.target.value
    })
  }

  toAddInvitation() {
    console.log('to add invitation')
    this.setState({
      maskVisible: false,
      addIvtDialogVisible: false
    })
    // TO DO
    console.log(this.state.addDescription)
  }
  toCancelAddInvitation() {
    console.log('cancel add invitation')
    this.setState({
      maskVisible: false,
      addIvtDialogVisible: false
    })
  }

  toShowAcceptInvitationDialog() {
    console.log('accept invitation dialog visible.')
    this.setState({
      maskVisible: true,
      acceptIvtDialogVisible: true
    })
  }

  onChangeJoinCode(e) {
    this.setState({
      joinCode: e.target.value
    })
  }

  toAcceptInvitation() {
    console.log('to accept invitation')
    this.setState({
      maskVisible: false,
      acceptIvtDialogVisible: false
    })
    // TO DO
    console.log(this.state.joinCode)
  }
  toCancelAcceptInvitation() {
    console.log('cancel accept invitation')
    this.setState({
      maskVisible: false,
      acceptIvtDialogVisible: false
    })
  }

  toShowTipDialog() {
    console.log('join mate dialog visible.')
    this.setState({
      maskVisible: true,
      joinMateDialogVisible: true
    })
    // if the invitation is owned by the user
    // this.setState({
    //   maskVisible: true,
    //   cancelMateDialogVisible: true
    // })
    // TO DO
  }

  toJoinMate() {
    console.log('to join mate')
    this.setState({
      maskVisible: false,
      joinMateDialogVisible: false
    })
    // TO DO
  }
  toCancelJoinMate() {
    console.log('cancel join mate')
    this.setState({
      maskVisible: false,
      joinMateDialogVisible: false
    })
  }

  toEndIvt() {
    console.log('to end invitation')
    this.setState({
      maskVisible: false,
      endIvtDialogVisible: false
    })
    // TO DO
  }
  toCancelEndIvt() {
    console.log('cancel end invitation')
    this.setState({
      maskVisible: false,
      endIvtDialogVisible: false
    })
  }

  render() {
    return (
      <View className='detail'>
        <View className='detail-msg'>
          <Image
            src={'http://localhost:8000/api/course/getCourseIcon?course_id=' + this.state.course.course_id}
            className='detail-msg-img'
          />
          <View className='detail-msg-text'>
            <View className='detail-msg-text-top'>
              <View className='detail-msg-title'>
                {this.state.course.name}
              </View>
              {
                this.state.is_joined
                  ?
                  <Button
                    className='detail-msg-button-join'
                  >
                    已加入
                  </Button>
                  :
                  <Button
                    onClick={() => {
                      this.toJoinCourse(this.state.course.invitation_code)
                    }}
                    className='detail-msg-button-join'
                  >
                    加入
                  </Button>
              }

            </View>
            <View className='detail-msg-dct'>
              {this.state.course.description}
            </View>
            <View className='detail-msg-text-bottom'>
              <View className='detail-msg-heat'>
                {this.state.course.heat}
              </View>
              <Image
                src={heatPic}
                className='detail-msg-heat-img'
              />
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
                      this.toSearchResbyType(4)
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
                   -------------------------  没有更多了 &lt;(＃＃)&gt;彡    -------------------------
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
                  onClick={()=>{this.toShowTipDialog()}}
                >
                  <Image
                    src={car.requester_img}
                    className='detail-car-img'
                  />
                  <View className='detail-car-text'>
                    <View className='detail-car-dct'>
                      {car.description}
                    </View>
                    <View className='detail-car-bottom'>
                      <View className='detail-car-inviter'>
                        {'发布者：' + car.requester_name}
                      </View>
                      <View className='detail-car-time'>
                        {'发布时间：' + car.requst_time}
                      </View>
                    </View>
                  </View>
                </View>
                ))}
              </View>
            </View>
            :
            null
            }
          </View>
        </View>
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
              onChange={(e)=>{this.onChangeDescription(e)}}
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
              onInput={(e)=>{this.onChangeJoinCode(e)}}
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
          <View className='detail-car-tip'>
            <View className='detail-car-tip-text'>
              是否建立课友关系？
            </View>
            <View className='detail-car-tip-button'>
              <View
                className='detail-car-tip-comfirm'
                onClick={()=>{this.toJoinMate()}}
              >
                Yes！
              </View>
              <View
                className='detail-car-tip-cancel'
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
          <View className='detail-car-tip'>
            <View className='detail-car-tip-text'>
              是否结束邀请？
            </View>
            <View className='detail-car-tip-button'>
              <View
                className='detail-car-tip-comfirm'
                onClick={()=>{this.toEndIvt()}}
              >
                Yes！
              </View>
              <View
                className='detail-car-tip-cancel'
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
      </View>
    )
  }
}

