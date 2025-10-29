import { Stack } from "expo-router";

export default () => {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="CarDetailsScreen" />
      <Stack.Screen name="BookingDetailsScreen" />
      <Stack.Screen name="PaymentMethodsScreen" />
      <Stack.Screen name="ConfirmationScreen" />
      <Stack.Screen name="PaymentSuccessScreen" />
    </Stack>
  );
};
