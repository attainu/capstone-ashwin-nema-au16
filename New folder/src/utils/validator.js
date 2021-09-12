export const email_validator = (email) => {

    const regx = /^([a-z0-9-]+)@([a-z0-9-]+).([a-z]{2,8})(.[a-z]{2,8})?$/
    return regx.test(email)
}

export const mobilenumber_validator = (mobilenumber) => {
    const regx = /^[7-9][0-9]{9}$/
    return regx.test(mobilenumber)
}