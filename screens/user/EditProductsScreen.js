import React, { useState, useCallback, useEffect, useReducer } from 'react';
import {Alert, View, Text, ScrollView, StyleSheet, TextInput} from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { useSelector, useDispatch } from 'react-redux';

import HeaderButton from '../../components/UI/HeaderButton';
import * as productsActions from '../../store/actions/products';
import Input from '../../components/UI/Input';

const types = {
    FORM_UPDATE: 'REDUCER_UPDATE'
}

const reducer = (state, action) => {
    if (action.type === types.FORM_UPDATE) {
        const updatedValues = {
            ...state.inputValues,
            [action.input]: action.value
        };
        const updateValidities = {
            ...state.inputValidities,
            [action.input]: action.isValid
        }

        let updatedFormIsValid = true;
        for (const key in updateValidities) {
            updatedFormIsValid = updatedFormIsValid && updateValidities[key]
        }
        return {
            formIsValid: updatedFormIsValid,
            inputValidities: updateValidities,
            inputValues: updatedValues
        }
    };
    return state
};

const EditProductScreen = (props) => {

    const productId = props.navigation.getParam('productId');

    const product = useSelector(state => state.products.userProducts.find(prod => prod.id === productId))

    const dispatch = useDispatch();

    const [formState, dispatchFormState] = useReducer(reducer, {
        inputValues: {
            title: product ? product.title : '',
            imageUrl: product ? product.imageUrl : '',
            description: product ? product.description : '', 
            price: ''
    }, 
        inputValidities: {
            title: product ? true : false,
            description: product ? true : false,
            imageUrl: product ? true : false,
            price: product ? true : false,
    }, 
        formIsValid: product ? true : false
    })


    const updateProd = () => {
        dispatch(productsActions.updateProduct(productId, formState.inputValues.title, formState.inputValues.description, formState.inputValues.imageUrl))
        props.navigation.goBack();
    };
    const createProd = () => {
        dispatch(productsActions.createProduct(formState.inputValues.title, formState.inputValues.description, formState.inputValues.imageUrl, +formState.inputValues.price))
        props.navigation.goBack()
    };
const submitHandler = useCallback(() => {
    if (!formState.formIsValid) {
        Alert.alert('Wront input', 'Please check the errors in a form', [{
            text: 'okay'
        }])
        return
    }
    product ? updateProd() : createProd();
}, [dispatch, productId, formState])

    useEffect(() => {
        props.navigation.setParams({submit: submitHandler})
    }, [submitHandler])

    const textChangeHandler = useCallback((inputIdentifier, inputValue, inputValidity) => {
        dispatchFormState({
            type: types.FORM_UPDATE,
            value: inputValue,
            isValid: inputValidity,
            input: inputIdentifier
        })
    }, [dispatchFormState])

   return <ScrollView>
            <View style={styles.container}>
                <Input
                    id='title'
                    label='Title'
                    errorText='Please enter a valid title'
                    keyboardType='default'
                    autoCapitalize='sentences'
                    autoCorrect
                    returnKeyType='next'
                    onInputChange={textChangeHandler}
                    initialValue = {product ? product.title : ''}
                    initiallyValid={!!product}
                    required
                />
                {product 
                ? null 
                :   (<Input
                        id='price'
                        label='Price'
                        errorText='Please enter a valid price'
                        keyboardType='number-pad'
                        returnKeyType='next'
                        onInputChange={textChangeHandler}
                        required
                        min={0.1}
                    />)
                }
                <Input
                    id='description'
                    label='Description'
                    errorText='Please enter a valid description'
                    keyboardType='default'
                    autoCapitalize='sentences'
                    autoCorrect
                    multiline
                    numberOfLine={3}
                    onInputChange={textChangeHandler}
                    initialValue = {product ? product.description : ''}
                    initiallyValid={!!product}
                    required
                    minLength={5}
                />
                <Input
                    id='imageUrl'
                    label='Image URL'
                    errorText='Please enter a valid image url'
                    keyboardType='default'
                    autoCapitalize='sentences'
                    onInputChange={textChangeHandler}
                    initialValue = {product ? product.imageUrl : ''}
                    initiallyValid={!!product}
                    required
                />
            </View>
        </ScrollView>
}

EditProductScreen.navigationOptions = navData => {

    const submitFn = navData.navigation.getParam('submit');

    return {
        headerTitle: navData.navigation.getParam('productId' ? 'Edit Product' : 'Add Product'),
        headerRight: () => <HeaderButtons HeaderButtonComponent={HeaderButton}>
            <Item
                title='Save'
                onPress = {submitFn}
                iconName={Platform.OS === 'ios' ? 'ios-checkmark' : 'md-checkmark' }
            />
        </HeaderButtons>
    }
}

const styles = StyleSheet.create({
    container: {
        margin: 20
    },
    formControl: {
        width: '100%'
    },
    text: {
        fontFamily: 'open-sans-bold',
        marginVertical: 8
    },
    input: {
        paddingVertical: 5,
        paddingHorizontal: 2,
        borderBottomColor: '#ccc',
        borderBottomWidth: 2
    }
})

export default EditProductScreen;