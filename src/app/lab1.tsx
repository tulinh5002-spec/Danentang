import { SafeAreaView, StyleSheet, Text } from "react-native";

export default function Lab1Screen() {
	return (
		<SafeAreaView style={styles.container}>
			<Text style={styles.title}>Bài 1</Text>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
		backgroundColor: "#F4F7F7",
	},
	title: {
		color: "#263238",
		fontSize: 24,
		fontWeight: "700",
	},
});
