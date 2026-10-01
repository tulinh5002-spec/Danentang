import { useState } from "react";
import {
  Keyboard,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

const answers = [
  "Chắc chắn rồi!",
  "Hoàn toàn đồng ý",
  "Triển vọng rất tốt",
  "Hãy tin vào điều đó",
  "Hỏi lại sau nhé",
  "Bây giờ chưa thể nói",
  "Đừng cược vào nó",
  "Câu trả lời là Không",
  "Rất nghi ngờ",
];

export default function Lab4Screen() {
  const [question, setQuestion] = useState<string>("");
  const [answer, setAnswer] = useState<string>("8");
  const [hasAnswered, setHasAnswered] = useState<boolean>(false);

  const askMagicBall = () => {
    Keyboard.dismiss(); // Ẩn bàn phím sau khi hỏi
    if (!question.trim()) {
      alert("Hãy nhập câu hỏi trước khi lắc quả cầu kỳ diệu!");
      return;
    }
    const randomIndex = Math.floor(Math.random() * answers.length);
    setAnswer(answers[randomIndex]);
    setHasAnswered(true);
  };

  const resetBall = () => {
    setQuestion("");
    setAnswer("8");
    setHasAnswered(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>MAGIC 8 BALL</Text>
        <Text style={styles.subtitle}>
          Nhập câu hỏi Có/Không và hỏi quả cầu
        </Text>
      </View>

      {/* Ô nhập câu hỏi của người dùng */}
      <TextInput
        style={styles.input}
        placeholder="Ví dụ: Hôm nay tôi có may mắn không?"
        placeholderTextColor="#94A3B8"
        value={question}
        onChangeText={setQuestion}
      />

      {/* Quả cầu 8 Ball hiển thị số 8 hoặc câu trả lời */}
      <TouchableOpacity
        style={styles.ballOuter}
        onPress={askMagicBall}
        activeOpacity={0.85}
      >
        <View style={styles.ballInner}>
          <Text
            style={hasAnswered ? styles.answerText : styles.numberEightText}
          >
            {answer}
          </Text>
        </View>
      </TouchableOpacity>

      {/* Nút thao tác */}
      <View style={styles.buttonRow}>
        <TouchableOpacity
          style={styles.button}
          onPress={askMagicBall}
          activeOpacity={0.8}
        >
          <Text style={styles.buttonText}>DỰ ĐOÁN</Text>
        </TouchableOpacity>

        {hasAnswered && (
          <TouchableOpacity
            style={[styles.button, styles.resetButton]}
            onPress={resetBall}
          >
            <Text style={styles.buttonText}>HỎI CÂU KHÁC</Text>
          </TouchableOpacity>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0F172A",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 30,
    paddingHorizontal: 20,
  },
  header: {
    alignItems: "center",
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#38BDF8",
    letterSpacing: 2,
  },
  subtitle: {
    fontSize: 14,
    color: "#94A3B8",
    marginTop: 6,
    textAlign: "center",
  },
  input: {
    width: "100%",
    backgroundColor: "#1E293B",
    color: "white",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#334155",
    fontSize: 15,
  },
  ballOuter: {
    width: 240,
    height: 240,
    borderRadius: 120,
    backgroundColor: "#020617",
    justifyContent: "center",
    alignItems: "center",
    boxShadow: "0px 4px 8px rgba(56, 189, 248, 0.3)",
    borderWidth: 3,
    borderColor: "#1E293B",
  },
  ballInner: {
    width: 130,
    height: 130,
    borderRadius: 65,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
  },
  numberEightText: {
    fontSize: 64,
    fontWeight: "bold",
    color: "#020617",
  },
  answerText: {
    color: "#0F172A",
    fontSize: 14,
    fontWeight: "bold",
    textAlign: "center",
  },
  buttonRow: {
    width: "100%",
    alignItems: "center",
    gap: 10,
  },
  button: {
    backgroundColor: "#0284C7",
    paddingVertical: 14,
    width: "100%",
    borderRadius: 12,
    alignItems: "center",
  },
  resetButton: {
    backgroundColor: "#475569",
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "bold",
  },
});
