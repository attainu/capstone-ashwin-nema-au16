export const mobilenumber_validator = (mobilenumber) => {
    const regx = /^[7-9][0-9]{9}$/
    return regx.test(mobilenumber)
}