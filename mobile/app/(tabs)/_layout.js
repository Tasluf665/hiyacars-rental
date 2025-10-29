import FontAwesome from '@expo/vector-icons/FontAwesome';
import Feather from '@expo/vector-icons/Feather';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Tabs } from 'expo-router';
import Colors from "../../constant/Colors";

export default () => {
    return (
        <Tabs
            screenOptions={{
                tabBarActiveTintColor: Colors.White,
                tabBarInactiveTintColor: '#8E8E93',
                tabBarShowLabel: false,
                tabBarStyle: {
                    position: 'absolute',
                    bottom: 25,
                    left: 20,
                    right: 20,
                    elevation: 0,
                    backgroundColor: '#2C3333',
                    borderRadius: 40,
                    height: 70,
                    paddingBottom: 0,
                    paddingTop: 0,
                    borderTopWidth: 0,
                    shadowColor: '#000',
                    shadowOffset: {
                        width: 0,
                        height: 10,
                    },
                    shadowOpacity: 0.25,
                    shadowRadius: 15,
                    marginHorizontal: 20
                },
                tabBarItemStyle: {
                    paddingVertical: 15,
                },
            }}
        >
            <Tabs.Screen
                name="HomeScreen"
                options={{
                    title: "Home",
                    headerShown: false,
                    tabBarIcon: ({ color }) => <Feather name="home" size={24} color={color} />,
                }}
            />
            <Tabs.Screen
                name="SearchScreen"
                options={{
                    title: "Search",
                    headerShown: false,
                    tabBarIcon: ({ color }) => <FontAwesome size={24} name="search" color={color} />,
                }}
            />
            <Tabs.Screen
                name="MessageScreen"
                options={{
                    title: "Message",
                    headerShown: false,
                    tabBarIcon: ({ color }) => <Feather size={24} name="mail" color={color} />,
                }}
            />
            <Tabs.Screen
                name="NotificationScreen"
                options={{
                    title: "Notification",
                    headerShown: false,
                    tabBarIcon: ({ color }) => <Ionicons name="notifications-outline" size={24} color={color} />,
                }}
            />
            <Tabs.Screen
                name="AccountScreen"
                options={{
                    title: "Account",
                    headerShown: false,
                    tabBarIcon: ({ color }) => <Feather size={24} name="user" color={color} />,
                }}
            />
        </Tabs>
    );
};
