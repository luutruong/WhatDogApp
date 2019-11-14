import React from 'react';
import { Modal, View, StyleSheet, Text, Linking } from 'react-native';
import { RNCamera } from 'react-native-camera';
import Icon from 'react-native-vector-icons/Feather';
import Button from '../components/Button';

type Props = {
    onRequestClose: Function,
    visible: boolean
};
export default class CameraModal extends React.PureComponent<Props> {
    _capture = async () => {
        const options = { quality: 0.8, base64: true };
        const data = await this._camera.takePictureAsync(options);

        this.props.onRequestClose(data.uri);
    };

    _openSettings = () => Linking.openURL('app-settings://');

    _renderNotAuthorized = () => {
        const viewStyle = [styles.camera];
        viewStyle.push({
            backgroundColor: '#00BCD4',
            justifyContent: 'center',
            alignItems: 'center',
            paddingHorizontal: 30
        });

        const largeIcon = {
            marginBottom: 20
        };

        const mutedTextHint = {
            fontSize: 13,
            marginVertical: 6
        };

        const buttonStyle = {
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center'
        };
        const buttonTextStyle = {
            color: '#FFF'
        };

        return (
            <View style={viewStyle}>
                <Icon name={'camera-off'} size={60} color={'#FFF'} style={largeIcon} />
                <Text style={styles.textGuide}>This feature require to access your camera</Text>
                <Text style={[styles.textGuide, mutedTextHint]}>
                    Please open Settings and allow this app access camera
                </Text>
                <Button
                    onPress={this._openSettings}
                    title={'Open settings'}
                    buttonStyle={buttonStyle}
                    textStyle={buttonTextStyle}
                >
                    <Icon name={'settings'} size={25} color={'#FFF'} />
                </Button>
            </View>
        );
    };

    constructor(props) {
        super(props);

        this.state = {
            isCameraFront: false
        };

        this._camera = null;
    }

    render() {
        const flexRow = { flexDirection: 'row' };
        const { isCameraFront } = this.state;

        const cameraType = isCameraFront ? RNCamera.Constants.Type.front : RNCamera.Constants.Type.back;

        return (
            <Modal
                visible={this.props.visible}
                animationType="slide"
                transparent={true}
                onRequestClose={() => this.props.onRequestClose()}
            >
                <View style={styles.container}>
                    <RNCamera
                        ref={(c) => (this._camera = c)}
                        type={cameraType}
                        flashMode={RNCamera.Constants.FlashMode.off}
                        permissionDialogTitle={'Permission to use camera'}
                        permissionDialogMessage={'We need your permission to use your camera phone'}
                        notAuthorizedView={this._renderNotAuthorized()}
                        style={styles.camera}
                    />
                    <View style={styles.buttonGroup}>
                        <View style={styles.buttonLeft}>
                            <Button onPress={() => this.setState({ isCameraFront: !isCameraFront })} title={''}>
                                <Icon name={'refresh-cw'} size={30} color={'red'} />
                            </Button>
                        </View>
                        <Button title={''} onPress={this._capture} buttonStyle={styles.button}>
                            <Icon name={'camera'} size={40} color={'#FFF'} />
                        </Button>
                        <View style={styles.close}>
                            <Button
                                onPress={() => this.props.onRequestClose()}
                                title={'Cancel'}
                                buttonStyle={flexRow}
                            />
                        </View>
                    </View>
                </View>
            </Modal>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#000'
    },
    camera: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center'
    },
    buttonGroup: {
        backgroundColor: '#FFF',
        paddingBottom: 30,
        paddingTop: 15,
        flexDirection: 'row',
        justifyContent: 'center',
        position: 'relative'
    },
    button: {
        width: 60,
        height: 60,
        backgroundColor: '#E91E63',
        borderRadius: 30,
        padding: 5,
        justifyContent: 'center',
        alignItems: 'center'
    },
    close: {
        right: 20,
        top: 22.5,
        position: 'absolute',
        zIndex: 1
    },

    buttonLeft: {
        position: 'absolute',
        top: 28,
        left: 20
    },

    textGuide: {
        fontSize: 18,
        color: '#131313',
        textAlign: 'center'
    }
});
