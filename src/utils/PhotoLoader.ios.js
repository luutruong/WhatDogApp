import {CameraRoll} from 'react-native'

const getPhotos = (payload) => CameraRoll.getPhotos(payload);

export const PhotoLoader = {
    getPhotos
};