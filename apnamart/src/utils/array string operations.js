export const makesubpath = (PATH, queryparameter) => {
    let originpath = PATH.split("/")
    originpath[originpath.length - 1] = queryparameter
    return originpath.join("/")
}

export const searchdatafilter = (originaldata, searchparameter) => {
    const itemslist = Object.keys(originaldata)
    const regx = new RegExp(searchparameter.trim(), 'i')

    const filtereddata = itemslist.reduce((filteredlist, item) => {
        const {name, _id, image, link} = originaldata[item]
        if (regx.test(name) === true) {
            const filteredresult = {name, id:_id, image, link}
            filteredlist.push(filteredresult)
        }
        
        return filteredlist
    },[] )
    return filtereddata
}



export const convertarraydatatoobjectdata = (Originalarray, Path) => {
    try {
        const result = Originalarray.reduce((object, item) => {
            const {_id} = item
            object[_id] = item
            if (Path !== undefined) {
                object[_id].link = makesubpath(Path, _id)
            }
            return object
        }, {})
        return result
    } catch(error) {
        console.log(Originalarray)
        console.log(error)
        return {}
    }
}