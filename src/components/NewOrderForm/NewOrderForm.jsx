import '../../assets/css/NewOrderForm.css'
import {Controller, useForm} from "react-hook-form";
import * as Yup from 'yup'
import {yupResolver} from "@hookform/resolvers/yup";
import Input from "../Input/Input.jsx";
import {useDispatch, useSelector} from "react-redux";
import {makeOrder} from "../../redux/slices/cartSlice.js";
import {useNavigate} from "react-router-dom";

const NewOrderForm = (props) => {

    const totalPrice = useSelector(store => store.cart.totalPrice);
    const cartItems = useSelector(store => store.cart.cartItems);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const formSchema = Yup.object().shape({
        firstname: Yup.string().required(),
        phone: Yup.string().required().matches(/^[0-9]+$/, "Must be only digits")
            .min(10, 'Must be exactly 10 digits.')
            .max(10, 'Must be exactly 10 digits.'),
        address: Yup.string().required()
    });

    const {handleSubmit, control, formState: {errors, isValidating, isValid}} = useForm({
        mode: 'onChange',
        defaultValues: {
            firstname: props.username || "",
            phone: "",
            address: "",
            isHighPriority: false
        },
        resolver: yupResolver(formSchema)
    });

    const handleFormSubmit = (data) => {
        if (!isValid) {
            return;
        }
        dispatch(makeOrder({orderDetails: data, cartItems: cartItems, totalPrice: totalPrice}))
            .unwrap()
            .then(({data}) => {
                navigate('/success/' + data.id);
            });
    }

    return (
        <form className="new-order-form" onSubmit={handleSubmit(handleFormSubmit)}>
            <div className="field-container">
                <label htmlFor="firstname">First Name:</label>
                <Controller
                    control={control}
                    name="firstname"
                    render={({field}) => <Input {...field} type="text" placeholder="First Name"/>}
                />
            </div>
            {errors.firstname && <div className="error-block">{errors.firstname.message}</div>}

            <div className="field-container">
                <label htmlFor="phone">Phone Number:</label>
                <Controller
                    control={control}
                    name="phone"
                    render={({field}) => <Input {...field} type="text" placeholder="Phone Number"/>}
                />
            </div>
            {errors.phone && <div className="error-block">{errors.phone.message}</div>}

            <div className="field-container">
                <label htmlFor="address">Address:</label>
                <Controller
                    control={control}
                    name="address"
                    render={({field}) => <Input {...field} type="text" placeholder="Address"/>}
                />
            </div>
            {errors.address && <div className="error-block">{errors.address.message}</div>}

            <div className="field-container is-high-priority">
                <Controller
                    control={control}
                    name="isHighPriority"
                    render={({field}) => <Input {...field} type="checkbox"/>}
                />
                <div>Want to give your order priority?</div>
            </div>

            <button type="submit" disabled={isValidating}>Order now for €{totalPrice}</button>
        </form>
    );
}

export default NewOrderForm;