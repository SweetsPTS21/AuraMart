import React, {useEffect} from 'react'
import AdminDashBoard from "../UI/AdminDashboard";
import * as userActions from "../../store/actions/userActions";
import {useDispatch} from "react-redux";


const AdminPage = () => {
    const dispatch = useDispatch();
    useEffect(()=>{
        dispatch(userActions.getAllUsers("?limit=100&sort=-createdAt"));
    },[]);
    return (
        <div style={{ backgroundColor: "#EEEEEE"}}>
            <AdminDashBoard index={1}/>
        </div>
    )
};

export default AdminPage;
