import { ActivityIndicator, StatusBar, Text, View } from "react-native";
import colors from '../constants/colors'

export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: colors.zinc
      }}
    >
      <StatusBar backgroundColor={colors.zinc} barStyle="light-content" />
      <ActivityIndicator
        size="large"
        color={colors.orange}
      />
    </View>
  );
}
