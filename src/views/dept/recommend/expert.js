import { v4 as uuidv4 } from 'uuid'

class Expert {
  constructor() {
    this.id = uuidv4()
    this.name = {name: '姓名', content: '', alert: false}
    this.sex = {name: '性别', content: '', alert: false}
    this.age = {name: '年龄', content: '', alert: false}
    this.edu = {name: '学历', content: '', alert: false}
    this.title = {name: '职称', content: '', alert: false}
    this.major = {name: '专业或学科', content: '', alert: false}
    this.dept = {name: '工作单位', content: '', alert: false}
    this.post = {name: '行政职务', content: '', alert: false}
    this.phone = {name: '办公电话', content: '', alert: false}
    this.mobile = {name: '手机', content: '', alert: false}
    this.email = {name: '电子邮箱', content: '', alert: false}
  }
}

export default Expert