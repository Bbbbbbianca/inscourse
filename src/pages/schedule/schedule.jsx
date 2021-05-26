import React, { Component } from 'react'
import { View, Image, Text, Textarea, Input } from '@tarojs/components'
import { AtFab } from 'taro-ui'
import './schedule.scss'
import addPic from '../../assets/images/add.png'
import framePic from '../../assets/images/frame.png'
import checkPic from '../../assets/images/check.png'
import framefixedPic from '../../assets/images/frame_fixed.png'
import checkfixedPic from '../../assets/images/check_fixed.png'
import deletePic from '../../assets/images/delete.png'
import editPic from '../../assets/images/edit.png'
import affirmPic from '../../assets/images/affirm.png'
import Taro from "@tarojs/taro";
import {APP_ROUTES} from "../../base/constant";
import UtilService from "../../services/utils";

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

export default class Mine extends Component {

  queryMateByCourse(course_id) {
    let token = UtilService.fetchToken();
    let that = this;
    Taro.request({
      url: UtilService.BASE_URL + '/mate/queryMyMateByCourse',
      header: {
        'Token': token
      },
      data: {
        'course_id': course_id,
      },
      method: 'GET',
      success: function (res) {
        if (res.statusCode == 200) {
          console.log(res.data)
          that.setState({
            mate: res.data.mate
          });
          that.queryAssignmentsByMate(res.data.mate.mate_id);
        }
      },
      fail: function (res) {
        console.log(res);
        UtilService.showHint('获取课友信息失败', '请稍后重试', 'fail');
      }
    })
  }

  queryAssignmentsByMate(mate_id) {
    let token = UtilService.fetchToken();
    let that = this;
    Taro.request({
      url: UtilService.BASE_URL + '/assignment/queryMyAssignmentsByMate',
      header: {
        'Token': token
      },
      data: {
        'mate_id': mate_id,
      },
      method: 'GET',
      success: function (res) {
        if (res.statusCode == 200) {
          console.log(res.data)
          that.setState({
            assigns: res.data.assignments
          });
        }
      },
      fail: function (res) {
        console.log(res);
        UtilService.showHint('获取打卡任务列表失败', '请稍后重试', 'fail');
      }
    })
  }

  constructor(props) {
    super(props);
    this.state = {
      mate: {},
      addTaskDialogVisible: false,
      checkTaskTipVisible: false,
      deleteButtonVisible: false,
      deleteDialogVisible: false,
      showEditImg: true,
      checkTaskId: -1,
      deleteTaskId: -1,
      addTaskContent: '',
      addTaskDate: '',
      mate_user_avatar: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1605983591981&di=b075a1308a8228ac2e016f0b04c44e63&imgtype=0&src=http%3A%2F%2Fp6.itc.cn%2Fmpbp%2Fpro%2F20200927%2Ffc5dd7d801304fdb83b9f37c07ae97ae.jpeg',
      mine_img: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1605983591981&di=b075a1308a8228ac2e016f0b04c44e63&imgtype=0&src=http%3A%2F%2Fp6.itc.cn%2Fmpbp%2Fpro%2F20200927%2Ffc5dd7d801304fdb83b9f37c07ae97ae.jpeg',
      assigns: [
        {
          assignment_id: 1,
          content: '学完第一章史蒂夫哈佛哈就是开发商减肥哈咖啡史蒂夫集卡还是饭卡是否会看见啊算法和反倒是不符合时代步伐回家时发布时间的背腹受敌就会爆发的健身房',
          mate_status: 0,
          my_status: 1,
          assignment_date: '2020-11-11'
        },
        {
          assignment_id: 2,
          content: '学完第一章',
          mate_status: 1,
          my_status: 0,
          assignment_date: '2020-11-11'
        },
        {
          assignment_id: 3,
          content: '学完第一章',
          mate_status: 1,
          my_status: 1,
          assignment_date: '2020-11-11'
        }
      ]
    };
    this.queryMateByCourse(getCourseId());
  }

  toShowCheckTaskTip(id) {
    console.log('to show check task tip')
    this.setState({
      checkTaskTipVisible: true,
      checkTaskId: id,
    })
  }

