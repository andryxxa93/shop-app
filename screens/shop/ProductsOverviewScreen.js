import React from 'react';
import { FlatList, Button, Platform } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { HeaderButtons, Item } from 'react-navigation-header-buttons'

import * as cartActions from '../../store/actions/cart';
import ProductItem from '../../components/shop/ProductItem';
import HeaderButton from '../../components/UI/HeaderButton';
import Colors from '../../constants/Colors';

const ProductsOverviewScreen = (props) => {
    const products = useSelector(state => state.products.availableProducts)
    const dispatch = useDispatch();

    const onSelectHandler = (id, title) => {
        props.navigation.navigate('ProductDetail', { productId: id, productTitle: title });
    }

    return (
        <FlatList 
            data={products}
            renderItem={({item}) => (
                <ProductItem
                    title={item.title}
                    imageUrl={item.imageUrl}
                    price={item.price}
                    description={item.description}
                    onSelect={() => onSelectHandler(item.id, item.title)}
                >
                    <Button color={Colors.accent} title='View details' onPress={() => onSelectHandler(item.id, item.title)}/>
                    <Button color={Colors.accent} title='To Cart' onPress={() => {
                        dispatch(cartActions.addToCart(item))
                    }}/>
                </ProductItem>
            )}
            keyExtractor={item => item.id}
            />
    )
}

ProductsOverviewScreen.navigationOptions = navData => {
    return {
        headerTitle: 'All products',
        headerRight: () => <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item 
            title='Cart' 
            onPress={() => {navData.navigation.navigate('Cart')}}
            iconName={Platform.OS === 'android' ? 'md-cart' : 'ios-cart'}/>
        </HeaderButtons>,
        headerLeft: () => <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
            title='ManuItem'
            onPress = {() => {navData.navigation.toggleDrawer()}}
            iconName={Platform.OS === 'ios' ? 'ios-menu' : 'md-menu' }
        />
        </HeaderButtons>
    }
}

export default ProductsOverviewScreen;