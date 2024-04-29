import Button from "../Button/Button.jsx";

const MenuItem = ({pizza, handleAddToCartButton}) => {

    const {name, ingredients, unitPrice, imageUrl, soldOut} = pizza;
    return (
        <li className="pizza">
            <img src={imageUrl} className="pizza__image" alt={name}/>
            <div className="pizza__info">
                <p className="pizza__name">{name}</p>
                <p className="pizza__ingredients">{ingredients.join(', ')}</p>
                <div className="pizza__actions">
                    {soldOut ? (
                        <p className="pizza__sold-out">Sold out</p>
                    ) : (<>
                        <p className="pizza__price">€{unitPrice}</p>
                        <Button className="button" handleClickOnButton={handleAddToCartButton} text="Add to cart" />
                    </>)}
                </div>
            </div>
        </li>
    );
}

export default MenuItem;