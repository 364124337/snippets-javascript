// 方案 1
function recursionFlat(arr = []) {
    const res = []
    arr.forEach(item => {
        if (Array.isArray(item)) {
            res.push(...recursionFlat(item))
        } else {
            res.push(item)
        }
    })
    return res
}

// 方案2
function reduceFlat(arr = []) {
    return arr.reduce((res, item) => {
        return res.concat(Array.isArray(item) ? reduceFlat(item) : item)
    }, [])
}

// 测试
const source = [1, 2, [3, 4, [5, 6]], '7']
console.log(recursionFlat(source))
console.log(reduceFlat(source))