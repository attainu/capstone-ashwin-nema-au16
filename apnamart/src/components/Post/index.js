import { useParams } from "react-router"
import { useDispatch, useSelector} from "react-redux"
import { getpost } from "../../actions"
import { useEffect } from "react"

const Post = () => {
    const {id} = useParams()

    const post = useSelector(state => state.Post)
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getpost(id))
    }, [id, dispatch])
    return (
        <>
        <div className="d-flex justify-content-center">
            <div className="d-flex flex-column">
                <p>Userid: {post.userId}</p>
                <p>Id: {post.id}</p>
                <h3>Title</h3>
                <p>{post.title}</p>
                <h3>Body</h3>
                <p>{post.body}</p>
            </div>
        </div>
        </>
    )
}

export default Post