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

        const headerImageSource =
            result && result.is_dog ? require('../assets/img/congrats.gif') : require('../assets/img/sosad.gif');
        const imageHeader = <Image source={headerImageSource} style={styles.congratGif} />;

        const frameLeftBannerSource =
            result && result.is_dog ? require('../assets/img/champagne.png') : require('../assets/img/sad.png');
        const frameLeftBannerStyles = [styles.frameLeftImg];
        if (!result || !result.is_dog) {
            frameLeftBannerStyles.push({
                top: -20,
                left: -20
            });
        }

        return (
            <Modal visible={visible} animationType="slide" transparent={false} onRequestClose={() => onRequestClose()}>
                <View style={styles.container}>
                    {imageHeader}

                    <View style={styles.frame}>
                        {imageComponent}
                        <Image source={frameLeftBannerSource} style={frameLeftBannerStyles} />
                    </View>

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

    frame: {
        marginTop: 30,
        backgroundColor: '#FFF',
        width: 280,
        height: 280,
        justifyContent: 'center',
        alignItems: 'center',
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10
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
    },

    frameLeftImg: {
        width: 80,
        height: 80,
        position: 'absolute',
        top: -40,
        left: 0,
        zIndex: 1
    },
    congratGif: {
        width: 240,
        height: 108,
        marginTop: 60
    }
});
