import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { useSelector } from 'react-redux';
import { HeaderButtons, Item } from 'react-navigation-header-buttons'

import HeaderButton from '../../components/UI/HeaderButton';
import OrderItem from '../../components/shop/OrderItem';

const OrderScreen = (props) => {
    
    const orders = useSelector(state => state.orders.orders);
    return <FlatList
                data={orders}
                keyExtractor={item => item.id}
                renderItem={itemData => <OrderItem id={itemData.item.id} date={itemData.item.readeableDate} items={itemData.item.items} amount={itemData.item.amount}/>}
        />
}

OrderScreen.navigationOptions = navData => {
    return {
        headerTitle: 'Your Orders',
        headerLeft: () => <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
            title='ManuItem'
            onPress = {() => {navData.navigation.toggleDrawer()}}
            iconName={Platform.OS === 'ios' ? 'ios-menu' : 'md-menu' }
        />
        </HeaderButtons>
    }
}

export default OrderScreen;