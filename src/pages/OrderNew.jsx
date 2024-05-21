import NewOrderForm from "../components/NewOrderForm/NewOrderForm.jsx";
import {AuthContext} from "../contexts/AuthContext.jsx";
import {useContext} from "react";

const OrderNewPage = function () {
    const {username} = useContext(AuthContext)

    return (
        <div className="order-new-page-container">
            <div className="title">Ready to Order? Lets Go!</div>
            <NewOrderForm username={username}/>
        </div>
    );
};

export default OrderNewPage;
