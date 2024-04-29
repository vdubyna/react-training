import '../../assets/css/Menu.css'
import pizzas from "./data.js";
import MenuItem from "../MenuItem/MenuItem.jsx";

const handleAddToCartButton = () => {
    console.log('Add To Cart Button clicked');
}

const Menu = () => {
    return (
        <ul>
            {pizzas.map((pizza) => {
                return <MenuItem key={pizza.id} pizza={pizza} handleAddToCartButton={handleAddToCartButton}/>
            })}
        </ul>
    );
}

export default Menu;