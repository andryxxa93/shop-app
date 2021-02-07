import React from 'react';
import { View, StyleSheet, Text, Image, TouchableOpacity, Platform, TouchableNativeFeedback, Touchable } from 'react-native';
import Card from '../UI/Card';

const ProductItem = ({title, price, children, imageUrl, onSelect}) => {

    const TouchableCmp = Platform.OS === 'android' && Platform.Version > 21 ? TouchableNativeFeedback : TouchableOpacity

    return (
        <Card style={stlyes.product}>
            <View style={stlyes.touchable}>
                <TouchableCmp onPress={onSelect} useForeground>
                <View>
                <View style={stlyes.imageContainer}>
                    <Image style={stlyes.image} source={{uri: imageUrl}}/>
                </View>
                <View style={stlyes.info}>
                    <Text style={stlyes.title}>
                        {title}
                    </Text>
                    <Text style={stlyes.price}>
                        ${price.toFixed(2)}
                    </Text>
                </View>
                    <View style={stlyes.actions}>
                        {children}
                    </View>
                </View>
                </TouchableCmp>
            </View>
        </Card>
    )
}

const stlyes = StyleSheet.create({
    product: {
        height: 300,
        margin: 20
      },
      touchable: {
        borderRadius: 10,
        overflow: 'hidden'
      },
      imageContainer: {
        width: '100%',
        height: '60%',
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        overflow: 'hidden'
      },
    image: {
        width: '100%',
        height: '100%'
    },
    info: {
        alignItems: 'center',
        height: '15%'    
    },
    title: {
        fontFamily: 'open-sans-bold',
        fontSize: 18,
        marginVertical: 4,
    },
    price: {
        fontFamily: 'open-sans',
        fontSize: 14,
        color: '#888',
    },
    actions: {
        flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: '25%',
    paddingHorizontal: 20
    }
});

export default ProductItem;