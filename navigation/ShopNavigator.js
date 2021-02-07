import React from 'react';
import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';
import { createDrawerNavigator } from 'react-navigation-drawer';
import { Platform } from 'react-native';
import ProductsOverviewScreen from '../screens/shop/ProductsOverviewScreen';
import Colors from '../constants/Colors';
import ProductsDetailsScreen from '../screens/shop/ProductsDetailsScreen';
import UserProductsScreen from '../screens/user/UserProductsScreen';
import CartScreen from '../screens/shop/CartScreen';
import OrderScreen from '../screens/shop/OrderScreen';
import { Ionicons } from '@expo/vector-icons';
import EditProductScreen from '../screens/user/EditProductsScreen';

const defaultNavigationOptions = {
    defaultNavigationOptions: {
        headerStyle: {
            backgroundColor: Platform.OS === 'android' ? Colors.main : ''
        },
        headerTintColor: Colors.accent
    }
}

const ProductNavigator = createStackNavigator({
    ProductsOverview: ProductsOverviewScreen,
    ProductDetail: ProductsDetailsScreen,
    Cart: CartScreen,
    Order: OrderScreen
}, {
    navigationOptions: {
        drawerIcon: drawerConfig => (
            <Ionicons 
                name={Platform.OS === 'android' ? 'md-list' : 'ios-list'}
                size={23}
                color={drawerConfig.tintColor}
            />
                
        )
    },
    ...defaultNavigationOptions
})

const OrdersNavigator = createStackNavigator({
    Order: OrderScreen
}, {
    navigationOptions: {
        drawerIcon: drawerConfig => (
            <Ionicons 
                name={Platform.OS === 'android' ? 'md-create' : 'ios-create'}
                size={23}
                color={drawerConfig.tintColor}
            />
                
        )
    },
    ...defaultNavigationOptions
})

const AdminNavigator = createStackNavigator({
    User: UserProductsScreen,
    Edit: EditProductScreen
}, {
    navigationOptions: {
        drawerIcon: drawerConfig => (
            <Ionicons 
                name={Platform.OS === 'android' ? 'person' : 'ios-person'}
                size={23}
                color={drawerConfig.tintColor}
            />
                
        )
    },
    ...defaultNavigationOptions
})

const ShopNavigator = createDrawerNavigator({
    Products: ProductNavigator,
    Orders: OrdersNavigator,
    Admin: AdminNavigator
}, {
    contentOptions: {
        activeTintColor: Colors.accent
    }
})

export default createAppContainer(ShopNavigator);