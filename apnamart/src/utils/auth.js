export const getAuthinbrowser = () => localStorage.getItem('_tk_')

export const setAuthinbrowser = (data) => localStorage.setItem("_tk_", data)