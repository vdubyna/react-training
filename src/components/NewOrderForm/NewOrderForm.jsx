import '../../assets/css/NewOrderForm.css'
import {Controller, useForm} from "react-hook-form";
import * as Yup from 'yup'
import {yupResolver} from "@hookform/resolvers/yup";
import Input from "../Input/Input.jsx";

const NewOrderForm = (props) => {

    const formSchema = Yup.object().shape({
        firstname: Yup.string().required(),
        phone: Yup.string().required().matches(/^[0-9]+$/, "Must be only digits")
            .min(10, 'Must be exactly 10 digits.')
            .max(10, 'Must be exactly 10 digits.'),
        address: Yup.string().required()
    });

    const {handleSubmit, control, formState: {errors, isValidating}} = useForm({
        mode: 'onSubmit',
        defaultValues: {
            firstname: props.username || "",
            phone: "",
            address: "",
            isHighPriority: false
        },
        resolver: yupResolver(formSchema)
    });

    const handleFormSubmit = (data) => {
        console.log('Form submitted', data)
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

            <button type="submit" disabled={isValidating} onClick={handleFormSubmit}>Order now for €39.00</button>
        </form>
    );
}

export default NewOrderForm;