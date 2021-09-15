import React, { useEffect, useState } from 'react'
import history from '../../common/history'
import style from "./style.module.css"

function Overview() {
    const [ReviewedLeads, setReviewedLeads] = useState([])
    const [status, setStatus] = useState({
        positive: 0,
        neutral: 0,
        notalead: 0,
    })
    const [leadNumber, setLeadNumber] = useState(0)
    useEffect(() => {
        let reviewedLeads = localStorage.getItem("reviewedLeads") ? JSON.parse(localStorage.getItem("reviewedLeads")) : []
        setReviewedLeads(reviewedLeads)
        return () => {

        }
    }, [])

    useEffect(() => {
        if (ReviewedLeads && ReviewedLeads.length > 0) {
            let Positive = 0, Neutral = 0, Notlead = 0
            ReviewedLeads.map((data, index) => {
                if (data.status === "positive") Positive++
                if (data.status === "neutral") Neutral++
                if (data.status === "not") Notlead++
            })
            setStatus({
                positive: Positive,
                neutral: Neutral,
                notalead: Notlead
            })
        }
        return () => {

        }
    }, [ReviewedLeads])

    const onNextClick = () => {
        if (leadNumber < ReviewedLeads.length - 1) {
            setLeadNumber(leadNumber + 1)
        }
    }
    const onBackClick = () => {
        if (leadNumber > 0) {
            setLeadNumber(leadNumber - 1)
        }
    }
    const onReset = () => {
        localStorage.removeItem("Leads");
        localStorage.removeItem("reviewedLeads");
        history.push("/")
    }
    const onBack = () =>{
        history.goBack();
    }
    return (
        <div className={style.leadDiv}>
            <div className={style.mailDiv}>
                <div className="d-flex justify-content-between">
                    <button className="btn btn-light" onClick={onReset}>Reset application</button>
                    <h2>Overview</h2>
                    <button className="btn btn-light" onClick={onBack}>Back</button>
                </div>
                <div className="d-flex flex-column justify-content-between mt-3">
                    <h3>Positive reply : {status.positive}</h3>
                    <h3>Neutral reply : {status.neutral} </h3>
                    <h3>Not a Lead : {status.notalead} </h3>
                </div>
                {ReviewedLeads && ReviewedLeads.length > 0 &&
                    <div className={style.emailDiv}>
                        <div className={style.subDiv}>
                            <label htmlFor="">Lead By : {ReviewedLeads[leadNumber].leadBy}</label>
                            <label htmlFor="">Status : {ReviewedLeads[leadNumber].status}</label>
                            <label htmlFor="">Email : {ReviewedLeads[leadNumber].email_lead}</label>
                            <input type="text" value={ReviewedLeads[leadNumber].subject} onChange={() => { }} />
                        </div>
                        <div className="bodyDiv">
                            <textarea
                                value={ReviewedLeads[leadNumber].body}
                                cols="30" rows="10" onChange={() => { }}>
                            </textarea>
                        </div>
                        <div className="btnGroup d-flex justify-content-between mt-3">
                            <button className="btn btn-dark" onClick={onBackClick}>Back</button>
                            <button className="btn btn-dark" onClick={onNextClick}>Next</button>
                        </div>
                    </div>
                }
            </div>
        </div>
    )
}

export default Overview
