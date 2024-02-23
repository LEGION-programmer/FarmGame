import React from "react"
import { Link } from "react-router-dom"
import style from '../App.module.css'

const NotFound = () => {
    return (
        <div className={style.secendBg}>
            <h1 className={style.fontHeader}>Page not found!</h1>
            <Link to="/" className={style.linkToOtherPage}>Back to main page</Link>
        </div>
    )
}

export default NotFound