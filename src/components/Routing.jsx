import React from 'react';
import { BrowserRouter as Router, Route , Link  } from "react-router-dom";
import Header from './Header';
import Dashboard from './dashboards/Dashboard';
import Users from './users/List';
import CreateUser from './users/Create';
import Classes from './classes/List';
import ClassCreate from './classes/Create';
import Students from './students/List';
import StudnetCreate from './students/Create';
import UserPayments from './users/Payments';
import PersonnelCreate from './personnels/Create';
import Personnels from './personnels/List';

class Routing extends React.Component{
    render(){
        return(
            <Router>
                <div>
                    <Header/>
                    <br/>
                    <br/>
                    <br/>
                    <Route exact path='/' component={Dashboard}/>
                    <Route exact path='/users' component={Users}/>
                    <Route exact path = '/user/:id/payments' component = { UserPayments } />
                    <Route exact path='/users/create' component={CreateUser}/>
                    <Route exact path='/classes' component={Classes}/>
                    <Route exact path='/classes/create' component={ClassCreate}/>
                    <Route exact path='/students' component={Students}/>
                    <Route exact path='/students/create' component={StudnetCreate}/>
                    <Route exact path='/personnels/create' component={PersonnelCreate}/>
                    <Route exact path='/personnels' component={Personnels}/>

                </div>
            </Router>
        ) 
    }
}
export default Routing;