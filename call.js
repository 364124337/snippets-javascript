Function.prototype.myCall = function(context = globalThis) {
    // 关键步骤，在 context 上调用方法，触发 this 绑定为 context，使用 Symbol 防止原有属性的覆盖
    const key = Symbol('key')
    context[key] = this
    const args = [...arguments].slice(1)
    const res = context[key](...args)
    delete context[key]
    return res
}

// 测试
const me = { name: 'Jack' }
function say() {
  console.log(`My name is ${this.name || 'default'}`);
}
say.myCall(me)