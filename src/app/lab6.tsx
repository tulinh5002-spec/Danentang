import { MaterialIcons } from "@expo/vector-icons";
import { useState } from "react";
import {
    Alert,
    SafeAreaView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

type Question = {
  questionText: string;
  answer: boolean;
};

// Danh sách ngân hàng câu hỏi Quiz
const questions: Question[] = [
  { questionText: "Nước Việt Nam nằm ở khu vực Đông Nam Á.", answer: true },
  { questionText: "Hành tinh gần Mặt Trời nhất là Trái Đất.", answer: false },
  {
    questionText: "1 Megabyte (MB) tương đương 1024 Kilobytes (KB).",
    answer: true,
  },
  {
    questionText: "Thành phố Hồ Chí Minh là thủ đô của Việt Nam.",
    answer: false,
  },
  { questionText: "Tháp Eiffel nằm ở thành phố Luân Đôn.", answer: false },
  { questionText: "Trái Đất quay xung quanh Mặt Trời.", answer: true },
];

export default function Lab6Screen() {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [scoreKeeper, setScoreKeeper] = useState<boolean[]>([]);
  const [score, setScore] = useState<number>(0);

  const handleAnswer = (userAnswer: boolean) => {
    const correctAnswer = questions[currentIndex].answer;
    const isCorrect = userAnswer === correctAnswer;

    const newScoreKeeper = [...scoreKeeper, isCorrect];
    setScoreKeeper(newScoreKeeper);

    const newScore = isCorrect ? score + 1 : score;
    if (isCorrect) setScore(newScore);

    // Chuyển sang câu hỏi tiếp theo hoặc kết thúc bài test
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      Alert.alert(
        "Hoàn thành Quiz! 🎉",
        `Bạn đã trả lời đúng ${newScore}/${questions.length} câu hỏi.`,
        [{ text: "Làm lại bài test", onPress: resetQuiz }],
      );
    }
  };

  const resetQuiz = () => {
    setCurrentIndex(0);
    setScoreKeeper([]);
    setScore(0);
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Hiển thị tiến trình làm bài */}
      <Text style={styles.progressText}>
        Câu hỏi {currentIndex + 1} / {questions.length}
      </Text>

      {/* Vùng nội dung câu hỏi */}
      <View style={styles.questionContainer}>
        <Text style={styles.questionText}>
          {questions[currentIndex].questionText}
        </Text>
      </View>

      {/* Nút bấm ĐÚNG / SAI */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.button, styles.trueButton]}
          onPress={() => handleAnswer(true)}
          activeOpacity={0.8}
        >
          <Text style={styles.buttonText}>ĐÚNG</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, styles.falseButton]}
          onPress={() => handleAnswer(false)}
          activeOpacity={0.8}
        >
          <Text style={styles.buttonText}>SAI</Text>
        </TouchableOpacity>
      </View>

      {/* Thanh theo dõi biểu tượng lịch sử kết quả ở dưới cùng */}
      <View style={styles.scoreKeeperRow}>
        {scoreKeeper.map((isCorrect, index) => (
          <MaterialIcons
            key={index}
            name={isCorrect ? "check" : "close"}
            size={28}
            color={isCorrect ? "#22C55E" : "#EF4444"}
          />
        ))}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0F172A",
    padding: 20,
    justifyContent: "space-between",
  },
  progressText: {
    color: "#94A3B8",
    fontSize: 16,
    fontWeight: "600",
    textAlign: "center",
    marginTop: 10,
  },
  questionContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 15,
  },
  questionText: {
    color: "#FFFFFF",
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
    lineHeight: 34,
  },
  buttonContainer: {
    gap: 12,
    marginBottom: 20,
  },
  button: {
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: "center",
    elevation: 3,
  },
  trueButton: {
    backgroundColor: "#22C55E",
  },
  falseButton: {
    backgroundColor: "#EF4444",
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "bold",
    letterSpacing: 1,
  },
  scoreKeeperRow: {
    flexDirection: "row",
    height: 32,
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
  },
});
