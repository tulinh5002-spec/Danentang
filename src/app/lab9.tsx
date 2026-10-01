import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import * as Location from "expo-location";
import { useEffect, useEffectEvent, useState } from "react";
import {
    ActivityIndicator,
    Keyboard,
    Platform,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";

type WeatherData = {
  city: string;
  temp: number;
  feelsLike: number;
  description: string;
  humidity: number;
  windSpeed: number;
  iconName: keyof typeof MaterialCommunityIcons.glyphMap;
};

export default function Lab9Screen() {
  const [cityInput, setCityInput] = useState<string>("");
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  // Ánh xạ Mã thời tiết (WMO Code) sang biểu tượng & mô tả tiếng Việt
  const getWeatherDetails = (code: number) => {
    if (code === 0)
      return { icon: "weather-sunny" as const, desc: "Trời quang đãng" };
    if ([1, 2, 3].includes(code))
      return { icon: "weather-partly-cloudy" as const, desc: "Có mây rải rác" };
    if ([45, 48].includes(code))
      return { icon: "weather-fog" as const, desc: "Sương mù" };
    if ([51, 53, 55, 61, 63, 65, 80, 81, 82].includes(code))
      return { icon: "weather-rainy" as const, desc: "Có mưa" };
    if ([95, 96, 99].includes(code))
      return { icon: "weather-lightning-rainy" as const, desc: "Mưa giông" };
    return { icon: "weather-cloudy" as const, desc: "Nhiều mây" };
  };

  // Tra cứu thời tiết qua tọa độ GPS (Không dùng API Key)
  const fetchWeatherByCoords = async (
    lat: number,
    lon: number,
    cityName: string,
  ) => {
    setLoading(true);
    try {
      const res = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,apparent_temperature,weather_code,wind_speed_10m`,
      );
      const data = await res.json();
      const current = data.current;
      const details = getWeatherDetails(current.weather_code);

      setWeather({
        city: cityName,
        temp: Math.round(current.temperature_2m),
        feelsLike: Math.round(current.apparent_temperature),
        description: details.desc,
        humidity: current.relative_humidity_2m,
        windSpeed: Math.round(current.wind_speed_10m),
        iconName: details.icon,
      });
    } catch (error) {
      console.log("Lỗi tải thời tiết:", error);
    } finally {
      setLoading(false);
    }
  };

  // Tìm tọa độ thành phố theo tên (Chuyển đổi Tên thành phố -> Tọa độ)
  const fetchWeatherByCity = async (cityName: string) => {
    const targetCity = cityName.trim() || "Da Nang";
    if (Platform.OS !== "web") Keyboard.dismiss();
    setLoading(true);

    try {
      const geoRes = await fetch(
        `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(targetCity)}&count=1&language=vi`,
      );
      const geoData = await geoRes.json();

      if (geoData.results && geoData.results.length > 0) {
        const { latitude, longitude, name } = geoData.results[0];
        await fetchWeatherByCoords(latitude, longitude, name);
        setCityInput("");
      } else {
        alert(`Không tìm thấy thành phố "${targetCity}"`);
        setLoading(false);
      }
    } catch {
      alert("Lỗi kết nối mạng!");
      setLoading(false);
    }
  };

  // Lấy thời tiết vị trí hiện tại
  const handleGetLocation = async () => {
    setLoading(true);
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        fetchWeatherByCity("Da Nang");
        return;
      }
      const location = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.Balanced,
      });
      await fetchWeatherByCoords(
        location.coords.latitude,
        location.coords.longitude,
        "Vị trí của bạn",
      );
    } catch {
      fetchWeatherByCity("Da Nang");
    }
  };

  const loadInitialLocation = useEffectEvent(() => {
    void handleGetLocation();
  });

  useEffect(() => {
    const timeout = setTimeout(() => loadInitialLocation(), 0);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      {/* Thanh tìm kiếm */}
      <View style={styles.searchRow}>
        <TouchableOpacity style={styles.iconBtn} onPress={handleGetLocation}>
          <Ionicons name="location-sharp" size={24} color="#38BDF8" />
        </TouchableOpacity>

        <TextInput
          style={styles.input}
          placeholder="Nhập tên thành phố (Đà Nẵng, Hà Nội, Sa Pa)..."
          placeholderTextColor="#94A3B8"
          value={cityInput}
          onChangeText={setCityInput}
          onSubmitEditing={() => fetchWeatherByCity(cityInput)}
        />

        <TouchableOpacity
          style={styles.iconBtn}
          onPress={() => fetchWeatherByCity(cityInput)}
        >
          <Ionicons name="search" size={24} color="#38BDF8" />
        </TouchableOpacity>
      </View>

      {/* Hiển thị thời tiết */}
      {loading ? (
        <View style={styles.center}>
          <ActivityIndicator size="large" color="#38BDF8" />
          <Text style={styles.loadingText}>Đang lấy dữ liệu thời tiết...</Text>
        </View>
      ) : weather ? (
        <ScrollView contentContainerStyle={styles.weatherContent}>
          <Text style={styles.cityName}>{weather.city}</Text>

          <MaterialCommunityIcons
            name={weather.iconName}
            size={120}
            color="#FDBA74"
            style={styles.weatherIcon}
          />

          <Text style={styles.tempText}>{weather.temp}°C</Text>
          <Text style={styles.descText}>
            {weather.description.toUpperCase()}
          </Text>

          <View style={styles.detailsGrid}>
            <View style={styles.detailCard}>
              <MaterialCommunityIcons
                name="thermometer"
                size={28}
                color="#38BDF8"
              />
              <Text style={styles.detailValue}>{weather.feelsLike}°C</Text>
              <Text style={styles.detailLabel}>Cảm giác như</Text>
            </View>

            <View style={styles.detailCard}>
              <MaterialCommunityIcons
                name="water-percent"
                size={28}
                color="#38BDF8"
              />
              <Text style={styles.detailValue}>{weather.humidity}%</Text>
              <Text style={styles.detailLabel}>Độ ẩm</Text>
            </View>

            <View style={styles.detailCard}>
              <MaterialCommunityIcons
                name="weather-windy"
                size={28}
                color="#38BDF8"
              />
              <Text style={styles.detailValue}>{weather.windSpeed} km/h</Text>
              <Text style={styles.detailLabel}>Tốc độ gió</Text>
            </View>
          </View>
        </ScrollView>
      ) : null}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#0B132B" },
  searchRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 10,
  },
  input: {
    flex: 1,
    backgroundColor: "#1C2541",
    color: "white",
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 12,
    fontSize: 15,
  },
  iconBtn: { backgroundColor: "#1C2541", padding: 10, borderRadius: 12 },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  loadingText: { color: "#94A3B8", marginTop: 12, fontSize: 15 },
  weatherContent: {
    alignItems: "center",
    paddingVertical: 20,
    paddingHorizontal: 20,
  },
  cityName: { color: "white", fontSize: 32, fontWeight: "bold" },
  weatherIcon: { marginVertical: 15 },
  tempText: { color: "white", fontSize: 72, fontWeight: "bold" },
  descText: {
    color: "#38BDF8",
    fontSize: 16,
    fontWeight: "600",
    letterSpacing: 2,
    marginBottom: 30,
  },
  detailsGrid: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    gap: 10,
  },
  detailCard: {
    flex: 1,
    backgroundColor: "#1C2541",
    paddingVertical: 18,
    borderRadius: 16,
    alignItems: "center",
  },
  detailValue: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 8,
  },
  detailLabel: { color: "#94A3B8", fontSize: 12, marginTop: 4 },
});
