import {PATHS} from '../../config'
import useMeasure from 'react-use-measure'
import { useState, useEffect } from 'react'
import './index.css'
export const NotFound = ({history}) => {
    const [sadface, sadfacebounds] = useMeasure()
    const [textbelowsadface, textbelowsadfacebounds] = useMeasure()
    const [margintop, changemargintop] = useState("60px")
    useEffect(() => {
        const totalmargin = sadfacebounds.bottom - textbelowsadfacebounds.bottom + 100
        changemargintop(`${totalmargin}px`)
        setTimeout(() => {
            history.push(PATHS.HOME)
        }, 2500)
    }, [sadfacebounds, textbelowsadfacebounds, changemargintop, history])
    return (
        <>
            <div className="d-flex flex-column mt-5">
                <div className="d-flex justify-content-center mt-5">
                <i ref={sadface} className="bi bi-emoji-frown sadicon"></i>
                </div>
                <h1 style={{marginTop:margintop}} ref={textbelowsadface} className="text-center">404</h1>
                <h3 className="text-center">Not Found</h3>
                <p className="text-center">Sorry the page you are looking for does not exists</p>
            </div>
        </>
    )
}