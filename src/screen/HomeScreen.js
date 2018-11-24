import React from 'react';
import { StyleSheet, View, Text, SafeAreaView, Alert, Platform } from 'react-native';
import ExampleDogs from '../components/ExampleDogs';
import CameraModal from '../modals/CameraModal';
import PhotosModal from '../modals/PhotosModal';
import Icon from 'react-native-vector-icons/Feather';
import Button from '../components/Button';
import Analyzing from '../components/Analyzing';
import { AdUnits, imgurConfig } from '../Config';
import ResultModal from '../modals/ResultModal';
import { AdMobBanner } from 'react-native-admob';
import RNFS from 'react-native-fs';

const fetchWithTimeout = (uri, options) => {
    let didTimeout = false;

    return new Promise((resolve, reject) => {
        setTimeout(() => {
            didTimeout = true;
            reject(new Error('Request time out'));
        }, 10000); // 10 seconds

        fetch(uri, options)
            .then((response) => response.json())
            .then((response) => {
                resolve(typeof response === 'string' ? JSON.parse(response) : response);
            })
            .catch((error) => {
                if (didTimeout) return;

                reject(error);
            });
    });
};

export default class HomeScreen extends React.PureComponent {
    _chooseFromLibrary = () => {
        this.setState({ photosModalVisible: true });
        this._photosModal.loadData();
    };

    _takeAPhoto = () => this.setState({ cameraModalVisible: true });
    _onItemSelected = (index) => this._doAnalyzing(index);

    _onRequestClose = (imageUri: ?string) => {
        this.setState({
            photosModalVisible: false,
            cameraModalVisible: false,
            isAnalyzing: false,
            result: null
        });

        if (imageUri) {
            this._doAnalyzing(imageUri);
        }
    };

    _autoCleanTempImages = () => {
        this._tempImages.forEach((image) => {
            const encodedHash = encodeURIComponent(image.deletehash);
            fetchWithTimeout(`https://api.imgur.com/3/image/${encodedHash}`, {
                method: 'DELETE'
            })
                .then(() => {})
                .catch(() => {});
        });

        this._tempImages = [];
    };

    _doAnalyzing = (imageUri) => {
        this.setState({ isAnalyzing: true });
        this._lastImageUri = imageUri;

        const onFailed = () => {
            this.setState({ isAnalyzing: false });
            Alert.alert(
                'Something not right!',
                'Whoops! We cannot analyzed your photo. Please try with another photo.'
            );
        };

        const analyzingImageFromUri = (faceUrl, faceName) => {
            const faceUrlEncoded = encodeURIComponent(faceUrl);
            const faceNameEncoded = encodeURIComponent(faceName ? faceName : faceUrl);
            fetchWithTimeout(
                `https://www.what-dog.net/Home/Analyze?isTest=False&version=001&faceUrl=${faceUrlEncoded}&faceName=${faceNameEncoded}`,
                {
                    method: 'POST'
                }
            )
                .then((response) => {
                    setTimeout(this._autoCleanTempImages, 1000);

                    const analyticEvent = JSON.parse(response.AnalyticsEvent);

                    setTimeout(
                        () =>
                            this.setState({
                                isAnalyzing: false,
                                result: analyticEvent
                            }),
                        5000
                    );
                })
                .catch(onFailed);
        };

        const uploadImgurThenGetUri = (data) => {
            const formData = new FormData();
            formData.append('image', data);
            formData.append('type', 'base64');

            fetchWithTimeout('https://api.imgur.com/3/image', {
                method: 'POST',
                headers: {
                    Authorization: `Client-ID ${imgurConfig.clientId}`
                },
                body: formData
            })
                .then((response) => {
                    if (response.status === 200) {
                        analyzingImageFromUri(response.data.link);
                        this._tempImages.push(response.data);
                    } else {
                        onFailed();
                    }
                })
                .catch(onFailed);
        };

        if (typeof imageUri === 'number') {
            analyzingImageFromUri(`Images/faces2/main00${imageUri}.jpg`, `faces2/main00${imageUri}.jpg`);

            return;
        }

        const doReadFile = (path) =>
            RNFS.readFile(path, 'base64')
                .then(uploadImgurThenGetUri)
                .catch(onFailed);

        if (Platform.OS === 'ios') {
            if (imageUri.indexOf('assets-library:') === 0) {
                RNFS.copyAssetsFileIOS(imageUri, `${RNFS.TemporaryDirectoryPath}temp_image.jpg`, 600, 600)
                    .then(doReadFile)
                    .catch(onFailed);
            } else {
                doReadFile(imageUri);
            }
        } else {
            doReadFile(imageUri);
        }
    };

    constructor(props) {
        super(props);

        this.state = {
            cameraModalVisible: false,
            photosModalVisible: false,
            result: null
        };

        this._photosModal = null;
        this._tempImages = [];
        this._lastImageUri = null;
    }

    render() {
        const { cameraModalVisible, photosModalVisible, result, isAnalyzing } = this.state;

        const whiteColorStyle = { color: '#FFF' };
        const marginRightStyle = { marginRight: 10 };

        return (
            <SafeAreaView style={styles.container}>
                <Text style={styles.heading}>What is your dog?</Text>

                <View style={styles.example}>
                    <ExampleDogs onItemSelected={this._onItemSelected} />
                </View>

                <Text style={styles.orText}>OR</Text>

                <View style={styles.buttonGroup}>
                    <Button
                        title={'Choose from library'}
                        onPress={this._chooseFromLibrary}
                        buttonStyle={[styles.buttonWithIcon, marginRightStyle]}
                        textStyle={whiteColorStyle}
                        disabled={isAnalyzing}
                    >
                        <Icon name={'image'} color={'#FFF'} size={27} />
                    </Button>
                    <Button
                        title={'Take a photo'}
                        onPress={this._takeAPhoto}
                        buttonStyle={styles.buttonWithIcon}
                        textStyle={whiteColorStyle}
                        disabled={isAnalyzing}
                    >
                        <Icon name={'camera'} color={'#FFF'} size={27} />
                    </Button>
                </View>

                <AdMobBanner adSize={'largeBanner'} adUnitID={AdUnits.HomeScreen} />

                <CameraModal visible={cameraModalVisible} onRequestClose={(args) => this._onRequestClose(args)} />

                <PhotosModal
                    visible={photosModalVisible}
                    onRequestClose={this._onRequestClose}
                    ref={(c) => (this._photosModal = c)}
                />

                <ResultModal
                    visible={!isAnalyzing && result !== null}
                    result={result}
                    source={this._lastImageUri}
                    onRequestClose={this._onRequestClose}
                />

                <Analyzing visible={isAnalyzing} />
            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#89c496',
        alignItems: 'center',
        flex: 1
    },
    heading: {
        color: '#FFF',
        fontSize: 30,
        marginVertical: 50
    },
    example: {
        height: 240
    },
    orText: {
        fontSize: 30,
        color: '#FFF',
        marginVertical: 30
    },
    buttonGroup: {
        flexDirection: 'row',
        marginBottom: 20
    },
    buttonWithIcon: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 4
    }
});
