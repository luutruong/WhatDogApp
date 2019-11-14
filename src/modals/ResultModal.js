import React from 'react';
import { Modal, View, StyleSheet, Text, Image, CameraRoll, Alert } from 'react-native';
import { imageSources } from '../Config';
import Button from '../components/Button';
import {captureRef} from "react-native-view-shot";
import Icon from 'react-native-vector-icons/Feather';

type Props = {
    visible: boolean,
    onRequestClose: Function,
    result: any,
    source: any
};

export default class ResultModal extends React.Component<Props> {
    _captureScreen = () => {
        const captureError = () => {
            Alert.alert(
                'Failed to capture',
                'Failed to capture result. Please try again'
            );
        };

        captureRef(this._captureViewRef, {
            format: 'jpg',
            quality: 0.9
        })
            .then(uri => {
                CameraRoll.saveToCameraRoll(uri, 'photo')
                    .then(() => {
                        Alert.alert(
                            'Photo has saved to your library'
                        );
                    })
                    .catch(captureError);
            })
            .catch(captureError);
    };

    constructor(props) {
        super(props);

        this._captureViewRef = null;
    }

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

        let breedName;
        if (result) {
            breedName = (
                <View style={styles.textWrap}>
                    <Text style={styles.text}>This is: {result.breed_name}</Text>
                </View>
            );
        }

        return (
            <Modal
                visible={visible}
                animationType="slide"
                transparent={false}
                onRequestClose={() => onRequestClose()}
            >
                <View style={styles.container}>
                    {imageHeader}

                    <View style={styles.frame} ref={(c) => this._captureViewRef = c}>
                        {imageComponent}
                        <Image source={frameLeftBannerSource} style={frameLeftBannerStyles} />
                    </View>

                    {breedName}

                    <View style={styles.buttonGroup}>
                        <Button
                            onPress={() => onRequestClose()}
                            title={'dismiss'}
                            buttonStyle={styles.buttonWithIcon}
                            textStyle={whiteColorStyle}
                        >
                            <Icon name={'x'} color={'#FFF'} size={27} />
                        </Button>
                        <Button
                            onPress={this._captureScreen}
                            title={'capture'}
                            buttonStyle={styles.buttonWithIcon}
                            textStyle={whiteColorStyle}
                        >
                            <Icon name={'camera'} color={'#FFF'} size={27} />
                        </Button>
                    </View>
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
    },
    buttonGroup: {
        flexDirection: 'row',
        marginBottom: 20,
        justifyContent: 'space-between',
        alignItems: 'center',
        width: 280
    },
    buttonWithIcon: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 4
    }
});
