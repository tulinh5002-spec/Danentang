import { FontAwesome5 } from "@expo/vector-icons";
import { useState } from "react";
import {
    SafeAreaView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

// Danh sách tên Icon xúc xắc tương ứng với giá trị từ 1 đến 6
const diceIcons = [
  "dice-one",
  "dice-two",
  "dice-three",
  "dice-four",
  "dice-five",
  "dice-six",
] as const;

export default function Lab3Screen() {
  // Quản lý State cho 2 viên xúc xắc (giá trị khởi tạo 1 và 2)
  const [leftDice, setLeftDice] = useState<number>(1);
  const [rightDice, setRightDice] = useState<number>(2);

  // Hàm sinh số ngẫu nhiên từ 1 đến 6 cho cả 2 viên xúc xắc
  const rollDice = () => {
    const newLeft = Math.floor(Math.random() * 6) + 1;
    const newRight = Math.floor(Math.random() * 6) + 1;
    setLeftDice(newLeft);
    setRightDice(newRight);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.subtitle}>Chạm vào xúc xắc hoặc nhấn nút để lắc</Text>

      {/* Row Layout: 2 viên xúc xắc nằm ngang */}
      <View style={styles.diceRow}>
        <TouchableOpacity
          onPress={rollDice}
          activeOpacity={0.7}
          style={styles.diceBox}
        >
          <FontAwesome5
            name={diceIcons[leftDice - 1]}
            size={110}
            color="white"
          />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={rollDice}
          activeOpacity={0.7}
          style={styles.diceBox}
        >
          <FontAwesome5
            name={diceIcons[rightDice - 1]}
            size={110}
            color="white"
          />
        </TouchableOpacity>
      </View>

      {/* Tổng điểm và Nút Lắc */}
      <View style={styles.bottomArea}>
        <Text style={styles.totalText}>Tổng điểm: {leftDice + rightDice}</Text>

        <TouchableOpacity
          style={styles.button}
          onPress={rollDice}
          activeOpacity={0.8}
        >
          <Text style={styles.buttonText}>LẮC XÚC XẮC</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#B71C1C", // Màu đỏ thẫm chuẩn bài Dicee
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 40,
  },
  subtitle: {
    color: "#FFCDD2",
    fontSize: 16,
    fontWeight: "500",
    marginTop: 20,
  },
  diceRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },
  diceBox: {
    padding: 15,
    marginHorizontal: 10,
  },
  bottomArea: {
    alignItems: "center",
    width: "100%",
    marginBottom: 20,
  },
  totalText: {
    color: "white",
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  button: {
    backgroundColor: "white",
    paddingVertical: 14,
    paddingHorizontal: 40,
    borderRadius: 30,
    boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.3)",
  },
  buttonText: {
    color: "#B71C1C",
    fontSize: 18,
    fontWeight: "bold",
    letterSpacing: 1,
  },
});
