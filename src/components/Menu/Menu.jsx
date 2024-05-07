import '../../assets/css/Menu.css'
import MenuItem from "./MenuItem/MenuItem.jsx";
import {useEffect, useState} from "react";

const Menu = () => {

    const [menu, setMenu] = useState([])
    const [cart, setCart] = useState([]);

    const getAllPizzas = async () => {
        try {
            const res = await fetch('https://react-fast-pizza-api.onrender.com/api/menu');
            if (!res.ok) {
                throw new Error('Fetch failed')
            }
            const data = await  res.json();
            setMenu(data.data);
        } catch (e) {
            console.log(e)
        }
    }

    useEffect(() => {
        getAllPizzas();
    }, []);


    const handleAddToCart = (cartItemId) => {
        const callback = (cart) => {
            // if new we add it to the cart
            if (!cart.find((item) => item.id === cartItemId)) {
                return [...cart, {
                    id: cartItemId,
                    qty: 1
                }]
            }
            // if same we increase the qty
            return cart.map((item) => {
                if (item.id === cartItemId) {
                    return {
                        ...item,
                        qty: item.qty + 1
                    }
                }
                return item;
            });
        }
        setCart(callback);
    };

    const handleRemoveFromCart = (cartItemId) => {
        const callback = (cart) => {
            let newCart = cart.map((item) => {
                if (item.id === cartItemId) {
                    return {
                        ...item,
                        qty: item.qty - 1
                    }
                }
                return item;
            });
            return newCart.filter(item => item.qty > 0);
        }
        setCart(callback);
    };

    return (
        <ul>
            {menu.map((pizza) => {
                return <MenuItem
                    key={pizza.id}
                    pizza={pizza}
                    handleAddToCart={handleAddToCart}
                    handleRemoveFromCart={handleRemoveFromCart}
                    cartItem={cart.find((item) => item.id === pizza.id)}
                />
            })}
        </ul>
    );
}

export default Menu;