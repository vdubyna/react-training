import {useNavigate, useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {getOrder} from "../redux/slices/cartSlice.js";
import {useEffect} from "react";
import {Container, Typography, Box, Paper, Button, List, ListItem, ListItemText, Divider} from '@mui/material';
import EstimateDeliveryTimer from "../components/EstimateDeliveryTimer/EstimateDeliveryTimer.jsx";

const formatDeliveryDate = function (deliveryTime) {
    const options = {month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit'};
    const deliveryDate = new Date(deliveryTime);
    return new Intl.DateTimeFormat('en-US', options).format(deliveryDate);
}

const SuccessPage = function () {
    const {orderId} = useParams();
    const currentOrder = useSelector(store => store.cart.currentOrder);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    if (!orderId) { // if order id is not set we forward to main page
        navigate('/');
    }

    useEffect(() => {
        if (!currentOrder ||
            (currentOrder && currentOrder.id !== orderId)
        ) {
            // If current order loaded and it is equal to orderId we don't need to reload it
            // If it does not we load order details by api
            console.log(currentOrder, orderId);
            dispatch(getOrder(orderId));
        }
    }, [dispatch, currentOrder, orderId]);

    if (!currentOrder) {
        return (
            <h1>Loading...</h1>
        );
    }

    return (
        <Container maxWidth="md">
            <Box sx={{textAlign: 'center', my: 4}}>
                <Typography variant="h4" gutterBottom>
                    PIZZA DAY
                </Typography>
                <Paper elevation={3} sx={{p: 3}}>
                    <Typography variant="h5" gutterBottom>
                        Order #{currentOrder.id} status: {currentOrder.status}
                    </Typography>
                    <Box sx={{display: 'flex', justifyContent: 'space-between', my: 2}}>
                        <Typography variant="body1" color="primary">
                            <EstimateDeliveryTimer deliveryTime={currentOrder.estimatedDelivery}/>
                        </Typography>
                        <Typography variant="body2" color="textSecondary">
                            (Estimated delivery: {formatDeliveryDate(currentOrder.estimatedDelivery)})
                        </Typography>
                    </Box>
                    <Box sx={{display: 'flex', justifyContent: 'center', my: 2}}>
                        {currentOrder.priority && (
                            <Button variant="contained" color="error" sx={{mr: 1}}>
                                PRIORITY
                            </Button>
                        )}
                        <Button variant="contained" color="success">
                            PREPARING ORDER
                        </Button>
                    </Box>
                    <List>
                        {currentOrder.cart.map((item) => {
                            return <div key={item.pizzaId}>
                                <ListItem>
                                    <ListItemText
                                        primary={`${item.quantity}× ${item.name}`}
                                        secondary={item.addIngredients.join(', ')}
                                    />
                                    <Typography variant="body1">€{item.totalPrice}</Typography>
                                </ListItem>
                                <Divider/>
                            </div>;
                        })
                        }
                    </List>
                    <Box sx={{mt: 3, p: 2, bgcolor: 'background.paper', borderRadius: 1}}>
                        <Typography variant="body1">Price pizza: €{currentOrder.orderPrice}</Typography>
                        <Typography variant="body1">Price priority: €{currentOrder.pricePriority || 0.00}</Typography>
                        <Typography variant="body1">To pay on delivery: €{(currentOrder.pricePriority || 0) + currentOrder.orderPrice}</Typography>
                    </Box>
                </Paper>
            </Box>
        </Container>
    );
};

export default SuccessPage;
