import { useRouter } from "expo-router";
import { ScrollView, StyleSheet, Text, TouchableOpacity } from "react-native";

const labs = [
  { id: "lab1", title: "Lab 1: I Am Rich" },
  { id: "lab2", title: "Lab 2: MiCard" },
  { id: "lab3", title: "Lab 3: Dicee (State)" },
  { id: "lab4", title: "Lab 4: Magic 8 Ball" },
  { id: "lab5", title: "Lab 5: Xylophone" },
  { id: "lab6", title: "Lab 6: Quizzler" },
  { id: "lab7", title: "Lab 7: Destini" },
  { id: "lab8", title: "Lab 8: BMI Calculator" },
  { id: "lab9", title: "Lab 9: Clima" },
];

export default function MenuScreen() {
  const router = useRouter();

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>DANH SÁCH 9 BÀI LAB</Text>

      {labs.map((lab) => (
        <TouchableOpacity
          key={lab.id}
          style={styles.button}
          onPress={() => router.push(`/${lab.id}` as any)}
          activeOpacity={0.7}
        >
          <Text style={styles.buttonText}>{lab.title}</Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 20,
    paddingHorizontal: 20,
    alignItems: "center",
    backgroundColor: "#f5f5f5",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 15,
    color: "#333",
  },
  button: {
    backgroundColor: "#007AFF",
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginVertical: 6,
    width: "100%",
    alignItems: "center",
    elevation: 2,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
});
