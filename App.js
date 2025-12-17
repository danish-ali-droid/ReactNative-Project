import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ActivityIndicator, View, Text } from 'react-native';

// Import screens from your exact paths
import LoginScreen from '../My-Team-App/src/Screens/login.js';
import SignupScreen from '../My-Team-App/src/Screens/signup.js';
import HomeScreen from '../My-Team-App/src/Screens/home.js';

// Import your Navigator
import AppNavigator from '../My-Team-App/src/Navigation/navigator.js'; // Note: capital 'N' in Navigation

// Create navigators
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

// Loading Component
const LoadingScreen = () => (
  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    <ActivityIndicator size="large" color="#3498db" />
    <Text style={{ marginTop: 10 }}>Loading...</Text>
  </View>
);

// Main Tabs Component (After login)
const MainTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: '#3498db',
        tabBarInactiveTintColor: 'gray',
        headerShown: false,
      }}
    >
      <Tab.Screen 
        name="HomeTab" 
        component={HomeScreen}
        options={{
          title: 'Home',
          tabBarLabel: 'Home',
        }}
      />
      <Tab.Screen 
        name="ProfileTab" 
        component={() => <View><Text>Profile Screen</Text></View>}
        options={{
          title: 'Profile',
          tabBarLabel: 'Profile',
        }}
      />
    </Tab.Navigator>
  );
};

// Main App Component
export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [userToken, setUserToken] = useState(null);

  useEffect(() => {
    // Check authentication status
    const checkAuthStatus = async () => {
      try {
        // Wait a bit for better UX
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Check if user is logged in
        const token = await AsyncStorage.getItem('userToken');
        const userData = await AsyncStorage.getItem('userData');
        
        console.log('Token found:', !!token);
        console.log('User data:', userData);
        
        setUserToken(token);
      } catch (error) {
        console.error('Error checking auth:', error);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuthStatus();
  }, []);

  // Show loading screen
  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator 
        screenOptions={{
          headerStyle: {
            backgroundColor: '#3498db',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      >
        {userToken ? (
          // User is logged in - Show main tabs
          <Stack.Screen 
            name="Main" 
            component={MainTabs}
            options={{
              headerShown: false,
            }}
          />
        ) : (
          // User is not logged in - Show auth screens
          <>
            <Stack.Screen 
              name="Login" 
              component={LoginScreen}
              options={{
                title: 'Sign In',
                headerShown: false,
              }}
            />
            <Stack.Screen 
              name="Signup" 
              component={SignupScreen}
              options={{
                title: 'Create Account',
                headerBackTitle: 'Back',
              }}
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}