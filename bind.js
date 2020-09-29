Function.prototype.myBind = function(context = globalThis) {
    const fn = this
    const args = Array.from(arguments).slice(1)
    const newFunc = function() {
        const newArgs = args.concat(...arguments)
        if (this instanceof newFunc) {
            fn.apply(this, newArgs)
        } else {
            fn.apply(context, newArgs)
        }
    }
    newFunc.prototype = Object.create(fn.prototype)
    return newFunc
}

// 测试
const me = { name: 'Jack' }
const other = { name: 'Jackson' }
function say() {
  console.log(`My name is ${this.name || 'default'}`);
}
const meSay = say.myBind(me)
meSay()
const otherSay = say.myBind(other)
otherSay()