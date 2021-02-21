import axios from 'axios'

// export function request(config,success,failure) {
//   const instance = axios.create({
//     baseURL:'http://123.207.32.32:8000',
//     timeout:5000
//   })
//   instance(config).then(res => {
//     success(res)
//   }).catch(err => {
//     failure(err)
//   })
// }


//另外一种简单方法

// export function request(config) {
//   return new Promise((resolve,reject) => {    
//     const instance = axios.create({
//       baseURL:'http://123.207.32.32:8000',
//       timeout:5000
//   })
//   instance(config).then(res => {
//     resolve(res) 
//   }).catch(err => {
//     reject(err)
//   })
//   })
//   }

//另一种更更简单的方法
export function request(config) {
  const instance = axios.create({     //1.创建axios的实例
    baseURL:'http://152.136.185.210:8000/api/w6',
    timeout:5000
  }) 
  //请求拦截
  instance.interceptors.request.use(config => { //2.请求拦截
    // console.log(config)
    return config                             //拦截之后必须得给别人返回去     
                              //请求拦截得作用：1.看config中的信息是否符合服务器要求
  },err => {                                 //2.希望发送请求时在页面显示一个图标
    console.log(err)                             //和在访问网站时一般会有一个转圈圈的图标
  }) 
  //响应拦截
  instance.interceptors.response.use(res =>{
    // console.log(res)
    return res.data
  },err => {
    console.log(err)
  })                                         //3.必须携带一些特殊信息，比如登录页面

  //instance的返回值本身就是promise类型
  return instance(config)              //3.发送真正的网络请求
} 