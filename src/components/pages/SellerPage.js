import React from "react";
import { useSelector } from "react-redux";
import SellerDashbroad from "../UI/SellerDashboard";
import NavBar from "../layout/NavBar";
import Footer from "../layout/Footer";
import SellerRegister from "../UI/SellerDashbroadComponents/SellerRegister";

const SellerPage = (props) => {
    const index = props.type ? props.type : 0;
    const user = useSelector((state) => state.auth.userData);

    return (
        <div style={{ backgroundColor: "#EEEEEE" }}>
            {user && user.role !== "user" ? (
                <SellerDashbroad index={index} />
            ) : (
                <>
                    <NavBar {...props} />
                    <SellerRegister />
                    <Footer />
                </>
            )}
        </div>
    );
};

export default SellerPage;
