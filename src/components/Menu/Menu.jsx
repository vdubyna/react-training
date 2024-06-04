import '../../assets/css/Menu.css'
import MenuItem from "./MenuItem/MenuItem.jsx";
import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {addToCart, getAllPizzas, removeFromCart} from "../../redux/slices/cartSlice.js";

const Menu = () => {

    const pizzas = useSelector(store => store.cart.pizzas)
    const cartItems = useSelector(store => store.cart.cartItems);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getAllPizzas());
    }, [dispatch]);

    const handleAddToCart = (pizza) => {
        dispatch(addToCart(pizza));
    };

    const handleRemoveFromCart = (cartItemId) => {
        dispatch(removeFromCart(cartItemId));
    };

    return (
        <ul>
            {pizzas.map((pizza) => {
                return <MenuItem
                    key={pizza.id}
                    pizza={pizza}
                    handleAddToCart={handleAddToCart}
                    handleRemoveFromCart={handleRemoveFromCart}
                    cartItem={cartItems.find((item) => item.id === pizza.id)}
                />
            })}
        </ul>
    );
}

export default Menu;