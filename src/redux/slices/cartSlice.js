import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";

const initialState = {
    cartItems: [],
    pizzas: [],
    isLoading: false,
    isError: true,
    currentOrder: null,
    totalItems: 0,
    totalPrice: 0
}

export const getAllPizzas = createAsyncThunk(
    'cart/getAllPizzas',
    async () => {
        try {
            const res = await fetch('https://react-fast-pizza-api.onrender.com/api/menu');
            if (!res.ok) {
                throw new Error('Fetch failed')
            }
            const { data } = await res.json();
            return data;
        } catch (e) {
            console.log(e)
        }
    }
);

export const makeOrder = createAsyncThunk(
    'cart/makeOrder',
    async ({orderDetails, cartItems, totalPrice}) => {
        const bodyData = {
            address: orderDetails.address,
            customer: orderDetails.firstname,
            phone: orderDetails.phone,
            priority: orderDetails.isHighPriority,
            position: "",
            cart: cartItems.map((item) => {
                return {
                    name: item.name,
                    pizzaId: item.id,
                    quantity: item.qty,
                    totalPrice: item.qty * item.unitPrice,
                    unitPrice: item.unitPrice
                };
            }),
            totalPrice: totalPrice
        };
        try {
            const response = await fetch('https://react-fast-pizza-api.onrender.com/api/order', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(bodyData)
            });
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return await response.json();
        } catch (error) {
            console.error('There has been a problem with your fetch operation:', error);
        }
    }
);

export const getOrder = createAsyncThunk(
    'cart/getOrder',
    async (orderId) => {
        try {
            const response = await fetch('https://react-fast-pizza-api.onrender.com/api/order/' + orderId, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const { data } = await response.json();
            return data;
        } catch (error) {
            console.error('There has been a problem with your fetch operation:', error);
        }
    }
);

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart: (state, action) => {
            const findItem = state.cartItems.find(cartItem => cartItem.id === action.payload.id);
            if (!findItem) {
                state.cartItems.push({...action.payload, qty: 1});
            } else {
                findItem.qty += 1;
            }
            state.totalItems = calcTotalItems(state.cartItems)
            state.totalPrice = calcTotalPrice(state.cartItems)
        },
        removeFromCart: (state, action) => {
            const findItem = state.cartItems.find(cartItem => cartItem.id === action.payload);
            if (findItem.qty === 1) {
                // remove item from cartItems
                state.cartItems = state.cartItems.filter(item => item.id !== action.payload)
            } else {
                // decrease quantity
                findItem.qty -= 1;
            }
            state.totalItems = calcTotalItems(state.cartItems)
            state.totalPrice = calcTotalPrice(state.cartItems)
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getAllPizzas.pending, (state) => {
            state.isLoading = true;
            state.isError = false;
        });
        builder.addCase(getAllPizzas.fulfilled, (state, action) => {
            state.isLoading = false;
            state.pizzas = action.payload;
        });
        builder.addCase(getAllPizzas.rejected, (state) => {
            state.isLoading = false;
            state.isError = true;
        })
        builder.addCase(makeOrder.pending, (state) => {
            state.isLoading = true;
            state.isError = false;
            state.currentOrder = null; // Reset order before we create a new one
        });
        builder.addCase(makeOrder.fulfilled, (state, action) => {
            state.isLoading = false;
            state.currentOrder = action.payload; // after we create order we reset current order for later usage
        });
        builder.addCase(makeOrder.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            console.log("Error", action);
        });
        builder.addCase(getOrder.pending, (state) => {
            state.isLoading = true;
            state.isError = false;
        });
        builder.addCase(getOrder.fulfilled, (state, action) => {
            state.isLoading = false;
            state.currentOrder = action.payload; // after we get order details we reset current order for later usage
        });
        builder.addCase(getOrder.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            console.log("Error", action);
        });
    }
})

export const { addToCart, removeFromCart } = cartSlice.actions
export default cartSlice.reducer;

const calcTotalItems = (items) => items.reduce((acc, item) => acc = acc + item.qty, 0);
const calcTotalPrice = (items) => items.reduce((acc, item) => acc = acc + item.qty * item.unitPrice, 0);