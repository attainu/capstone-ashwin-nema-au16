import { useState, useEffect } from "react";
import { getallposts } from "../../actions";
import { useDispatch, useSelector } from "react-redux";
import './index.css'


const Posts = () => {
    const posts = useSelector(state => state.Allposts)
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getallposts())
    }, [dispatch])

    function a() {
        console.log("Hello")
    }

    function b(e) {
        e.stopPropagation()
        console.log("Bye")
    }
    const [title, changetitle] = useState("")
    const [body, changebody] = useState("")
    const [showpost, getdata] = useState(false)
    const getdetails = (data) => {
        changetitle(data.title)
        changebody(data.body)
        getdata(true)
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0
    }

    return (
        <>
            <div onClick={a}>
                <div onClick={b} className="row one">
                    <div className="col-1">
                        ds
                    </div>
                    <div className="col-4">
                        bvbv
                    </div>
                    <div className="col-4 bg-dark">
                        dsdds
                    </div>
                </div>

                {
                    <>
                        <div  className="row two">
                            <div className="col-4 hell">
                                dfcfdfdfdf
                            </div>
                            <div className="col-4">
                                <div className="d-flex flex-column hello">
                                    <div className="border">heloo</div>
                                    <div >dsds</div>
                                </div>
                            </div>

                            <div className="col-4">
                                dsdds
                            </div>
                        </div>
                        <span className="j">hello</span>
                    </>
                }


                <h2 className="text-center my-5">Post</h2>
                <div className="row">
                    <div className="ms-5 col-3">
                        <h3>Post List</h3>
                        {
                            posts.map(data => {
                                return <p onClick={() => getdetails(data)} key={data.id}>Post Title:{data.id}</p>
                            })
                        }
                    </div>
                    <div className="col-8">
                        {showpost && <>
                            <h3>Post Details</h3>
                            <h5>Title</h5>
                            <p>{title}</p>
                            <h5>Body</h5>
                            <p>{body}</p>
                        </>}
                    </div>
                </div>
            </div>
        </>
    )
}

export default Posts