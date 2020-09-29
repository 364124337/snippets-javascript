function deepCopy(target, cache = new WeakMap()) {
  if (!target instanceof Object) {
    return target;
  }
  // 防止循环引用
  if (cache.get(target)) {
    return cache.get(target);
  }
  // 支持函数
  if (target instanceof Function) {
    return function () {
      return target.apply(this, arguments);
    };
  }
  // 支持日期
  if (target instanceof Date) {
    return new Date(target);
  }
  // 支持正则对象
  if (target instanceof RegExp) return new RegExp(target.source, target.flags);
  // 数组是 key 为数字素银的特殊对象
  const res = Array.isArray(target) ? [] : {};
  // 缓存 copy 的对象，用于处理循环引用的情况
  cache.set(target, res);

  Object.keys(target).forEach((key) => {
    if (target[key] instanceof Object) {
      res[key] = deepCopy(target[key], cache);
    } else {
      res[key] = target[key];
    }
  });
  return res;
}

// 测试
const source = {
  name: "Jack",
  meta: {
    age: 12,
    birth: new Date("1997-10-10"),
    ary: [1, 2, { a: 1 }],
    say() {
      console.log("Hello");
    },
  },
};
source.source = source;
const newObj = deepCopy(source);
console.log(newObj)