import React, { Component } from 'react'
import {Button, Image, View} from '@tarojs/components'
import './mine.scss'
import heatPic from "../../assets/images/heat.png";

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
      courses: [
        {
        course_id: 1,
        author_id: 1,
        status: 1,
        course_img: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1605983591981&di=b075a1308a8228ac2e016f0b04c44e63&imgtype=0&src=http%3A%2F%2Fp6.itc.cn%2Fmpbp%2Fpro%2F20200927%2Ffc5dd7d801304fdb83b9f37c07ae97ae.jpeg',
        name: '数学分析',
        description: '好学啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦',
        heat: 234,
        level: 9,
        category: 1
      },
        {
          course_id: 2,
          author_id: 2,
          status: 1,
          course_img: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1605983591981&di=b075a1308a8228ac2e016f0b04c44e63&imgtype=0&src=http%3A%2F%2Fp6.itc.cn%2Fmpbp%2Fpro%2F20200927%2Ffc5dd7d801304fdb83b9f37c07ae97ae.jpeg',
          name: '线性代数',
          description: '学得很快乐',
          heat: 834,
          level: 7,
          category: 1
        },
        {
          course_id: 3,
          author_id: 3,
          status: 1,
          course_img: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1605983591981&di=b075a1308a8228ac2e016f0b04c44e63&imgtype=0&src=http%3A%2F%2Fp6.itc.cn%2Fmpbp%2Fpro%2F20200927%2Ffc5dd7d801304fdb83b9f37c07ae97ae.jpeg',
          name: '大学物理',
          description: '这你不能不会吧',
          heat: 254,
          level: 5,
          category: 1
        }
      ],
      assignments: [
        {
          assignment_id: 1,
          course_name: '电竞教学',
          status: 0,
          assignment_date: '2021-6-1',
        },
        {
          assignment_id: 2,
          course_name: '飞雷神教学',
          status: 0,
          assignment_date: '2021-6-1',
        },
        {
          assignment_id: 2,
          course_name: '李白教学',
          status: 1,
          assignment_date: '2021-6-1',
        }
      ],
      assignment_state: 0
    };
  }

  modifyInfo(id) {
    console.log(id)
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
            <View className='mine-choice-assignments' onClick={()=>{this.toShowAssignments()}}>我的打卡</View>
          </View>

          {/*所有课程*/}
          <View>
            {this.state.showJoined ?
                <View className='mine-course'>
                  <View className='mine-course-list'>
                    { this.state.courses.map((course)=>(
                        <View key={course.course_id} className='mine-joined-item' onClick={()=>{this.onViewDetail(course.course_id)}}>
                          <Image src={course.course_img} className='mine-course-img'/>
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
          <View>
            {this.state.showAssignments ?
                <View className='mine-assignments'>

                  {/*完成情况导航栏*/}
                  <View className='mine-assignment-state'>
                    <View className='mine-assignment-state-item' onClick={()=>{this.toShowAssignmentByState(0)}}>未完成</View>
                    <View className='mine-assignment-state-item' onClick={()=>{this.toShowAssignmentByState(1)}}>已完成</View>
                  </View>

                  {/*打卡列表*/}
                  <View className='mine-assignment-list'>
                    { this.state.assignments.map((assignment)=>(
                      this.state.assignment_state === assignment.status ?
                        <View key={assignment.assignment_id} className='mine-assignment-item' onClick={()=>{this.toAssignmentDetail(assignment.assignment_id)}}>
                          <View className='mine-assignment-item-title'>{assignment.course_name}</View>
                          <View className='mine-assignment-item-dct'>{assignment.assignment_date}</View>
                          <View className='mine-assignment-item-bottom'></View>
                        </View>
                        : null
                    ))}
                  </View>

                </View>
                : null}
          </View>
        </View>
      </View>
    )
  }
}
