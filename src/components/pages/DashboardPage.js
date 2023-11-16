import React from 'react'
import NavBar from "../layout/NavBar";
import AccountDashBoard from "../UI/AccountDashboard";
import Footer from "../layout/Footer";
import { useParams } from 'react-router-dom';


const DashboardPage = (props) => {
    const {type} = useParams();
    return (
        <div>
            < NavBar {...props}/>
            < AccountDashBoard index={parseInt(type)}/>
            < Footer/>

        </div>
    )
};

export default DashboardPage;

