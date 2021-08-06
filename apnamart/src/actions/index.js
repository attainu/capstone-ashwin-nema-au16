import {  allposts, post} from "../actionTypes";


export const getallposts = () => (dispatch) => {
    return fetch(`https://jsonplaceholder.typicode.com/posts/`)
    .then(res => res.json())
    .then(res => {
        dispatch({type:allposts.list, payload:res} )
    })
}

export const getpost = (id = '') => (dispatch) => {
    return fetch(`https://jsonplaceholder.typicode.com/posts/${id}`)
    .then(res => res.json())
    .then(res => {
        dispatch({type:post, payload:res} )
    })
}