  toCheckTask(id) {
    console.log('to check task ' + id)
    let token = UtilService.fetchToken();
    let that = this;
    Taro.request({
      url: UtilService.BASE_URL + '/assignment/checkAssignment',
      header: {
        'Token': token
      },
      data: {
        'assignment_id': id
      },
      method: 'POST',
      success: function (res) {
        if (res.statusCode == 200) {
          console.log(res.data)
          UtilService.showHint(res.data.message, '', 'success');
          that.queryAssignmentsByMate(that.state.mate.mate_id);
        } else {
          console.log(res)
          UtilService.showHint(res.data.message, '', 'none');
        }
      },
      fail: function (res) {
        console.log(res);
        UtilService.showHint('打卡失败', '请稍后重试', 'none');
      }
    })
    this.setState({
      checkTaskTipVisible: false,
    })
  }
  toCancelCheckTask() {
    console.log('to cancel check task')
    this.setState({
      checkTaskTipVisible: false,
    })
  }

  toShowAddTaskDialog() {
    console.log('to show add task dialog')
    this.setState({
      addTaskDialogVisible: true,
    })
  }

  toAddTask() {
    console.log('to add task')
    let token = UtilService.fetchToken();
    let that = this;
    Taro.request({
      url: UtilService.BASE_URL + '/assignment/newAssignment',
      header: {
        'Token': token
      },
      data: {
        'mate_id': that.state.mate.mate_id,
        'content': that.state.addTaskContent,
        'assignment_date': that.state.addTaskDate
      },
      method: 'POST',
      success: function (res) {
        if (res.statusCode == 200) {
          console.log(res.data)
          UtilService.showHint(res.data.message, '', 'success');
          that.queryAssignmentsByMate(that.state.mate.mate_id);
        } else {
          console.log(res)
          UtilService.showHint(res.data.message, '', 'none');
        }
      },
      fail: function (res) {
        console.log(res);
        UtilService.showHint('新增打卡失败', '请稍后重试', 'none');
      }
    })
    this.setState({
      addTaskDialogVisible: false,
    })
  }

  toCancelAddTask() {
    console.log('to cancel add task')
    this.setState({
      addTaskDialogVisible: false,
    })
  }

  onChangeAddTaskContent = e => {
    let value = e.detail.value
    this.setState({
      addTaskContent: value
    })
    console.log(this.state.addTaskContent)
  }

  onChangeAddTaskDate = e => {
    let value = e.detail.value
    this.setState({
      addTaskDate: value
    })
    console.log(this.state.addTaskContent)
  }

  toShowDeleteButton() {
    console.log('to show delete button')
    this.setState({
      deleteButtonVisible: true,
      showEditImg: false,
    })
  }
  toHideDeleteButton() {
    console.log('to hide delete button')
    this.setState({
      deleteButtonVisible: false,
      showEditImg: true,
    })
  }

  toShowDeleteDialog(id) {
    console.log('to show delete dialog')
    this.setState({
      deleteDialogVisible: true,
      deleteTaskId: id,
    })
  }

  toDeleteTask(id) {
    console.log('to delete task' + id)
    let token = UtilService.fetchToken();
    let that = this;
    Taro.request({
      url: UtilService.BASE_URL + '/assignment/deleteAssignment',
      header: {
        'Token': token
      },
      data: {
        'assignment_id': id
      },
      method: 'POST',
      success: function (res) {
        if (res.statusCode == 200) {
          console.log(res.data)
          UtilService.showHint(res.data.message, '', 'success');
          that.queryAssignmentsByMate(that.state.mate.mate_id);
        } else {
          console.log(res)
          UtilService.showHint(res.data.message, '', 'none');
        }
      },
      fail: function (res) {
        console.log(res);
        UtilService.showHint('删除打卡失败', '请稍后重试', 'none');
      }
    })
    this.setState({
      deleteDialogVisible: false
    })
  }
  toCancelDeleteTask() {
    console.log('to cancel delete task')
    this.setState({
      deleteDialogVisible: false
    })
  }

