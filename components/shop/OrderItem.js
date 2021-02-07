import React, { useState } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { useDispatch } from 'react-redux';

import * as ordersActions from '../../store/actions/orders';
import Colors from '../../constants/Colors';
import CartItem from './CartItem';


const OrderItem = ({amount, date, items, id}) => {
    const [showDetails, setShowDetails] = useState(false)
    const dispatch = useDispatch();
    return (
        <View style={styles.orderItem}>
            <View style={styles.summary}>
                <Text style={styles.amount}>
                    {amount.toFixed(2)}
                </Text>
                <Text style={styles.date}>
                    {date}
                </Text>
            </View>
            <Button 
                color={Colors.accent} 
                title= {(showDetails ? 'Hide ' : 'Show ') + 'Details'}
                onPress={() => {
                    setShowDetails(prevState => !prevState)
                }}
                />
            <Button title='Remove Order' onPress={() => dispatch(ordersActions.removeOrder(id))}/>
            {showDetails && <View style={styles.details}>
                    {items.map(cartItem => {
                        return (
                            <CartItem 
                                quantity={cartItem.quantity} 
                                price={cartItem.productPrice}  
                                title={cartItem.productTitle}
                                key={cartItem.productId}    
                            />)
                        })}
                </View>} 
        </View>
    )
}

const styles = StyleSheet.create({
    orderItem: {
        shadowColor: 'black',
        shadowOpacity: 0.26,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 8,
        elevation: 5,
        borderRadius: 10,
        backgroundColor: 'white',
        margin: 20,
        padding: 10,
        alignItems: 'center'
    },
    summary: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        marginBottom: 10
    },
    totalAmount: {
        fontFamily: 'open-sans-bold',
        fontSize: 16
    },
    date: {
        fontSize: 16,
        fontFamily: 'open-sans',
        color: '#bbb'
    },
    details: {
        width: '100%',

    }
})

export default OrderItem;
