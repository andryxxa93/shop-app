import React from 'react';
import { View, Text, StyleSheet, Platform } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Colors from '../../constants/Colors';
import { Ionicons } from '@expo/vector-icons';


const CartItem = (props) => {
    return (
        <View style={styles.info}>
            <View style={styles.itemData}>
                <Text style={styles.quantity}>{props.quantity}</Text>
                <Text style={styles.mainText}>{props.title}</Text>
            </View>
        <View style={styles.itemData}>
            <Text style={styles.mainText}>${props.price}</Text>
            {props.deletable && <TouchableOpacity onPress={props.onRemove} style={styles.deleteBtn}>
                <Ionicons
                    name = {Platform.OS === 'ios' ? 'ios-trash' : 'md-trash'}
                    size={23}
                    color={Colors.accent}
                />
            </TouchableOpacity>}
        </View>
    </View>)
}

export default CartItem;

const styles = StyleSheet.create({
    info: {
        padding: 10,
        backgroundColor: 'white',
        flexDirection: 'row',
        justifyContent: 'space-between',
        margin: 10,
        borderRadius: 10
    },
    itemData: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    quantity: {
        padding: 10,
        fontFamily: 'open-sans',
        color: '#888',
        fontSize: 18,
    },
    mainText: {
        fontFamily: 'open-sans-bold',
        fontSize: 16,
    },
    deleteBtn: {
        marginLeft: 20
    }
})