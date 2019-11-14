import { Platform } from 'react-native';

export const imageSources = [
    require('./assets/dogs/scroll000.jpg'),
    require('./assets/dogs/scroll001.jpg'),
    require('./assets/dogs/scroll002.jpg'),
    require('./assets/dogs/scroll003.jpg'),
    require('./assets/dogs/scroll004.jpg'),
    require('./assets/dogs/scroll005.jpg'),
    require('./assets/dogs/scroll006.jpg'),
    require('./assets/dogs/scroll007.jpg'),
    require('./assets/dogs/scroll008.jpg'),
    require('./assets/dogs/scroll009.jpg'),
    require('./assets/dogs/scroll0010.jpg')
];

export const imgurConfig = {
    clientId: 'f33ab45e5b7726e'
};

export const appStore = Platform.select({
    ios: {
        url: 'https://itunes.apple.com/app/id1084109351'
    },
    android: {
        url: 'https://play.google.com/store/apps/details?id=com.truongluu.whatdog'
    }
});

export const AdUnits = Platform.select({
    ios: {
    },
    android: {
    }
});
