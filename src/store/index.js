import Vue from 'vue'
import Vuex from 'vuex'

// 1.安装插件
Vue.use(Vuex)

// 2.创建Store对象
const store = new Vuex.Store({
  state:{
    cartList: []
  },
  mutations: {
    //mutations唯一的目的就是修改state中的状态，尽量使其中的方法完成的功能单一
    addCart(state,payload) {
      //payload新添加的商品
      return new Promise((resolve,reject) => {
        let oldproduct = null;
        for(let item of state.cartList) {
          if(item.iid === payload.iid) {
            oldproduct = item;
          }
        }
        // 2.判断oldpruduct
        if(oldproduct){
          oldproduct.count += 1
          resolve('当前商品数量+1')
        }else {
          state.cartList.push(payload)
          resolve('加入购物车成功')
        }
      
      })
    }
}
    
  })
// 3.挂载在Vue实例上
export default store