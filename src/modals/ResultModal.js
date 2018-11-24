import React from 'react';
import { Modal, View, StyleSheet, Text, Image } from 'react-native';
import { AdUnits, imageSources } from '../Config';
import Button from '../components/Button';
import { AdMobBanner } from 'react-native-admob';

type Props = {
    visible: boolean,
    onRequestClose: Function,
    result: any,
    source: any
};

export default class ResultModal extends React.Component<Props> {
    render() {
        const { visible, result, source, onRequestClose } = this.props;

        let imageComponent;
        if (typeof source === 'number') {
            imageComponent = <Image source={imageSources[source]} style={styles.image} />;
        } else if (typeof source === 'string') {
            imageComponent = <Image source={{ uri: source }} style={styles.image} />;
        }

        const whiteColorStyle = { color: '#FFF' };

        return (
            <Modal visible={visible} animationType="slide" transparent={false} onRequestClose={() => onRequestClose()}>
                <View style={styles.container}>
                    <Text style={styles.heading}>The result</Text>

                    <View style={styles.frame}>{imageComponent}</View>

                    {result && (
                        <View style={styles.textWrap}>
                            <Text style={styles.text}>{result.breed_name}</Text>
                        </View>
                    )}

                    <Button
                        onPress={() => onRequestClose()}
                        title={'Dismiss'}
                        buttonStyle={styles.dismiss}
                        textStyle={whiteColorStyle}
                    />

                    <AdMobBanner adSize={'banner'} adUnitID={AdUnits.ResultScreen} />
                </View>
            </Modal>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#03A9F4',
        flex: 1,
        alignItems: 'center'
    },
    heading: {
        color: '#FFF',
        marginTop: 80,
        fontSize: 30
    },
    frame: {
        marginTop: 30,
        backgroundColor: '#FFF',
        width: 280,
        height: 280,
        justifyContent: 'center',
        alignItems: 'center'
    },
    image: {
        width: 260,
        height: 260
    },
    textWrap: {
        backgroundColor: '#FFEB3B',
        width: 280,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 15
    },
    text: {
        textAlign: 'center',
        color: '#3e5441',
        fontSize: 18
    },
    dismiss: {
        marginTop: 20,
        marginBottom: 20
    }
});
