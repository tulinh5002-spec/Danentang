import { FontAwesome5 } from "@expo/vector-icons";
import { useState } from "react";
import {
    Modal,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

export default function Lab8Screen() {
  const [gender, setGender] = useState<"male" | "female">("male");
  const [height, setHeight] = useState<number>(170);
  const [weight, setWeight] = useState<number>(65);
  const [age, setAge] = useState<number>(22);

  const [bmiResult, setBmiResult] = useState<{
    score: string;
    category: string;
    interpretation: string;
    color: string;
  } | null>(null);

  const calculateBMI = () => {
    const heightInMeters = height / 100;
    const bmi = weight / (heightInMeters * heightInMeters);
    const bmiScore = bmi.toFixed(1);

    let category = "";
    let interpretation = "";
    let color = "#22C55E";

    if (bmi < 18.5) {
      category = "THIẾU CÂN";
      interpretation =
        "Chỉ số BMI của bạn thấp hơn bình thường. Hãy bổ sung thêm dinh dưỡng nhé!";
      color = "#3B82F6";
    } else if (bmi >= 18.5 && bmi < 25) {
      category = "BÌNH THƯỜNG";
      interpretation =
        "Chỉ số BMI của bạn rất lý tưởng. Hãy tiếp tục duy trì chế độ sinh hoạt này!";
      color = "#22C55E";
    } else if (bmi >= 25 && bmi < 30) {
      category = "THỪA CÂN";
      interpretation =
        "Chỉ số BMI của bạn cao hơn bình thường. Bạn nên tăng cường vận động thể thao.";
      color = "#F59E0B";
    } else {
      category = "BÉO PHÌ";
      interpretation =
        "Chỉ số BMI ở mức cảnh báo. Hãy tham khảo ý kiến bác sĩ để điều chỉnh chế độ ăn uống.";
      color = "#EF4444";
    }

    setBmiResult({ score: bmiScore, category, interpretation, color });
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        {/* Chọn Giới Tính */}
        <View style={styles.row}>
          <TouchableOpacity
            style={[
              styles.card,
              gender === "male" ? styles.activeCard : styles.inactiveCard,
            ]}
            onPress={() => setGender("male")}
            activeOpacity={0.8}
          >
            <FontAwesome5
              name="mars"
              size={48}
              color={gender === "male" ? "#FFFFFF" : "#8D8E98"}
            />
            <Text
              style={[styles.label, gender === "male" && styles.activeLabel]}
            >
              NAM
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.card,
              gender === "female" ? styles.activeCard : styles.inactiveCard,
            ]}
            onPress={() => setGender("female")}
            activeOpacity={0.8}
          >
            <FontAwesome5
              name="venus"
              size={48}
              color={gender === "female" ? "#FFFFFF" : "#8D8E98"}
            />
            <Text
              style={[styles.label, gender === "female" && styles.activeLabel]}
            >
              NỮ
            </Text>
          </TouchableOpacity>
        </View>

        {/* Thẻ Chiều Cao */}
        <View style={styles.largeCard}>
          <Text style={styles.label}>CHIỀU CAO</Text>
          <View style={styles.valueRow}>
            <Text style={styles.numberText}>{height}</Text>
            <Text style={styles.unitText}> cm</Text>
          </View>

          <View style={styles.stepperRow}>
            <TouchableOpacity
              style={styles.circleBtn}
              onPress={() => setHeight((prev) => Math.max(100, prev - 1))}
            >
              <FontAwesome5 name="minus" size={16} color="white" />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.circleBtn}
              onPress={() => setHeight((prev) => Math.min(220, prev + 1))}
            >
              <FontAwesome5 name="plus" size={16} color="white" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Hàng Cân Nặng & Tuổi */}
        <View style={styles.row}>
          <View style={styles.card}>
            <Text style={styles.label}>CÂN NẶNG (kg)</Text>
            <Text style={styles.numberText}>{weight}</Text>
            <View style={styles.stepperRow}>
              <TouchableOpacity
                style={styles.circleBtn}
                onPress={() => setWeight((prev) => Math.max(30, prev - 1))}
              >
                <FontAwesome5 name="minus" size={16} color="white" />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.circleBtn}
                onPress={() => setWeight((prev) => Math.min(200, prev + 1))}
              >
                <FontAwesome5 name="plus" size={16} color="white" />
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.card}>
            <Text style={styles.label}>TUỔI</Text>
            <Text style={styles.numberText}>{age}</Text>
            <View style={styles.stepperRow}>
              <TouchableOpacity
                style={styles.circleBtn}
                onPress={() => setAge((prev) => Math.max(1, prev - 1))}
              >
                <FontAwesome5 name="minus" size={16} color="white" />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.circleBtn}
                onPress={() => setAge((prev) => Math.min(120, prev + 1))}
              >
                <FontAwesome5 name="plus" size={16} color="white" />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Nút Tính BMI */}
      <TouchableOpacity
        style={styles.calcButton}
        onPress={calculateBMI}
        activeOpacity={0.9}
      >
        <Text style={styles.calcButtonText}>TÍNH BMI</Text>
      </TouchableOpacity>

      {/* Màn hình hiển thị kết quả */}
      <Modal visible={bmiResult !== null} animationType="slide">
        {bmiResult && (
          <SafeAreaView style={styles.modalContainer}>
            <Text style={styles.modalTitle}>KẾT QUẢ CỦA BẠN</Text>

            <View style={styles.resultCard}>
              <Text style={[styles.categoryText, { color: bmiResult.color }]}>
                {bmiResult.category}
              </Text>
              <Text style={styles.scoreText}>{bmiResult.score}</Text>
              <Text style={styles.interpretationText}>
                {bmiResult.interpretation}
              </Text>
            </View>

            <TouchableOpacity
              style={styles.calcButton}
              onPress={() => setBmiResult(null)}
            >
              <Text style={styles.calcButtonText}>TÍNH LẠI</Text>
            </TouchableOpacity>
          </SafeAreaView>
        )}
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#0A0E21" },
  content: { padding: 15, gap: 15 },
  row: { flexDirection: "row", gap: 15 },
  card: {
    flex: 1,
    backgroundColor: "#1D1E33",
    borderRadius: 12,
    padding: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  activeCard: {
    backgroundColor: "#1D1E33",
    borderWidth: 2,
    borderColor: "#EB1555",
  },
  inactiveCard: { backgroundColor: "#111328" },
  largeCard: {
    backgroundColor: "#1D1E33",
    borderRadius: 12,
    padding: 20,
    alignItems: "center",
  },
  label: { color: "#8D8E98", fontSize: 14, fontWeight: "bold", marginTop: 8 },
  activeLabel: { color: "#FFFFFF" },
  valueRow: { flexDirection: "row", alignItems: "baseline", marginVertical: 8 },
  numberText: { color: "#FFFFFF", fontSize: 38, fontWeight: "bold" },
  unitText: { color: "#8D8E98", fontSize: 16 },
  stepperRow: { flexDirection: "row", gap: 15, marginTop: 8 },
  circleBtn: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "#4C4F5E",
    alignItems: "center",
    justifyContent: "center",
  },
  calcButton: {
    backgroundColor: "#EB1555",
    height: 56,
    justifyContent: "center",
    alignItems: "center",
  },
  calcButtonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
    letterSpacing: 1,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: "#0A0E21",
    justifyContent: "space-between",
    padding: 20,
  },
  modalTitle: {
    color: "white",
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 20,
  },
  resultCard: {
    backgroundColor: "#1D1E33",
    borderRadius: 16,
    padding: 25,
    alignItems: "center",
    justifyContent: "space-evenly",
    height: "65%",
  },
  categoryText: { fontSize: 20, fontWeight: "bold", letterSpacing: 1 },
  scoreText: { color: "white", fontSize: 64, fontWeight: "bold" },
  interpretationText: {
    color: "#8D8E98",
    fontSize: 16,
    textAlign: "center",
    lineHeight: 24,
  },
});
