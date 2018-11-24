import {CameraRoll, PermissionsAndroid} from 'react-native'

const getPhotos = (payload) => {
    const requestReadStoragePermission = () => {
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
    };

    return new Promise((resolve, reject) => {
        requestReadStoragePermission()
            .then(() => {
                CameraRoll.getPhotos(payload)
                    .then(resolve)
                    .catch(reject);
            })
            .catch(reject);
    });
};

export const PhotoLoader = {
    getPhotos
};