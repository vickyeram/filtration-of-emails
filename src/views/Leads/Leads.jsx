import React, { useEffect, useState } from 'react'
import style from "./style.module.css"
import mailData from "../../json/leads.json"
import history from '../../common/history'
import SweetAlert from 'react-bootstrap-sweetalert'

function Leads() {
    const [leads, setLeads] = useState([])
    const [leadNumber, setLeadNumber] = useState(0)
    const [time, setTime] = useState(0)
    const [showPopup, setShowPopup] = useState(false)
    useEffect(() => {
        let x = setInterval(() => {
            if (time === 120) {
                setShowPopup(true)
            } else if (time < 120) {
                setTime(time + 1)
            }
        }, 1000);
        return () => {
            clearInterval(x);
        }
    }, [time])

    useEffect(() => {
        if (localStorage.getItem("Leads") === null || localStorage.getItem("Leads") === undefined) {
            localStorage.setItem("Leads", JSON.stringify(mailData))
            setLocalLeads(mailData)
        }
        else {
            setLocalLeads(JSON.parse(localStorage.getItem("Leads")))
        }
        return () => {

        }
    }, [mailData])

    const setLocalLeads = (Leads) => {
        let localLeads = []
        if (Leads && Leads.length > 0) {
            Leads.map((i) => {
                if (i.status === "pending") {
                    localLeads = localLeads.concat(i)
                }
            })
        }
        setLeads(localLeads)
    }

    const onBtnClick = (e) => {
        if (leadNumber < leads.length - 1) {
            console.log(leadNumber)
            leads[leadNumber].status = e.target.id
            leads[leadNumber].leadBy = "user1"
            setLeads([...leads])
            localStorage.setItem("Leads", JSON.stringify([...leads]))

            let reviewedLeads = localStorage.getItem("reviewedLeads") ? JSON.parse(localStorage.getItem("reviewedLeads")) : []
            reviewedLeads = reviewedLeads.concat(leads[leadNumber])
            localStorage.setItem("reviewedLeads", JSON.stringify(reviewedLeads))


            const newLead = leadNumber + 1
            setLeadNumber(newLead)
            setTime(0)
        }
    }

    const onExit = () => {
        history.push("/overview")
    }

    const onPopupOK = () => {
        setTime(0)
        setShowPopup(false)
        if (leadNumber < leads.length - 1) {
            setLeadNumber(leadNumber + 1)
        }
    }
    return (
        <div className={style.leadDiv}>
            <div className={style.mailDiv}>
                <div className="d-flex justify-content-between">
                    <span className="text-uppercase"> elapsed Time : {time}</span>
                    <button className="btn btn-light" onClick={onExit}>Exit</button>
                </div>
                <div className="d-flex justify-content-between mt-3">
                    <button type="button" className="btn btn-dark" id="positive" onClick={onBtnClick}>Positive reply</button>
                    <button type="button" className="btn btn-dark" id="neutral" onClick={onBtnClick}>Neutral reply</button>
                    <button type="button" className="btn btn-dark" id="not" onClick={onBtnClick}>Not a Lead</button>
                </div>
                {leads && leads.length > 0 &&
                    <div className={style.emailDiv}>
                        <div className={style.subDiv}>
                            <label htmlFor="">Email</label>
                            <input type="text" value={leads[leadNumber].subject} onChange={() => { }} />
                        </div>
                        <div className="bodyDiv">
                            <textarea
                                value={leads[leadNumber].body}
                                cols="30" rows="10" onChange={() => { }}>
                            </textarea>
                        </div>
                    </div>}
            </div>
            <SweetAlert
                showCancel={false}
                onConfirm={onPopupOK}
                show={showPopup}
                title={"Session expired"}
            >   {"Page will be refreshed automatically"}
            </SweetAlert>
        </div>
    )
}

export default Leads
