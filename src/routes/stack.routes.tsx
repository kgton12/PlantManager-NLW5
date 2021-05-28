import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { Welcome } from '../pages/Welcome';
import { UserIdentification } from '../pages/UserIdentification';
import { Confirmation } from '../pages/Confirmation';
import { PlantSelect } from '../pages/PlantSelect';
import { PlantSave } from '../pages/PlantSave';
import colors from '../styles/colors';
import { MyPlants } from '../pages/MyPlants';

const stackRouters = createStackNavigator();

const AppRoutes: React.FC = () => (
	<stackRouters.Navigator
		headerMode="none"
		screenOptions={{
			cardStyle: {
				backgroundColor: colors.white
			}
		}}
	>
		<stackRouters.Screen
			name="Welcome"
			component={Welcome}
		/>

		<stackRouters.Screen
			name="UserIdentification"
			component={UserIdentification}
		/>

		<stackRouters.Screen
			name="Confirmation"
			component={Confirmation}
		/>

		<stackRouters.Screen
			name="PlantSelect"
			component={PlantSelect}
		/>

		<stackRouters.Screen
			name="PlantSave"
			component={PlantSave}
		/>

		<stackRouters.Screen
			name="MyPlants"
			component={MyPlants}
		/>

	</stackRouters.Navigator>
)

export default AppRoutes;