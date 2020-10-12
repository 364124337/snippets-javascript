Promise.myRace = function(promiseArr) {
    return new Promise((resolve, reject) => {
        promiseArr.forEach(p => {
            // 如果不是Promise实例需要转化为Promise实例
            Promise.resolve(p).then(val => resolve(val), err =>  reject(err))
        })
    })
}

Promise.myRace([Promise.reject(123), Promise.resolve(233)]).then(res => {
    console.log(res)
}).catch(err => {
    console.log(err)
})