export const requestAsync = (token, url, data, method) => {
  return new Promise((resolve, reject) => {
    uni.request({
      url,
      method,
      data,
      header: {
        'Authorization': token,
      },
      success: (res) => {
        if (res.data.code) {
          // token 失效
          if (res.data.code === 401) {
            uni.navigateTo({
              url: '/pages/login/index'
            })
          }

          resolve(res.data)
        } else {
          reject(res.data)
        }
      },
      fail: (err) => {
        if (err.errMsg) {
          uni.showToast({
            title: err.errMsg,
            icon: 'none',
            duration: 2000,
          })
        } else {
          uni.showToast({
            title: err.message,
            icon: 'none',
            duration: 2000,
          })
        }
        reject(err)
      },
    })
  })
}
export const request = async (isRequireLogin = true, url = '', data = {}, method = 'POST') => {
  let token = uni.getStorageSync('token')
  // if (isRequireLogin) {
  //   token = uni.getStorageSync('token')
  // } else {
  //   // token = getToken.tryGetToken()
  // }
  // return bindUser(url,method,data,token);
  return requestAsync(token, url, data, method)
}
