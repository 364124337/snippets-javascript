Array.prototype.myMap = function(callback, thisArg) {
    if (this == undefined) {
        throw new TypeError("this is null or not undefined");
    }
    if (typeof callback !== 'function') {
        throw new TypeError(`${callback} is not a function`);
    }
    let res = []
    // 同理
    const O = Object(this)
    const len = O.length >>> 0
    for(let i = 0; i < len; i++) {
        if (i in O) {
            // 调用回调函数并传入新数组
            res[i] = callback.call(thisArg, O[i], i, this)
        }
    }
    return res;
}

let arr = [1,2,3,4,5]
let result = arr.myMap(item => {
    item += 1
    return item
})
console.log(result)