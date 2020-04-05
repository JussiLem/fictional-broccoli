import React from 'react';
import {useState} from 'react'
import {StyleSheet, Text, View, TextInput, Button} from 'react-native';

export default () => {
    const [text, setText] = useState("");
    const [text2, setText2] = useState("");
    const [result, setResult] = useState(0);
    const plus = () => setResult(parseInt(text) + parseInt(text2));
    const minus = () => setResult(parseInt(text) - parseInt(text2));
    return (
        <View style={styles.container}>
            <Text>
                Result: {result}
            </Text>
            <TextInput
                style={styles.textInputStyle}
                onChangeText={e => setText(e)}
                value={text}
                keyboardType={'numeric'}
            />

            <TextInput
                style={styles.textInputStyle}
                onChangeText={e => setText2(e)}
                value={text2}
                keyboardType={'numeric'}
            />
            <View style={styles.buttonStyle}>
                <Button onPress={() => plus()} title="+"/>
                <Button onPress={() => minus()} title="-"/>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',

    },
    textInputStyle: {
        textAlign: 'center',
        width: 200,
        borderRadius: 10,
        borderWidth: 2,
        borderColor: '#009688',
        marginBottom: 10
    },
    buttonStyle: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '20%',
        height: 40
    }
});
