Function.prototype.myApply = function(context = globalThis) {
    const key = Symbol("key")
    context[key] = this 
    let res
    if (arguments[1]) {
        res = context[key](...arguments[1])
    } else {
        res = context[key]()
    }
    delete context[key]
    return res
}

// 测试
const me = { name: 'Jack' }
function say() {
  console.log(`My name is ${this.name || 'default'}`);
}
say.myApply(me)