import React, { Component } from 'react'
import { View, Image } from '@tarojs/components'
import Taro from '@tarojs/taro'
import { APP_ROUTES } from "../../base/constant"
import './group.scss'

export default class Group extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mates: [
        {
          mate_id: 1,
          course_img: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1605983591981&di=b075a1308a8228ac2e016f0b04c44e63&imgtype=0&src=http%3A%2F%2Fp6.itc.cn%2Fmpbp%2Fpro%2F20200927%2Ffc5dd7d801304fdb83b9f37c07ae97ae.jpeg',
          mate_img: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1605983591981&di=b075a1308a8228ac2e016f0b04c44e63&imgtype=0&src=http%3A%2F%2Fp6.itc.cn%2Fmpbp%2Fpro%2F20200927%2Ffc5dd7d801304fdb83b9f37c07ae97ae.jpeg',
          mystatus: 0,
          opstatus: 1,

        },
        {
          mate_id: 2,
          course_img: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1605983591981&di=b075a1308a8228ac2e016f0b04c44e63&imgtype=0&src=http%3A%2F%2Fp6.itc.cn%2Fmpbp%2Fpro%2F20200927%2Ffc5dd7d801304fdb83b9f37c07ae97ae.jpeg',
          mate_img: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1605983591981&di=b075a1308a8228ac2e016f0b04c44e63&imgtype=0&src=http%3A%2F%2Fp6.itc.cn%2Fmpbp%2Fpro%2F20200927%2Ffc5dd7d801304fdb83b9f37c07ae97ae.jpeg',
          mystatus: 1,
          opstatus: 0,
        },
        {
          mate_id: 3,
          course_img: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1605983591981&di=b075a1308a8228ac2e016f0b04c44e63&imgtype=0&src=http%3A%2F%2Fp6.itc.cn%2Fmpbp%2Fpro%2F20200927%2Ffc5dd7d801304fdb83b9f37c07ae97ae.jpeg',
          mate_img: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1605983591981&di=b075a1308a8228ac2e016f0b04c44e63&imgtype=0&src=http%3A%2F%2Fp6.itc.cn%2Fmpbp%2Fpro%2F20200927%2Ffc5dd7d801304fdb83b9f37c07ae97ae.jpeg',
          mystatus: 2,
          opstatus: 1,
        }
      ],
    };
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
              onClick={()=>{this.toShowMatedetail(mate.mate_id)}}
            >
              <Image
                src={mate.course_img}
                className='group-course-img'
              />
              <View className='group-text'>
                <View>
                  {
                    mate.mystatus == 0
                    ?
                    <View className='group-mystatus-complete'>
                      今日待办已完成～
                    </View>
                    :
                    <View className='group-mystatus-tip'>
                      { '今日仍有' + mate.mystatus + '项任务待打卡！'}
                    </View>
                  }
                </View>
                <View>
                  {
                    mate.opstatus == 0
                    ?
                    <View className='group-opstatus-complete'>
                      对方今日待办已完成～
                    </View>
                    :
                    <View className='group-opstatus-tip'>
                      { '对方今日仍有' + mate.opstatus + '项任务待打卡！'}
                    </View>
                  }
                </View>
              </View>
              <Image
                src={mate.mate_img}
                className='group-mate-img'
              />
            </View>
          ))}
        </View>
      </View>
    )
  }
}
