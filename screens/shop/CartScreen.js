import React from 'react';
import { View, Text, FlatList, Button, StyleSheet, Platform } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import CartItem from '../../components/shop/CartItem';
import * as cartActions from '../../store/actions/cart';
import * as ordersAction from '../../store/actions/orders';
import Colors from '../../constants/Colors';
import Card from '../../components/UI/Card';

const CartScreen = ({navigation}) => {
    const dispatch = useDispatch();
    const cartTotalAmount = useSelector(state => state.cart.totalAmount);
    const cartItems = useSelector(state => {
        const transformedCartItems = [];
        for (const key in state.cart.items) {
            transformedCartItems.push({
                productId: key,
                productTitle: state.cart.items[key].productTitle,
                productPrice: state.cart.items[key].productPrice,
                quantity: state.cart.items[key].quantity,
                sum: state.cart.items[key].sum
            })
        }
        return transformedCartItems.sort((a, b) => a.productId > a.productId ? 1 : -1);
    })

    return (
        <Card style={styles.screen}>
            <View style={styles.summary}>
                <Text style={styles.summaryText}>
                    Total: <Text style={styles.amount}>
                        ${Math.round(cartTotalAmount.toFixed(2) * 100) / 100}
                    </Text>
                </Text>
                <Button 
                    disabled={cartItems.length ? false : true}
                    color={Colors.accent}
                    title='Order Now'
                    onPress={() => dispatch(ordersAction.addOrder(cartItems, cartTotalAmount))}    
                />
            </View>
            <View>
                <FlatList
                    data={cartItems}
                    keyExtractor={item => item.productId}
                    renderItem={({item}) => <CartItem 
                                                deletable
                                                title={item.productTitle}
                                                price={item.productPrice}
                                                quantity={item.quantity} 
                                                onRemove={() => dispatch(cartActions.removeItem(item.productId))}/>}
                />
            </View>
        </Card>
    )
}

CartScreen.navigationOptions = {
    headerTitle: 'Your Cart'
}

const styles = StyleSheet.create({
    screen: {
        margin: 20
    },
    summary: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        margin: 20,
        padding: 10
    },
    summaryText: {
        fontFamily: 'open-sans-bold',
        fontSize: 18
    },
    amount: {
        color: Colors.accent
    }
})

export default CartScreen;