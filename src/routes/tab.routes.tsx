import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import colors from '../styles/colors';


const AppTab = createBottomTabNavigator();

const AuthRoutes = () => {
	return (
		<AppTab.Navigator
			tabBarOptions={{
				activeTintColor: colors.green,
				inactiveTintColor: colors.heading,
				labelPosition: 'beside-icon',
				style: {
					paddingVertical: 20,
					height: 88,
				},
			}}
            </AppTab.Navigator >   
    )
}