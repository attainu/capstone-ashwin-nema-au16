import './index.css'
import { useRef, useEffect } from 'react'
import { useSelector } from 'react-redux'

const Footer = () => {
    const footerref = useRef()
    const opacity = useSelector(state => state.opacity)

    useEffect(() => {
        if (footerref.current !== undefined && opacity === 1) {
            footerref.current.style.filter = "brightness(1)"
            return
        }

        if (footerref.current !== undefined && opacity === 0.5) {
            footerref.current.style.filter = "brightness(0.4)"
        }
    }, [opacity, footerref])

    return (
        <>
        <footer ref={footerref} className="footer">
                Mr Footer
        </footer>
        </>
    )
}

export default Footer