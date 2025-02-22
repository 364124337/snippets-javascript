const jsonp = ({url, params, callbackName}) => {
    const generateUrl = () => {
        let dataSrc = ''
        for (let key in params) {
            if (Object.prototype.hasOwnProperty.call(params, key)) {
                dataSrc += `${key}=${params[key]}&`
            }
        }
        dataSrc += `callback=${callbackName}`
        return `${url}?${dataSrc}`
    }
    return new Promise((resolve, reject) => {
        let scriptEle = document.createElement('script')
        scriptEle.src = generateUrl()
        document.body.appendChild(scriptEle);
        window[callbackName] = data => {
            resolve(data)
            document.removeChild(scriptEle);
        }
    })
}
