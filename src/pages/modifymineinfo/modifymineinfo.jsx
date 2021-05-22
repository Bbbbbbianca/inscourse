import React, { Component } from 'react'
import {Button, Form, Input, Textarea, View} from '@tarojs/components'
import './modifymineinfo.scss'

export default class Mine extends Component {

  formSubmit () {
    console.log('form submit')
  }

  formReset () {
    console.log('form reset')
  }

  render () {
    return (
      <View className='modifymineinfo'>
        <View className='modify-form'>
          <Form onSubmit={this.formSubmit} onReset={this.formReset}>
            <View className='display-row'>
              <View className='tips'>用户名：</View>
              <View className='input-items'> <Input type='text'  maxlength='20' /></View>
            </View>
            <View className='display-row'>
              <View className='tips'>邮箱：</View>
              <View className='input-items'> <Input type='text'  maxlength='255' /></View>
            </View>
            <View className='display-row'>
              <View className='tips'>学校/公司：</View>
              <View className='input-items'> <Input type='text'  maxlength='20' /></View>
            </View>
            <Button size='mini' type='primary' formType='submit'>修改</Button>
            <Button size='mini' formType='reset' >重置</Button>
          </Form>
        </View>
      </View>
    )
  }
}
