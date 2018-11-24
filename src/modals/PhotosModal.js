import React from 'react';
import {
    Modal,
    View,
    StyleSheet,
    SafeAreaView,
    Text,
    FlatList,
    Image,
    TouchableOpacity,
    Dimensions,
    Platform
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import Button from '../components/Button';
import {PhotoLoader} from "../utils/PhotoLoader";

const { width } = Dimensions.get('window');

type Props = {
    visible: boolean,
    onRequestClose: Function
};
export default class PhotosModal extends React.PureComponent<Props> {
    _closeModal = () => this.props.onRequestClose();

    _renderItem = ({ item, index }) => {
        let advancedMargin = {};
        const nextIndex = index + 1;
        if (nextIndex > 4) {
            advancedMargin.marginTop = 1;
        }

        if (nextIndex % 4 !== 0) {
            advancedMargin.marginRight = 1;
        }

        return (
            <TouchableOpacity onPress={() => this._selectedImage(item.node.image)}>
                <Image source={{ uri: item.node.image.uri }} style={[styles.image, advancedMargin]} />
            </TouchableOpacity>
        );
    };

    _selectedImage = (image) => this.props.onRequestClose(image.uri);

    _listEmpty = () => {
        const smallStyle = { fontSize: 14, marginTop: 5 };
        return (
            <View style={styles.centerEmptySet}>
                <Text style={styles.textWarning}>There are no photos for display</Text>
                <Text style={[styles.textWarning, smallStyle]}>
                    This app may not have right permission to access your photo library.
                </Text>
            </View>
        );
    };

    _doLoadMore = () => {
        if (!this._endCursor) {
            return;
        }

        this.loadData(true);
    };

    constructor(props) {
        super(props);

        this.state = {
            photos: []
        };

        this._endCursor = null;
        this._hasLoaded = false;
    }

    androidRequestReadStoragePermission() {
        return new Promise((resolve, reject) => {
            if (
                PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE) ===
                PermissionsAndroid.RESULTS.GRANTED
            ) {
                return resolve();
            }

            PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE)
                .then((result) => {
                    if (result === PermissionsAndroid.RESULTS.GRANTED) {
                        resolve();
                    } else {
                        reject();
                    }
                })
                .catch(() => {
                    reject();
                });
        });
    }

    loadData(skipFlag: false) {
        if (this._hasLoaded && !skipFlag) {
            return;
        }
        this._hasLoaded = true;

        const payload = {
            first: 100,
            assetType: 'Photos',
            mimeTypes: ['image/jpeg', 'image/png']
        };
        if (this._endCursor) {
            payload.after = this._endCursor;
        }
        if (Platform.OS === 'ios') {
            payload.groupTypes = 'All';
        }

        const onFailed = () => {
            this.setState({ photos: [] });
        };

        PhotoLoader.getPhotos(payload)
            .then((data) => {
                if (data.page_info.has_next_page) {
                    this._endCursor = data.page_info.end_cursor;
                } else {
                    this._endCursor = null;
                }

                this.setState((prevState) => ({
                    ...prevState,
                    photos: [...prevState.photos, ...data.edges]
                }));
            })
            .catch(onFailed);
    }

    render() {
        const { photos } = this.state;
        const containerStyle = {
            backgroundColor: photos.length === 0 ? '#bfd4f2' : '#fff'
        };

        return (
            <Modal
                visible={this.props.visible}
                animationType="slide"
                transparent={false}
                onRequestClose={() => this.props.onRequestClose()}
            >
                <SafeAreaView style={[styles.container, containerStyle]}>
                    <View style={styles.heading}>
                        <Text style={styles.textHeading}>Pick an photo</Text>
                        <View style={styles.button}>
                            <Button title={''} onPress={this._closeModal}>
                                <Icon name={'chevron-down'} size={35} color={photos.length === 0 ? '#000' : 'red'} />
                            </Button>
                        </View>
                    </View>
                    <View style={styles.photos}>
                        <FlatList
                            renderItem={this._renderItem}
                            data={photos}
                            initialNumToRender={4}
                            numColumns={4}
                            ListEmptyComponent={this._listEmpty}
                            keyExtractor={(item) => item.node.image.uri}
                            scrollEnabled={photos.length > 0}
                            contentContainerStyle={photos.length === 0 && styles.centerEmptySet}
                            onEndReachedThreshold={0.2}
                            onEndReached={this._doLoadMore}
                        />
                    </View>
                </SafeAreaView>
            </Modal>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    photos: {
        flexGrow: 1
    },
    heading: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        height: 54
    },
    textHeading: {
        textAlign: 'center',
        fontSize: 20,
        color: '#000000',
        width: width
    },
    image: {
        width: width / 4,
        height: width / 4
    },
    centerEmptySet: {
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
        paddingHorizontal: 10
    },
    textWarning: {
        color: '#000000',
        fontSize: 18,
        textAlign: 'center'
    },
    button: {
        position: 'absolute',
        top: 10,
        right: 10
    }
});
