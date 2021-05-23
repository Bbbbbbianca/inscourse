import React, { Component } from 'react'
import { View, Form, Button, Input, Textarea, Text, Picker } from '@tarojs/components'
import './addres.scss'

export default class addRes extends Component {

  state = {
    selector: ['笔记', '链接', '百度文库', '其他'],
    selectorChecked: ' 点击选择类别',
    addForm: {
      name: '',
      description: '',
      content: ''
    }
  }

  formSubmit = e => {
    console.log(e.detail.value)
  }

  formReset () {
    console.log('bbb')
  }

  onChange = e => {
    this.setState({
      selectorChecked: this.state.selector[e.detail.value]
    })
  }

  render () {
    return (
      <View className='addres'>
        <View className='add-form'>
          <Form onSubmit={this.formSubmit} onReset={this.formReset}>
            <View className='display-row'>
              <View className='tips'>资源名称:</View>
              <View className='input-items'> <Input type='text' name='name' maxlength='20' /></View>
            </View>
            <View className='display-row'>
              <View className='tips'>资源介绍:</View>
              <View className='input-items'> <Input type='text' name= 'description' maxlength='255' /></View>
            </View>
            <View className='display-row'>
              <View className='tips'>资源类别:</View>
              <View className='input-items'>
                <Picker mode='selector' name='type' range={this.state.selector} onChange={this.onChange}>
                  {this.state.selectorChecked}
                </Picker>
              </View>
            </View>


            <Text className='area'>资源内容:</Text>
            <Textarea name='content' autoFocus />
            <Button size='mini' type='primary' formType='submit'>提交</Button>
            <Button size='mini' formType='reset' >重置</Button>
          </Form>
        </View>
      </View>
    )
  }
}
