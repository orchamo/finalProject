import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { checkLogin, selectUserType, selectlogin } from '../features/login/loginSlice'
import BaseNav from './BaseNav'
import CustomerNav from './CostumerNav'
import AviationNav from './AviationNav'

const NavSwitch = ({ children }) => {
    const dispatch = useDispatch()
    const chechTheLogin = dispatch(checkLogin())
    console.log (chechTheLogin)
    const userType = useSelector(selectUserType)
    const loginState = useSelector(selectlogin)
    console.log(loginState)
    return (
        <div >
            <div>
                {(loginState == false) ? <BaseNav></BaseNav> : (userType == 3) ? (<CustomerNav> </CustomerNav>)
                    : (userType == 2) ?  (<AviationNav></AviationNav>): (<BaseNav></BaseNav>)}
            

                {children}
            </div>

        </div>
    )
}

export default NavSwitch