import { createAppContainer, createSwitchNavigator } from 'react-navigation';

import Login from './pages/Login';
import Lista from './pages/Lista';
import Detalhes from './pages/Detalhes';

const Routes = createAppContainer(
    createSwitchNavigator({
        Login,
        Lista,
        Detalhes
    })
);

export default Routes;
