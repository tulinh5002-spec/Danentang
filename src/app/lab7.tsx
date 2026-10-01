import { useState } from "react";
import {
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

type StoryNode = {
  title: string;
  choice1?: string;
  choice2?: string;
  next1?: number;
  next2?: number;
  isEnding?: boolean;
};

// Kịch bản dựa trên sự kiện có thật: Chuyến bay US Airways 1549
const storyData: Record<number, StoryNode> = {
  1: {
    title:
      "✈️ 15/01/2009: Bạn là Cơ trưởng Sully. Ngay sau khi cất cánh từ New York, một đàn ngỗng trời đâm trúng 2 động cơ khiến máy bay mất toàn bộ lực đẩy ở độ cao chỉ 850m. Bạn phải quyết định ngay!",
    choice1:
      "Cố gắng lượn vòng quay lại sân bay LaGuardia theo hướng dẫn của trạm kiểm soát.",
    choice2:
      "Đánh giá nhanh tốc độ/độ cao, từ chối lệnh kiểm soát và chuẩn bị đáp xuống sông Hudson.",
    next1: 2,
    next2: 3,
  },
  2: {
    title:
      "⚠️ Máy bay tụt độ cao quá nhanh. Kiểm soát không lưu giục bạn đổi hướng sang sân bay Teterboro gần đó. Tuy nhiên máy bay đã mất đà hoàn toàn.",
    choice1:
      "Liều mạng kéo cần điều khiển để cố lướt tới đường băng Teterboro.",
    choice2:
      "Hủy bỏ ý định tới sân bay, bẻ lái gấp hướng ra mặt sông Hudson trước mặt.",
    next1: 4,
    next2: 3,
  },
  3: {
    title:
      "🌊 Máy bay lao sát mặt sông Hudson băng giá. Chỉ còn vài giây trước khi chạm nước, bạn phải chọn kỹ thuật tiếp nước chính xác.",
    choice1:
      "Giữ 2 cánh cân bằng, ngóc nhẹ mũi máy bay để phần bụng sau chạm nước trước.",
    choice2:
      "Nghiêng một bên cánh xuống trước để chẻ dòng nước xiết nhằm giảm ma sát.",
    next1: 5,
    next2: 6,
  },
  4: {
    title:
      "💥 KẾT THÚC THẢM HỌA: Máy bay hẫng đà, mất vận tốc tối thiểu và rơi xuống khu dân cư.\n\n(Dữ liệu hộp đen thực tế sau này chứng minh: Nếu Sully chọn quay lại sân bay ngày hôm đó, máy bay chắc chắn sẽ đâm vào tòa nhà).",
    isEnding: true,
  },
  5: {
    title:
      "🎉 PHÉP MÀU TRÊN SÔNG HUDSON: Máy bay lướt êm trên mặt nước! Tất cả 155 hành khách và phi hành đoàn đều sống sót an toàn.\n\nĐây là kỳ tích có thật trong lịch sử hàng không thế giới nhờ quyết định xuất sắc của Sully!",
    isEnding: true,
  },
  6: {
    title:
      "💥 KẾT THÚC BI KỊCH: Đầu cánh va mạnh xuống nước với tốc độ cao khiến thân máy bay bị xoáy tròn và gãy vỡ.",
    isEnding: true,
  },
};

export default function Lab7Screen() {
  const [storyIndex, setStoryIndex] = useState<number>(1);
  const currentStory = storyData[storyIndex];

  const handleChoice = (choiceNumber: 1 | 2) => {
    const nextNode =
      choiceNumber === 1 ? currentStory.next1 : currentStory.next2;
    if (nextNode) {
      setStoryIndex(nextNode);
    }
  };

  const resetStory = () => {
    setStoryIndex(1);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        {/* Nhãn sự kiện */}
        <View style={styles.badge}>
          <Text style={styles.badgeText}>
            DỰA TRÊN SỰ KIỆN CÓ THẬT (15/01/2009)
          </Text>
        </View>

        {/* Khung nội dung câu chuyện */}
        <View style={styles.storyCard}>
          <Text style={styles.storyText}>{currentStory.title}</Text>
        </View>

        {/* Các nút lựa chọn */}
        <View style={styles.choiceContainer}>
          {!currentStory.isEnding ? (
            <>
              <TouchableOpacity
                style={[styles.button, styles.choice1Button]}
                onPress={() => handleChoice(1)}
                activeOpacity={0.8}
              >
                <Text style={styles.buttonText}>{currentStory.choice1}</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.button, styles.choice2Button]}
                onPress={() => handleChoice(2)}
                activeOpacity={0.8}
              >
                <Text style={styles.buttonText}>{currentStory.choice2}</Text>
              </TouchableOpacity>
            </>
          ) : (
            <TouchableOpacity
              style={[styles.button, styles.resetButton]}
              onPress={resetStory}
              activeOpacity={0.8}
            >
              <Text style={styles.buttonText}>🔄 CHƠI LẠI CÂU CHUYỆN</Text>
            </TouchableOpacity>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0F172A",
  },
  content: {
    flexGrow: 1,
    padding: 20,
    justifyContent: "space-between",
  },
  badge: {
    backgroundColor: "#1E293B",
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 20,
    alignSelf: "center",
    borderWidth: 1,
    borderColor: "#38BDF8",
    marginBottom: 10,
  },
  badgeText: {
    color: "#38BDF8",
    fontSize: 12,
    fontWeight: "bold",
    letterSpacing: 1,
  },
  storyCard: {
    backgroundColor: "#1E293B",
    padding: 22,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#334155",
    marginVertical: 15,
    elevation: 4,
  },
  storyText: {
    color: "#F8FAFC",
    fontSize: 18,
    lineHeight: 28,
    fontWeight: "500",
  },
  choiceContainer: {
    gap: 12,
    marginTop: 10,
    marginBottom: 10,
  },
  button: {
    paddingVertical: 16,
    paddingHorizontal: 18,
    borderRadius: 12,
    elevation: 3,
  },
  choice1Button: {
    backgroundColor: "#E11D48",
  },
  choice2Button: {
    backgroundColor: "#2563EB",
  },
  resetButton: {
    backgroundColor: "#16A34A",
    alignItems: "center",
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "bold",
    lineHeight: 22,
  },
});
