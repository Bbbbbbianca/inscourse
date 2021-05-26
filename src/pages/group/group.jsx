import React, { Component } from 'react'
import { View, Image } from '@tarojs/components'
import Taro from '@tarojs/taro'
import { APP_ROUTES } from "../../base/constant"
import './group.scss'
import UtilService from "../../services/utils";

export default class Group extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mates: [],
    };
    this.getMyMates()
  }

  componentDidShow() {
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
          that.setState({
            mates: res.data.mates
          });
        }
      },
      fail: function (res) {
        console.log(res);
        UtilService.showHint('获取课友列表失败', '请稍后重试', 'fail');
      }
    })

  }


  toShowMatedetail(id) {
    console.log('view detail of mate' + id)
    Taro.navigateTo({
      url: APP_ROUTES.SCHEDULE +'?id=' + id
    })
  }

  render () {
    return (
      <View className='group'>
        <View className='group-list'>
          { this.state.mates.map((mate)=>(
            <View
              key={mate.mate_id}
              className='group-item'
              onClick={()=>{this.toShowMatedetail(mate.course_id)}}
            >
              <View className='group-mate'>
                <Image
                  src={'http://localhost:8000/api/sys/getUserAvatar?user_id=' + mate.mate_user_id}
                  className='group-mate-img'
                />
                <View className='group-mate-name'>
                  {mate.mate}
                </View>
              </View>
              <View className='group-text'>
                <View className='group-text-course'>
                  {mate.course}
                </View>
                <View className='group-text-progress'>
                  {'已打卡任务' + mate.finished + '项，未打卡任务' + mate.not_finished + '项'}
                </View>
                {/*<View className='group-text-tip'>*/}
                {/*  {'最近' + mate.date + '前完成打卡任务：' + mate.content}*/}
                {/*</View>*/}
              </View>
            </View>
          ))}
        </View>
      </View>
    )
  }
}
