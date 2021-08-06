import { useEffect } from "react";
import { getallposts } from "../../actions";
import { useDispatch, useSelector } from "react-redux";
import {PATHS} from '../../config'
import { Link } from "react-router-dom";

const Allposts = () => {
    const posts = useSelector(state => state.Allposts)
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getallposts())
    }, [dispatch])


    return (
        <>
            <h2 className="text-center my-5">Post</h2>
            <div className="row">
                <div className="ms-5 col-3 d-flex flex-column">
                    <h3>Post List</h3>
                    {
                        posts.map(data => {
                            return (
                                <>
                                
                                <Link to={`${PATHS.DIRECTPOST}/${data.id}`}>{data.id}</Link>
                                <p>{data.title}</p>
                                </>
                            )
                        })
                    }
                </div>

            </div>
        </>
    )
}

export default Allposts