  render () {
    return (
      <View className='schedule'>
        <View className='schedule-title'>
          <View className='schedule-title-mate'>
            <Image
              src={'http://localhost:8000/api/sys/getUserAvatar?user_id=' + this.state.mate.my_user_id}
              className='schedule-title-mate-img'
            />
          </View>
          <View className='schedule-title-text'>
            打卡任务
          </View>
          <View className='schedule-title-mine'>
            <Image
              src={'http://localhost:8000/api/sys/getUserAvatar?user_id=' + this.state.mate.mate_user_id}
              className='schedule-title-mine-img'
            />
          </View>
        </View>
        <View className='schedule-assign'>
          {this.state.assigns.map((assign)=>(
            <View
              key={assign.assignment_id}
              className='schedule-assign-item'
            >
              <View className='schedule-assign-item-mine'>
                {
                  assign.my_status
                    ?
                    <Image
                      src={checkPic}
                      className='schedule-assign-item-mine-img'
                    />
                    :
                    <Image
                      src={framePic}
                      className='schedule-assign-item-mine-img'
                      onClick={()=>{this.toShowCheckTaskTip(assign.assignment_id)}}
                    />
                }
              </View>
              <View className='schedule-assign-item-text'>
                <View className='schedule-assign-item-title'>
                  <View className='schedule-assign-item-time'>
                    {assign.assignment_date + ' :'}
                  </View>
                  {
                    this.state.deleteButtonVisible
                      ?
                      <Image
                        src={deletePic}
                        className='schedule-assign-item-delete'
                        onClick={()=>{this.toShowDeleteDialog(assign.assignment_id)}}
                      />
                      :
                      null
                  }
                </View>
                <View className='schedule-assign-item-content'>
                  {assign.content}
                </View>
              </View>
              <View className='schedule-assign-item-mate'>
                {
                  assign.mate_status
                    ?
                    <Image
                      src={checkfixedPic}
                      className='schedule-assign-item-mate-img'
                    />
                    :
                    <Image
                      src={framefixedPic}
                      className='schedule-assign-item-mate-img'
                    />
                }
              </View>
            </View>
          ))}
        </View>
        <AtFab className='schedule-add'>
          <Image
            src={addPic}
            className='schedule-add-img'
            onClick={()=>{this.toShowAddTaskDialog()}}
          />
        </AtFab>
        <AtFab className='schedule-edit'>
          {
            this.state.showEditImg
              ?
              <Image
                src={editPic}
                className='schedule-edit-img'
                onClick={()=>{this.toShowDeleteButton()}}
              />
              :
              <Image
                src={affirmPic}
                className='schedule-edit-img'
                onClick={()=>{this.toHideDeleteButton()}}
              />
          }
        </AtFab>
        <View>
          {
            this.state.checkTaskTipVisible
              ?
              <View>
                <View className='schedule-mask'></View>
                <View className='schedule-tip'>
                  <View className='schedule-tip-text'>
                    确认打卡此任务？
                  </View>
                  <View className='schedule-tip-button'>
                    <View
                      className='schedule-tip-comfirm'
                      onClick={()=>{this.toCheckTask(this.state.checkTaskId)}}
                    >
                      Yes!
                    </View>
                    <View
                      className='schedule-tip-cancel'
                      onClick={()=>{this.toCancelCheckTask()}}
                    >
                      Wait..
                    </View>
                  </View>
                </View>
              </View>
              :
              null
          }
        </View>
        <View>
          {
            this.state.deleteDialogVisible
              ?
              <View>
                <View className='schedule-mask'></View>
                <View className='schedule-tip'>
                  <View className='schedule-tip-text'>
                    确认删除此任务？
                  </View>
                  <View className='schedule-tip-button'>
                    <View
                      className='schedule-tip-comfirm'
                      onClick={()=>{this.toDeleteTask(this.state.deleteTaskId)}}
                    >
                      Yes!
                    </View>
                    <View
                      className='schedule-tip-cancel'
                      onClick={()=>{this.toCancelDeleteTask()}}
                    >
                      Wait..
                    </View>
                  </View>
                </View>
              </View>
              :
              null
          }
        </View>
        <View>
          {
            this.state.addTaskDialogVisible
              ?
              <View>
                <View className='schedule-mask'></View>
                <View className='schedule-add-dialog'>
                  <Text className='schedule-add-dialog-text'>
                    请输入打卡时间：
                  </Text>
                  <Input
                    className='schedule-add-dialog-time'
                    value={this.state.addTaskDate}
                    onInput={this.onChangeAddTaskDate}
                  />
                  <Text className='schedule-add-dialog-text'>
                    请输入打卡任务：
                  </Text>
                  <Textarea
                    className='schedule-add-dialog-task'
                    value={this.state.addTaskContent}
                    onInput={this.onChangeAddTaskContent}
                  />
                  <View className='schedule-add-dialog-button'>
                    <View
                      className='schedule-add-dialog-comfirm'
                      onClick={()=>{this.toAddTask()}}
                    >
                      确定
                    </View>
                    <View
                      className='schedule-add-dialog-cancel'
                      onClick={()=>{this.toCancelAddTask()}}
                    >
                      取消
                    </View>
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
