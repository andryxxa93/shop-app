import React from 'react';
import {
    View,
    StyleSheet,
    Text,
    Image,
    Button,
} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { useSelector, useDispatch } from 'react-redux';
import * as cartActions from '../../store/actions/cart';

const ProductsDetailsScreen = (props) => {

    const productId = props.navigation.getParam('productId')
    const selectedProduct = useSelector(state => state.products.availableProducts.find(prod => prod.id === productId))
    const dispatch = useDispatch();
    return (
        <ScrollView>
            <Image style={styles.image} source={{uri: selectedProduct.imageUrl}}/>
            <View style={styles.actions}>
                <Button color={Colors.main} title='Add to cart' onPress={() => {
                    dispatch(cartActions.addToCart(selectedProduct))
                }}/>
            </View>
            <Text style={styles.price}>
                ${selectedProduct.price.toFixed(2)}
            </Text>
            <Text style={styles.description}>
                {selectedProduct.description}
            </Text>
        </ScrollView>
    )
}

ProductsDetailsScreen.navigationOptions = navData => {
    return {
        headerTitle: navData.navigation.getParam('productTitle')
    } 
}

export default ProductsDetailsScreen;

const styles = StyleSheet.create({
    image: {
        width: '100%',
        height: 300
    },
    actions: {
        marginVertical: 10,
        alignItems: 'center'
    },
    price: {
        fontFamily: 'open-sans-bold',
        textAlign: 'center',
        fontSize: 14,
        color: 'grey'
    },
    description: {
        fontFamily: 'open-sans',
        marginVertical: 20,
        textAlign: 'center',
        fontSize: 14,
        marginHorizontal: 20
    }

})