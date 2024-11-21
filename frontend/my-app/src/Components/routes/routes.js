import React from 'react'
import {Switch, Route, Redirect} from 'react-router-dom'
import DashboardPage from '../DashboardPage';


export const useRoutes= (isLogin)=>{
    if(isLogin){
        return(
            <Switch>
                <Route path="/dashboard" exact component={DashboardPage} />
            </Switch>
        )
    }
}