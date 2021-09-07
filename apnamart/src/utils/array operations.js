export const covertarraytoobject = (Originalarray) => {
    const result = Originalarray.reduce((object, item) => {
        const {_id} = item
        object[_id] = item
        return object
    }, {})
    return result
}

export const searchdatafilter = (originaldata, searchparameter, setfiltereddata) => {
    const itemslist = Object.keys(originaldata)
    const regx = new RegExp(searchparameter.trim(), 'i')

    const filtereddata = itemslist.reduce((filteredlist, item) => {
        if (regx.test(originaldata[item].name) === true) {

            const filteredresult = {name:originaldata[item].name, id:originaldata[item]._id}
            if (originaldata[item].image !== undefined) {
                filteredresult.image = originaldata[item].image
            }

            if (originaldata[item].imageurl !== undefined) {
                filteredresult.image = originaldata[item].imageurl
            }

            filteredlist.push(filteredresult)

        }
        return filteredlist
    },[] )
    setfiltereddata([...filtereddata])
}