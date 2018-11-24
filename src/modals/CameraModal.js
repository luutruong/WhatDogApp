import React from 'react';
import { Modal, View, StyleSheet } from 'react-native';
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

    constructor(props) {
        super(props);

        this._camera = null;
    }

    render() {
        const flexRow = { flexDirection: 'row' };

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
                        type={RNCamera.Constants.Type.back}
                        flashMode={RNCamera.Constants.FlashMode.off}
                        permissionDialogTitle={'Permission to use camera'}
                        permissionDialogMessage={'We need your permission to use your camera phone'}
                        style={styles.camera}
                    />
                    <View style={styles.buttonGroup}>
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
    }
});
