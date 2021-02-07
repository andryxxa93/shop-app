import React, {useReducer, useEffect} from 'react';
import {View, Text, TextInput, StyleSheet } from 'react-native';

const Input = (props) => {

    const INPUT_CHANGE = 'INPUT_CHANGE';
    const LOST_FOCUS = 'LOST_FOCUS';
    const inputReducer = (state, action) => {
        switch (action.type) {
            case INPUT_CHANGE:
                return {
                    ...state,
                    value: action.value,
                    isValid: action.isValid
                }
            case LOST_FOCUS:
                return {
                    ...state,
                    touched: true
                }
            default:
                return state;
        }
    }

    const [inputState, dispatch] = useReducer(inputReducer, {
        value: props.intialValue ? props.intialValue : '',
        isValid: props.initiallyValid,
        touched: false
    })

    const {onInputChange, id} = props;

    useEffect(() => {
        if (inputState.touched) {
            props.onInputChange(id, inputState.value, inputState.isValid);
        }
    }, [inputState, onInputChange, id])

    const textChangeHandler = text => {
        const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        let isValid = true;
        if (props.required && text.trim().lenght === 0) {
            isValid = false;
        }
        if (props.email && !emailRegex.test(text.toLowerCase())) {
            isValid = false;
        }
        if (props.min != null && +text < props.min) {
            isValid = false;
        }
        if (props.max != null && +text > props.max) {
            isValid = false
        }
        if (props.minLength != null && text.lenght < props.minLength) {
            isValid = false
        }
        dispatch({type: INPUT_CHANGE, value: text, isValid: isValid})
    }

    const lostFocusHandler = () => {
        dispatch({
            type: LOST_FOCUS
        });
    }

   return (
       <View>
           <View style={styles.formControl}>
                <Text style={styles.text}>{props.label}</Text>
                <TextInput
                    {...props}
                    value={inputState.value}
                    onChangeText={textChangeHandler.bind(this, 'title')}
                    style={styles.input}
                    onBlur={lostFocusHandler}
                />
            </View>
            {!inputState.isValid && <Text>
                {props.errorText}
            </Text>}
       </View>
   )
}

const styles = StyleSheet.create({
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

export default Input;