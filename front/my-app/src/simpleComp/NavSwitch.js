import React from 'react'
import { useSelector } from 'react-redux'
import { selectUserType, selectlogin } from '../features/login/loginSlice'
import BaseNav from './BaseNav'
import CustomerNav from './CostumerNav'
import AviationNav from './AviationNav'
const NavSwitch = ({ children }) => {
    const userType = useSelector(selectUserType)
    const loginState = useSelector(selectlogin)
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