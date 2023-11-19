import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as shopActions from "../../store/actions/shopActions";
import SellerDashbroad from "../UI/SellerDashboard";
import NavBar from "../layout/NavBar";
import Footer from "../layout/Footer";
import SellerRegister from "../UI/SellerDashbroadComponents/SellerRegister";

const SellerPage = (props) => {
    const index = props.type ? props.type : 0;
    const dispatch = useDispatch();
    const user = useSelector((state) => state.auth.userData);

    useEffect(() => {
        if (user && user.role === "seller")
            dispatch(shopActions.getShopByUserId(user.id));
    }, [user]);

    return (
        <div style={{ backgroundColor: "#EEEEEE" }}>
            <NavBar {...props} />
            {user && user.role !== "user" ? (
                <SellerDashbroad index={index} />
            ) : (
                <SellerRegister />
            )}

            <Footer />
        </div>
    );
};

export default SellerPage;
