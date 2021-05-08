import React, { Component } from 'react'
import { View } from '@tarojs/components'
import './resource.scss'

// TO DO:
// function getResourseId () {
//   if (Taro.getCurrentInstance().router.params.id) {
//       return(Taro.getCurrentInstance().router.params.id)
//     } else {
//     }
// }

// TO DO:
// function getResourseDetail (id) {
// }

export default class Resource extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // resource_id: getResourceId(),
      // resource: getResourceDetail(resourse_id)
      resource: {
        resource_id: 3,
        resource_key: '交大网课',
        description: '交大教授讲第四章很好的视频',
        author_id: 11,
        heat: 1109,
        content_type: 2,
        content: 'http://jiaodanb.com',
      }
    };
  }
  
  render () {
    return (
      <View className='resource'>
        <View className='resource-top'>

        </View>
        <View className='resource-mid'>

        </View>
        <View className='resource-bottom'>

        </View>
      </View>
    )
  }
}
