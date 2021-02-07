import {addOrder, ADD_ORDER, REMOVE_ORDER} from '../actions/orders';
import Order from '../../models/order';

const initialState = {
    orders: []
}

export default (state = initialState, action) => {
    switch (action.type) {
        case ADD_ORDER:
            const newOrder = new Order(new Date().toString(), 
                action.orderData.items, 
                action.orderData.amount, 
                new Date()
            );
            return {
                ...state,
                orders: state.orders.concat(newOrder)
            }
        case REMOVE_ORDER: 
            const newState = state.orders.filter(item => item.id !== action.orderId)
            console.log('newState', newState)
            console.log('oldState', state.orders)
            return {
                ...state,
                orders: [...newState]
            }
    }
    return state;
}