import React from 'react';
import { Button, FlatList, Alert } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { useSelector, useDispatch } from 'react-redux';
import * as ProductsActions from '../../store/actions/products';

import ProductItem from '../../components/shop/ProductItem';
import HeaderButton from '../../components/UI/HeaderButton';
import Colors from '../../constants/Colors';


const UserProductsScreen = (props) => {
    const userProducts = useSelector(state => state.products.userProducts);
    const editProductHandler = (id) => {props.navigation.navigate('Edit', {productId: id})}
    const dispatch = useDispatch();

    const deleteHandler = (id) => {
        Alert.alert('Are you sure?', 'Are you realy wont to delete this item?', [
            {text: 'No', style: 'default'},
            {text: 'Yes', style: 'destructive', onPress: () => dispatch(ProductsActions.deleteProduct(id))}
        ])

    }

    return <FlatList 
            data={userProducts} 
            keyExtractor={item => item.id}
            renderItem={({item}) => {
                return (<ProductItem
                    imageUrl={item.imageUrl}
                    title={item.title}
                    price={item.price}
                    onSelect={() => editProductHandler(item.id)}
                >
                    <Button color={Colors.accent} title='Edit' onPress={() => editProductHandler(item.id)}/>
                    <Button color={Colors.accent} title='Delete' onPress={() => deleteHandler(item.id)}/>
                </ProductItem>)}}
            />
}

UserProductsScreen.navigationOptions = navData => {
    return {
        headerTitle: 'Your Products',
        headerLeft: () => <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
            title='MenuItem'
            onPress = {() => {navData.navigation.toggleDrawer()}}
            iconName={Platform.OS === 'ios' ? 'ios-menu' : 'md-menu' }
        />
        </HeaderButtons>,
        headerRight: () => <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
            title='Add'
            onPress = {() => {navData.navigation.navigate('Edit')}}
            iconName={Platform.OS === 'ios' ? 'ios-create' : 'md-create' }
        />
        </HeaderButtons>
    }
}

export default UserProductsScreen;