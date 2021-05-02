import React, { Component } from 'react'
import { View, Image, Button } from '@tarojs/components'
import './index.scss'
import welcomePic from '../../assets/images/welcome.png'
import UserService from '../../services/user.service'

export default class Index extends Component {

  toHome() {
	  console.log('进入主页面');
	  UserService.wxLogin();
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
