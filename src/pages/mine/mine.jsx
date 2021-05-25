import React, { Component } from 'react'
import {Button, Image, View} from '@tarojs/components'
import './mine.scss'
import heatPic from "../../assets/images/heat.png";
import Taro from "@tarojs/taro";
import UtilService from "../../services/utils";
import {APP_ROUTES} from "../../base/constant";

export default class Mine extends Component {

  constructor(props) {
    super(props);
    this.state = {
      showJoined: true,
      showAssignments: false,
      user: {
        user_id: 1,
        image_path: 'https://www.jb51.net/images/logo.gif',
        username: '云离沧流',
        workspace: '复旦大学',
        email: '23768945612@qq.com'
      },
      courses: [],
      // assignments: [
      //   {
      //     assignment_id: 1,
      //     course_name: '电竞教学',
      //     status: 0,
      //     assignment_date: '2021-6-1',
      //   },
      //   {
      //     assignment_id: 2,
      //     course_name: '飞雷神教学',
      //     status: 0,
      //     assignment_date: '2021-6-1',
      //   },
      //   {
      //     assignment_id: 2,
      //     course_name: '李白教学',
      //     status: 1,
      //     assignment_date: '2021-6-1',
      //   }
      // ],
      // assignment_state: 0
    };
  }

  componentDidShow() {
    this.getMyInfo();
    this.getJoinedCourses();
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
        console.log(res);
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

  modifyInfo(id) {
    console.log(id)
    Taro.navigateTo({
      url: APP_ROUTES.MODIFYINFO + '?workspace=' + this.state.user.workspace + '&email=' + this.state.user.email
            + '&username=' + this.state.user.username
    })
  }

  toShowJoined() {
    this.setState({
      showAssignments: false,
      showJoined: true
    })
  }

  toShowAssignments() {
    this.setState({
      showAssignments: true,
      showJoined: false
    })
  }

  onViewDetail(id) {
    console.log(id)
    Taro.navigateTo({
      url: APP_ROUTES.DETAIL +'?id=' + id
    })
  }

  toShowAssignmentByState(state) {
    this.setState({
      assignment_state: state
    })
  }

  toAssignmentDetail(id) {
    console.log(id)
  }

  render () {
    return (
      <View className='mine'>

        {/*个人信息*/}
        <View className='mine-msg'>
          <Image src={this.state.user.image_path} className='mine-msg-img' />
          <View className='mine-msg-text'>
            <View className='mine-msg-text-top'>
              <View className='mine-msg-title'>
                {this.state.user.username}
              </View>
              {/*修改按钮*/}
              <Button onClick={()=>{this.modifyInfo(this.state.user.user_id)}} className='mine-msg-button-join'>修改</Button>
            </View>
            <View className='mine-msg-dct'>
              <View>公司/学校: {this.state.user.workspace}</View>
              <View>邮箱: {this.state.user.email}</View>
            </View>
            <View className='mine-msg-dct'>

            </View>
          </View>
        </View>

        {/*细分页面*/}
        <View className='mine-relevant'>

          {/*导航栏*/}
          <View className='mine-choice'>
            <View className='mine-choice-joined' onClick={()=>{this.toShowJoined()}}>所有课程</View>
            {/*<View className='mine-choice-assignments' onClick={()=>{this.toShowAssignments()}}>我的打卡</View>*/}
          </View>

          {/*所有课程*/}
          <View>
            {this.state.showJoined ?
                <View className='mine-course'>
                  <View className='mine-course-list'>
                    { this.state.courses.map((course)=>(
                        <View key={course.course_id} className='mine-joined-item' onClick={()=>{this.onViewDetail(course.course_id)}}>
                          <Image src={'http://localhost:8000/api/course/getCourseIcon?course_id=' + course.course_id} className='mine-course-img'/>
                          <View className='mine-course-text'>
                            <View className='mine-course-name'>{course.name}</View>
                            <View className='mine-course-heat'>
                              <Image src={heatPic} className='mine-course-heat-img'/>{course.heat}
                            </View>
                          </View>
                        </View>
                    ))}
                  </View>
                </View>
                : null}
          </View>

          {/*我的打卡*/}
          {/*<View>*/}
          {/*  {this.state.showAssignments ?*/}
          {/*      <View className='mine-assignments'>*/}

          {/*        /!*完成情况导航栏*!/*/}
          {/*        <View className='mine-assignment-state'>*/}
          {/*          <View className='mine-assignment-state-item' onClick={()=>{this.toShowAssignmentByState(0)}}>未完成</View>*/}
          {/*          <View className='mine-assignment-state-item' onClick={()=>{this.toShowAssignmentByState(1)}}>已完成</View>*/}
          {/*        </View>*/}

          {/*        /!*打卡列表*!/*/}
          {/*        <View className='mine-assignment-list'>*/}
          {/*          { this.state.assignments.map((assignment)=>(*/}
          {/*            this.state.assignment_state === assignment.status ?*/}
          {/*              <View key={assignment.assignment_id} className='mine-assignment-item' onClick={()=>{this.toAssignmentDetail(assignment.assignment_id)}}>*/}
          {/*                <View className='mine-assignment-item-title'>{assignment.course_name}</View>*/}
          {/*                <View className='mine-assignment-item-dct'>{assignment.assignment_date}</View>*/}
          {/*                <View className='mine-assignment-item-bottom'></View>*/}
          {/*              </View>*/}
          {/*              : null*/}
          {/*          ))}*/}
          {/*        </View>*/}

          {/*      </View>*/}
          {/*      : null}*/}
          {/*</View>*/}
        </View>
      </View>
    )
  }
}
