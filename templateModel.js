function templateModel () {
  const str = `import * as Api from './service'
export default {
  namespace: 'addrSearch',
  state: {
    nearAddressByMap: {},
  },
  effects: {
    * getNearAddressByMap ({ payload }, { call, put }) {
      const res = yield call(Api.getNearAddressByMap, payload)
      yield put({
        type: 'save',
        payload: {
          nearAddressByMap: res.data
        }
      })
    },
  },
  reducers: {
    save (state, { payload }) {
      return { ...state, ...payload }
    },
  }
}`
    return str
}
module.exports = templateModel

