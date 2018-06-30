
class myRouter {
  constructor(opts) {
    this.router = opts.mode !== 'hash' ? new HistoryRouter(opts) : new HashRouter(opts)
    this.router.init()
  }
  push(path) {
    this.router.push(path)
  }
  replace(path) {
    this.router.replace(path)
  }
  go(num) {
    this.router.go(num)
  }
}

// class BaseRouter {
//   constructor(opt) {
//     this.opt = opt || {}
//     this.routers = {}
//   }
//   render(state) {
//     if (this.opt.beforeFun) {
//       this.beforeFun({
//         to: {
//           path: state.path,
//           query: state.query
//         },
//         next() {
//           this.routers[state.path].callback(state)
//         }
//       })
//     } else {
//       this.routers[state.path].callback(state)
//     }
//   }
// }
