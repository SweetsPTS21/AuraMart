import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as shopActions from "../../store/actions/shopActions";
import SellerDashbroad from "../UI/SellerDashboard";
import NavBar from "../layout/NavBar";
import Footer from "../layout/Footer";

const SellerPage = (props) => {
    const index = props.type ? props.type : 0;
    const dispatch = useDispatch();
    const user = useSelector((state) => state.auth.user);

    useEffect(() => {
        dispatch(shopActions.getShopByUserId(user.id));
    }, [user]);

    return (
        <div style={{ backgroundColor: "#EEEEEE" }}>
            <NavBar {...props} />
            <SellerDashbroad index={index} />
            <Footer />
        </div>
    );
};

export default SellerPage;
