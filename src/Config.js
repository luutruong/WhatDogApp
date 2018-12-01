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

const AdUnitExampleId = 'ca-app-pub-3940256099942544/2934735716';

const adUnitOrExampleId = (adUnit) => {
    if (__DEV__) {
        return AdUnitExampleId;
    }

    return adUnit;
};

export const AdUnits = Platform.select({
    ios: {
        HomeScreen: adUnitOrExampleId('ca-app-pub-3634311375738224/7563261727'),
        AnalyzeOverlay: adUnitOrExampleId('ca-app-pub-3634311375738224/6988546654'),
        ResultScreen: adUnitOrExampleId('ca-app-pub-3634311375738224/7918484941')
    },
    android: {
        HomeScreen: adUnitOrExampleId('ca-app-pub-3634311375738224/5228742425'),
        AnalyzeOverlay: adUnitOrExampleId('ca-app-pub-3634311375738224/2027864010'),
        ResultScreen: adUnitOrExampleId('ca-app-pub-3634311375738224/6220306188')
    }
});
