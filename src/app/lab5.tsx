import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

const xylophoneKeys = [
  {
    id: 1,
    color: "#EF4444",
    name: "Đồ (C)",
    soundUrl:
      "https://raw.githubusercontent.com/londonappbrewery/xylophone-flutter/master/assets/note1.wav",
  },
  {
    id: 2,
    color: "#F97316",
    name: "Rê (D)",
    soundUrl:
      "https://raw.githubusercontent.com/londonappbrewery/xylophone-flutter/master/assets/note2.wav",
  },
  {
    id: 3,
    color: "#EAB308",
    name: "Mi (E)",
    soundUrl:
      "https://raw.githubusercontent.com/londonappbrewery/xylophone-flutter/master/assets/note3.wav",
  },
  {
    id: 4,
    color: "#22C55E",
    name: "Pha (F)",
    soundUrl:
      "https://raw.githubusercontent.com/londonappbrewery/xylophone-flutter/master/assets/note4.wav",
  },
  {
    id: 5,
    color: "#06B6D4",
    name: "Sol (G)",
    soundUrl:
      "https://raw.githubusercontent.com/londonappbrewery/xylophone-flutter/master/assets/note5.wav",
  },
  {
    id: 6,
    color: "#3B82F6",
    name: "La (A)",
    soundUrl:
      "https://raw.githubusercontent.com/londonappbrewery/xylophone-flutter/master/assets/note6.wav",
  },
  {
    id: 7,
    color: "#A855F7",
    name: "Si (B)",
    soundUrl:
      "https://raw.githubusercontent.com/londonappbrewery/xylophone-flutter/master/assets/note7.wav",
  },
];

export default function Lab5Screen() {
  const playSound = (soundUrl: string) => {
    try {
      if (typeof window !== "undefined" && window.Audio) {
        const audio = new window.Audio(soundUrl);
        audio
          .play()
          .catch((err) =>
            console.log("Lỗi trình duyệt chặn phát âm thanh:", err),
          );
      }
    } catch (error) {
      console.log("Không thể phát âm thanh:", error);
    }
  };

  return (
    <View style={styles.container}>
      {xylophoneKeys.map((key) => (
        <TouchableOpacity
          key={key.id}
          style={[styles.keyButton, { backgroundColor: key.color }]}
          onPress={() => playSound(key.soundUrl)}
          activeOpacity={0.8}
        >
          <Text style={styles.keyText}>{key.name}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0F172A",
    paddingVertical: 10,
  },
  keyButton: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 12,
    marginVertical: 4,
    borderRadius: 8,
  },
  keyText: {
    color: "#FFFFFF",
    fontSize: 20,
    fontWeight: "bold",
  },
});
