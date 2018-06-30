class HistoryRouter {
  constructor(opts) {
    this.opts = opts || {}
    this.routers = {}
    this.currentPath = {}
  }

  init() {
    var that = this
    // 注册路由
    this.initRouter()
    // debugger
    // 页面加载匹配路由
    window.addEventListener('load', function () {
      that.urlChange()
    })
    
    // 路由切换
    window.addEventListener('popstate', function () {
      that.urlChange()
    })
  }

  initRouter() {
    // debugger
    (this.opts.routes || []).forEach((item, index) => {
      this.map(item)
    })
  }

  // 单个路由注册
  map(item) {
    let path = item.path.replace(/\s*/g, '')// 过滤空格
    
    this.routers[path] = {
      callback: (state) => {
        return this.asyncFun(item.url, state)
      }, // 回调
      fn: null // 缓存对应的js文件
    }
  }

  // 渲染视图(执行匹配到的js代码)
  render(currentPath) {
    this.currentPath = currentPath
    // 全局路由守护
    let pathObj = this.routers[currentPath.path]
    if(!pathObj) {
      alert('404')
      return 
    }

    if (this.opts.beforeFun) {
      this.opts.beforeFun({
        to: {
          path: currentPath.path,
          query: currentPath.query
        },
        next() {
          // 执行目标路由对应的js代码（相当于是组件渲染）
          pathObj.callback(currentPath)
        }
      })
    } else {
      pathObj.callback(currentPath)
    }
  }

  urlChange() {
    this.render({path: this.getPath(), query: this.getParams()})
  }

  //获取当前hash
  getPath() {
    var hash = window.location.pathname
    return hash 
  }
  //获取参数
  getParams() {
    var paramsStr = window.location.search
    var index = paramsStr.indexOf('?')
    var params = {}

    if(index !== -1) {
      let arr = paramsStr.slice(1).split('&')
      
      for(let i = 0; i < arr.length; i++){
        let data = arr[i].split("=")
        if(data.length == 2){
            params[data[0]] = data[1]
      }

    }
  }
    return params
  }
  //获取完整url
  getUrl(path) {
    const href = window.location.href
    const i = href.indexOf('#')
    const base = i >= 0 ? href.slice(0, i) : href
    return `${base}#${path}`
  }

  // 路由异步懒加载js文件
  asyncFun(file, transition) {
    var that = this

    var _body = document.getElementsByTagName('body')[0]
    var scriptEle = document.createElement('script')
    scriptEle.type = 'text/javascript'
    scriptEle.src = file
    scriptEle.async = true
    
    scriptEle.onload = function () {
      that.opts.afterFun && that.opts.afterFun(transition)
    }
    _body.appendChild(scriptEle)
  }

  //改变hash值 实现压入 功能
  push(path) {
    window.history.pushState(null, null, path)
    this.urlChange()
  }
  //使用location.replace实现替换 功能 
  replace(path) {
    window.history.replaceState(null, null, this.getUrl(path));
    this.urlChange()
  }
  //这里使用history模式的go方法进行模拟 前进/后退 功能
  go(n) {
    window.history.go(n)
  }
}
