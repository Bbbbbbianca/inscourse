import React, { Component } from 'react'
import Taro from '@tarojs/taro'
import { View, Image, Button } from '@tarojs/components'
import './index.scss'
import welcomePic from '../../assets/images/welcome.png'

export default class Index extends Component {

  componentWillMount () { }

  componentDidMount () { }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  toHome() {
    console.log('进入主页面')
    Taro.switchTab({
      url: '../course/course'
    })
  }

  render () {
    return (
      <View className='index'>
        <View className='index-image-part'>
          <Image
            style='width: 300px;height: 300px;'
            src={welcomePic}
          />
        </View>
        <View className='index-button-part'>
          <Button 
            className='index-button'
            onClick={this.toHome}
          >
            点击进入
          </Button>
        </View>
      </View>
    )
  }
}
