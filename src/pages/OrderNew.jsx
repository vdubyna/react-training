import NewOrderForm from "../components/NewOrderForm/NewOrderForm.jsx";
import {AuthContext} from "../contexts/AuthContext.jsx";
import {useContext} from "react";
import {useSelector} from "react-redux";

const OrderNewPage = function () {
    const {username} = useContext(AuthContext)
    const totalItems = useSelector(store => store.cart.totalItems);
    const isError = useSelector(store => store.cart.isError);
    if (totalItems === 0) {
        return (
            <div className="order-new-page-container">
                <div className="title">Please add Pizza to Cart before Place an Order!</div>
            </div>
        );
    }

    if (isError) {
        return (
            <div className="order-new-page-container">
                <div className="title">Something went wrong on Place Order Request! Please try again.</div>
            </div>
        );
    }

    return (
        <div className="order-new-page-container">
            <div className="title">Ready to Order? Lets Go!</div>
            <NewOrderForm username={username}/>
        </div>
    );
};

export default OrderNewPage;
