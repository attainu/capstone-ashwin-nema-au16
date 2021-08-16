export const getAuthinbrowser = () => JSON.parse(localStorage.getItem('_tk_'))
export const setAuthinbrowser = (data) => localStorage.setItem("_tk_", JSON.stringify(data))