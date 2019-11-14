import React from 'react';
import { View, StyleSheet, Text, ActivityIndicator } from 'react-native';

type Props = {
    visible: boolean
};
export default class Analyzing extends React.Component<Props> {
    render() {
        if (!this.props.visible) {
            return null;
        }

        return (
            <View style={styles.container}>
                <ActivityIndicator size={'large'} color={'#FFF'} />
                <Text style={styles.text}>Analyzing your photo...</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'rgba(0,0,0,.6)',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1
    },
    text: {
        color: '#FFF',
        fontSize: 18,
        marginTop: 10,
        marginBottom: 20
    }
});
