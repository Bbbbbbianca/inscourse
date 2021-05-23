import React, { Component } from 'react'
import {Button, Form, Input, Picker, Text, Textarea, View} from '@tarojs/components'
import './addcourse.scss'

export default class addCourse extends Component {
  formSubmit = e => {
    console.log(e.detail.value)
  }

  formReset () {
    console.log('form reset')
  }

  state = {
    selector: ['语文', '数学', '英语', '计算机','其他'], // TODO
    selectorChecked: '点击选择类别'
  }

  onChange = e => {
    this.setState({
      selectorChecked: this.state.selector[e.detail.value]
    })
  }

  render () {
    return (
      <View className='addcourse'>
        <View className='add-form'>
          <Form onSubmit={this.formSubmit} onReset={this.formReset}>
            <View className='display-row'>
              <View className='tips'>课程名称:</View>
              <View className='input-items'> <Input type='text' name='name' maxlength='20' /></View>
            </View>
            <View className='display-row'>
              <View className='tips'>课程类别:</View>
              <View className='input-items'>
                <Picker mode='selector' name='type' range={this.state.selector} onChange={this.onChange}>
                  {this.state.selectorChecked}
                </Picker>
              </View>
            </View>
            <Text className='area'>课程简介:</Text>
            <Textarea name='description' autoFocus />
            <Button size='mini' type='primary' formType='submit'>提交</Button>
            <Button size='mini' formType='reset' >重置</Button>
          </Form>
        </View>
      </View>
    )
  }
}
