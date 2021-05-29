import React, { Component } from 'react'
import { View, Image } from '@tarojs/components'
import Taro from '@tarojs/taro'
import { APP_ROUTES } from "../../base/constant"
import './group.scss'
import UtilService from "../../services/utils";
import deletePic from "../../assets/images/delete.png";
import nullPic from "../../assets/images/free.png";

export default class Group extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mates: [],
      editable: false,
      show_edit: false,
      delMateVisble: false,
      deleteId: -1,
    };
  }

  componentDidShow() {
    this.quitEditMode()
    this.getMyMates()
  }

  getMyMates() {
    let token = UtilService.fetchToken();
    let that = this;
    Taro.request({
      url: UtilService.BASE_URL + '/mate/queryMyMates',
      header: {
        'Token': token
      },
      method: 'GET',
      success: function (res) {
        if (res.statusCode === 200) {
          if(res.data.mates.length === 0) {
            that.setState({
              mates: res.data.mates,
              editable: false,
              show_edit: false
            });
          }
          else {
            that.setState({
              mates: res.data.mates,
              show_edit: true
            });
          }
        }
      },
      fail: function (res) {
        // console.log(res);
        UtilService.showHint('获取课友列表失败', '请稍后重试', 'fail');
      }
    })

  }

  toShowMatedetail(id) {
    if (this.state.editable) return;
    Taro.navigateTo({
      url: APP_ROUTES.SCHEDULE +'?id=' + id
    })
  }

  joinEditMode() {
    this.setState({
      editable: true
    })
  }

  quitEditMode() {
    this.setState({
      editable: false
    })
  }

  showDeleteMateTip(id) {
    this.setState({
      delMateVisble: true,
      deleteId: id
    })
  }

  deleteMate(id) {
    let token = UtilService.fetchToken();
    let that = this;
    Taro.request({
      url: UtilService.BASE_URL + '/mate/unbind',
      header: {
        'Token': token
      },
      data: {
        'mate_id': id
      },
      method: 'POST',
      success: function (res) {
        if (res.statusCode === 200) {
          console.log(res.data.message);
          that.getMyMates()
        }
      },
      fail: function (res) {
        UtilService.showHint('解除课友关系失败', '请稍后重试', 'fail');
      }
    })
    this.setState({
      delMateVisble: false
    })
  }
  cancelDeleteMate() {
    this.setState({
      delMateVisble: false
    })
  }

  render () {
    return (
      <View className='group'>
      {
        this.state.mates.length
        ?  
        <View>
        <View className='group-top'>
          <View className='group-top-tip'>
            今天你的学习任务完成了吗？
          </View>
          <View className='cancel-button'>
            {this.state.editable?<View onClick={()=>{this.quitEditMode()}}>取消</View>:null}
          </View>
          <View className='edit-button'>
            {this.state.show_edit?<View onClick={()=>{this.joinEditMode()}}>编辑</View>:null}
          </View>
        </View>
        <View className='group-list'>
          { this.state.mates.map((mate)=>(
            <View key={mate.mate_id} className='group-item' onClick={()=>{this.toShowMatedetail(mate.course_id)}}>
              <View className='group-mate'>
                <Image src={UtilService.BASE_URL + '/sys/getUserAvatar?user_id=' + mate.mate_user_id} className='group-mate-img' />
                <View className='group-mate-name'>{mate.mate_username}</View>
              </View>
              <View className='group-text'>
                <View className='group-text-course'>
                  {mate.course}
                </View>
                <View className='group-text-progress'>
                  {'已打卡任务' + mate.finished + '项，未打卡任务' + mate.not_finished + '项'}
                </View>
              </View>
              <View className='group-delete'>
                {this.state.editable?
                  <Image src={deletePic} className='group-delete-img' onClick={()=>{this.showDeleteMateTip(mate.mate_id)}} />
                  :null}
              </View>
            </View>
          ))}
        </View>  
        </View>
        :
        <View className='group-null'>
          <Image src={nullPic} className='group-null-img' />
          <View className='group-null-text'>你还没有课友，快去添加吧～</View>
        </View>
      }
      {
        this.state.delMateVisble
        ?
        <View>
          <View className='group-mask' />
          <View className='group-tip'>
          <View className='group-tip-text'>
            是否删除课友关系？
          </View>
          <View className='group-tip-button'>
            <View
              className='group-tip-comfirm'
              onClick={()=>{this.deleteMate(this.state.deleteId)}}
            >
              Yes！
            </View>
            <View
              className='group-tip-cancel'
              onClick={()=>{this.cancelDeleteMate()}}
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
    )
  }
}
