import React, { Component } from 'react'
import { View, Form, Button, Input, Textarea, Text, Picker } from '@tarojs/components'
import './addres.scss'

export default class addRes extends Component {

  componentWillMount () { }

  componentDidMount () { }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  formSubmit () {
    console.log('aaa')

  }

  formReset () {
    console.log('bbb')
  }

  state = {
    selector: ['笔记', '链接', '百度文库', '其他'],
    selectorChecked: ' 点击选择类别'
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
              <View className='input-items'> <Input type='text' maxlength='20' /></View>
            </View>
            <View className='display-row'>
              <View className='tips'>资源介绍:</View>
              <View className='input-items'> <Input type='text' maxlength='255' /></View>
            </View>
            <View className='display-row'>
              <View className='tips'>资源类别:</View>
              <View className='input-items'>
                <Picker mode='selector' range={this.state.selector} onChange={this.onChange}>
                  {this.state.selectorChecked}
                </Picker>
              </View>
            </View>


            <Text className='area'>资源内容:</Text>
            <Textarea autoFocus />
            <Button size='mini' type='primary' formType='submit'>提交</Button>
            <Button size='mini' formType='reset' >重置</Button>
          </Form>
        </View>
      </View>
    )
  }
}
