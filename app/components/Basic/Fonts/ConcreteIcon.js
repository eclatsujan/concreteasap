import { createIconSetFromIcoMoon } from 'react-native-vector-icons';
import icoMoonConfig from '../../../../assets/fonts/selection';

// We use the IcoMoon app (https://icomoon.io) to generate a custom font made up
// of SVG icons. The actual font file is loaded up-front in src/index.js.
const ConcreteIcon= createIconSetFromIcoMoon(icoMoonConfig, 'ConcreteASAP');

export default ConcreteIcon;