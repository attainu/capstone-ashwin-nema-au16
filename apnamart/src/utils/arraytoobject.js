export const covertarraytoobject = (Originalarray) => {
    const result = Originalarray.reduce((object, item) => {
        const {_id} = item
        object[_id] = item
        return object
    }, {})
    return result
}