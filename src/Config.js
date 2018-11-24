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

const AdUnitExampleId = 'ca-app-pub-3940256099942544/2934735716';

export const AdUnits = Platform.select({
    ios: {
        HomeScreen: __DEV__ ? AdUnitExampleId : 'ca-app-pub-3634311375738224/7563261727',
        AnalyzeOverlay: __DEV__ ? AdUnitExampleId : 'ca-app-pub-3634311375738224/6988546654',
        ResultScreen: __DEV__ ? AdUnitExampleId : 'ca-app-pub-3634311375738224/7918484941'
    },
    android: {
        HomeScreen: __DEV__ ? AdUnitExampleId : 'ca-app-pub-3634311375738224/5228742425',
        AnalyzeOverlay: __DEV__ ? AdUnitExampleId : 'ca-app-pub-3634311375738224/2027864010',
        ResultScreen: __DEV__ ? AdUnitExampleId : 'ca-app-pub-3634311375738224/6220306188'
    }
});
