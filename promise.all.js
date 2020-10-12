Promise.myAll = function(promiseAll) {
    return new Promise((resolve, reject) => {
        const ans = []
        let index = 0
        for (let i = 0; i < promiseAll.length; i++) {
            promiseAll[i].then(res => {
                ans[i] = res
                index++
                if (index === promiseAll.length) {
                    resolve(ans)
                }
            }).catch(err => reject(err))
        }
    })
}

Promise.myAll([Promise.resolve(123), Promise.resolve(444)]).then(res => {
    console.log(res)
})