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
          course: '数学分析',
          mate_img: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1605983591981&di=b075a1308a8228ac2e016f0b04c44e63&imgtype=0&src=http%3A%2F%2Fp6.itc.cn%2Fmpbp%2Fpro%2F20200927%2Ffc5dd7d801304fdb83b9f37c07ae97ae.jpeg',
          mate: 'abababab',
          finished: 1,
          notfinished: 2,
          content: '读第一章',
          date: '2021-5-31'
        },
        {
          mate_id: 2,
          course: '数学分析',
          mate_img: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1605983591981&di=b075a1308a8228ac2e016f0b04c44e63&imgtype=0&src=http%3A%2F%2Fp6.itc.cn%2Fmpbp%2Fpro%2F20200927%2Ffc5dd7d801304fdb83b9f37c07ae97ae.jpeg',
          mate: '路人甲',
          finished: 1,
          notfinished: 2,
          content: '读第一章',
          date: '2021-5-31'
        },
        {
          mate_id: 3,
          course: '数学分析',
          mate_img: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1605983591981&di=b075a1308a8228ac2e016f0b04c44e63&imgtype=0&src=http%3A%2F%2Fp6.itc.cn%2Fmpbp%2Fpro%2F20200927%2Ffc5dd7d801304fdb83b9f37c07ae97ae.jpeg',
          mate: '路人甲',
          finished: 1,
          notfinished: 2,
          content: '读第一章',
          date: '2021-5-31'
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
              <View className='group-mate'>
                <Image
                  src={mate.mate_img}
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
                  {'已打卡任务' + mate.finished + '项，未打卡任务' + mate.notfinished + '项'}
                </View>
                <View className='group-text-tip'>
                  {'记得在' + mate.date + '前完成打卡任务：' + mate.content}
                </View>
              </View>
            </View>
          ))}
        </View>
      </View>
    )
  }
}
