/**
 * Created by zuozhuo on 2016/12/8.
 */
'use strict'

import _ from 'lodash'

class XEnumItem {
  constructor(value, text, meta = {}) {
    this.value = value
    this.text = text
    this.meta = meta
  }

  getValue() {
    return this.value
  }

  getText() {
    return this.text
  }

  equals(value) {
    if (value instanceof XEnumItem) {
      value = value.getValue()
    }
    return this.value === value
  }
}
class XEnum {
  constructor(enumDict) {
    this.enumItems = Object.values(enumDict)
    Object.keys(enumDict).forEach((key) => {
      this[key] = enumDict[key]
    })
  }

  findItem(itemValue) {
    if (itemValue instanceof XEnumItem) {
      itemValue = itemValue.getValue()
    }
    return this.enumItems.find((e) => e.getValue() === itemValue)
  }

  findItemByText(itemText) {
    if (itemText instanceof XEnumItem) {
      itemText = itemText.getText()
    }
    return this.enumItems.find((e) => e.getText() === itemText)
  }

  toText(value) {
    let item = _.find(this.enumItems, ['value', value])
    return item === undefined ? null : item.getText()
  }

  parseValueByText(text) {
    let exist = _.find(this.enumItems, (ele) => {
      return ele.getText() === text
    })
    if (exist === undefined) {
      return null
    } else {
      return exist.getValue()
    }
  }

  getOptions(excludeIndex) {
    if (!this.options) {
      console.log('excludeIndex: ', this.enumItems)
      return this.enumItems
        .filter((e) => excludeIndex !== e.getValue())
        .map((e) => {
          return {
            value: e.getValue(),
            label: e.getText(),
            text: e.getText(),
          }
        })
    } else {
      return []
    }
  }
}

const ENUM_OMS_TRANS_TYPE = new XEnum({
  SHIPPING_FCL: new XEnumItem('1', '海运'),
  AIR: new XEnumItem('2', '空运'),
  RAILWAY: new XEnumItem('3', '铁路'),
  KAHANG: new XEnumItem('4', '卡航'),
  DELIVERY: new XEnumItem('5', '快递'),
  OverseasPosition: new XEnumItem('6', '海外仓'),
})
export default {
  ENUM_OMS_TRANS_TYPE,
}
