import React, { useEffect, useState } from 'react'
import userData from "../../json/users.json"
import style from "./style.module.css"
import Select from 'react-select';
import history from '../../common/history';

function Login() {
    const [UserOptions, setUserOptions] = useState([])
    useEffect(() => {
        let newOpt = []
        userData.map((i) => {
            newOpt = newOpt.concat({ value: (i.name).replace(" ", ""), label: i.name, ...i })
        })
        setUserOptions(newOpt)
        return () => {

        };
    }, [userData])

    const onUserSelect = (opt) => {
        opt.status = "active"
        localStorage.setItem("LoginUser", JSON.stringify(opt))
        history.push("/leads")
    }
    return (
        <div className={style.loginDiv}>
            <div className={style.formControl}>
                <span>User:</span>
                <Select options={UserOptions} onChange={onUserSelect} />
            </div>
        </div>
    )
}

export default Login
