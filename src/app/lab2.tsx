import { Image, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import InfoCard from "../components/InfoCard";

export default function Lab2Screen() {
  return (
    <SafeAreaView style={styles.container}>
      <Image
        source={{
          uri: "https://cdn-icons-png.flaticon.com/512/3135/3135715.png",
        }}
        style={styles.avatar}
      />
      <Text style={styles.name}>Nguyễn Văn A</Text>
      <Text style={styles.jobTitle}>REACT NATIVE DEVELOPER</Text>
      <View style={styles.divider} />

      <InfoCard iconName="phone" text="+84 123 456 789" />
      <InfoCard iconName="email" text="nguyenvana@email.com" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#00838F",
    alignItems: "center",
    justifyContent: "center",
  },
  avatar: {
    width: 110,
    height: 110,
    borderRadius: 55,
    borderWidth: 3,
    borderColor: "white",
    marginBottom: 10,
  },
  name: { fontSize: 28, color: "white", fontWeight: "bold" },
  jobTitle: {
    fontSize: 14,
    color: "#B2EBF2",
    letterSpacing: 2,
    marginBottom: 10,
  },
  divider: {
    height: 1,
    width: 150,
    backgroundColor: "#B2EBF2",
    marginVertical: 15,
    opacity: 0.5,
  },
});
