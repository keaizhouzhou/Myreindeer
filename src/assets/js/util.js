import axios from 'axios';
import qs from 'qs';
// 添加请求拦截器
axios.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  return config;
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error);
});

// 添加响应拦截器
axios.interceptors.response.use(function (response) {
  // 对响应数据做点什么
  return response;
}, function (error) {
  // 对响应错误做点什么
  return Promise.reject(error);
});
export const util = {
  // 通过axios获取数据
  fetchData (params) {
    let {url = '', method = 'post', headers = {}, data = null} = params;
    if (!url) {return};
    return new Promise( res => {
      data = qs.stringify(params.data);
      headers = {
        'Content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
        ...headers
      };
      axios({url, method, headers, data}).then(response => {
        res(response);
      }).catch(error => {
        throw new Error(error);
      })
    })
  },
  // 获取查询参数
  getQueryString (name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
    var r = window.location.search.substr(1).match(reg);  //匹配目标参数
    if (r != null) return decodeURIComponent(r[2]); return null; //返回参数值
  }
};
