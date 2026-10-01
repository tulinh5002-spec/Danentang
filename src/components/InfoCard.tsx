import { StyleSheet, Text, View } from "react-native";

type InfoCardProps = {
  iconName: "phone" | "email";
  text: string;
};

export default function InfoCard({ iconName, text }: InfoCardProps) {
  const label = iconName === "phone" ? "TEL" : "MAIL";

  return (
    <View style={styles.container}>
      <View style={styles.icon}>
        <Text style={styles.iconText}>{label}</Text>
      </View>
      <Text style={styles.text}>{text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 270,
    minHeight: 56,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: 10,
    paddingHorizontal: 16,
    marginVertical: 6,
  },
  icon: {
    width: 36,
    height: 36,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 18,
    backgroundColor: "#E0F2F1",
    marginRight: 14,
  },
  iconText: {
    color: "#007C83",
    fontSize: 10,
    fontWeight: "700",
  },
  text: {
    color: "#263238",
    fontSize: 15,
  },
});