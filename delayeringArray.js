// 测试数据
const source = [1, 2, [3, 4, [5, 6]], "7"];

// 方案 1 (函数递归)
function recursionFlat(arr = []) {
  const res = [];
  arr.forEach((item) => {
    if (Array.isArray(item)) {
      res.push(...recursionFlat(item));
    } else {
      res.push(item);
    }
  });
  return res;
}
console.log(recursionFlat(source));

// 方案2 (使用reduce)
function reduceFlat(arr = []) {
  return arr.reduce((pre, cur) => {
    return pre.concat(Array.isArray(cur) ? reduceFlat(cur) : cur);
  }, []);
}
console.log(reduceFlat(source));

// 方案3使用flat()
console.log(source.flat(Infinity));

// 方案4利用正则 (但数据类型都会变为字符串)
console.log(JSON.stringify(source).replace(/\[|\]/g, '').split(','))

//方案4正则改良版本
console.log(JSON.parse('[' + JSON.stringify(source).replace(/\[|\]/g, '') + ']'))