import React, { useState, useEffect } from "react";
import { SafeAreaView, View, ScrollView, ImageBackground, Text, Image, StyleSheet, ActivityIndicator, } from "react-native";
import { RouteProp } from "@react-navigation/native";
import { RootStackParamList } from '../../navigations/types';
import AsyncStorage from '@react-native-async-storage/async-storage';

type BattleOtherStateRouteProp = RouteProp<RootStackParamList, "BattleOtherState">;

const BattleOtherState = ({ route }: { route: BattleOtherStateRouteProp }) => {
	const { battleId } = route.params; // battleId 받아오기

	type BattleData = {
		member1Name: string;
		member2Name: string;
		member1StartWeight: number;
		member2StartWeight: number;
		member1TargetWeight: number;
		member2TargetWeight: number;
		member1AttainmentRate: number;
		member2AttainmentRate: number;
		targetDay: string;
	};


	// 서버에서 받아올 데이터를 상태로 관리
	const [battleData, setBattleData] = useState<BattleData | null>(null);
	const [loading, setLoading] = useState(true);
	const [daysLeft, setDaysLeft] = useState<number | null>(null);
	const today = new Date().toISOString().split('T')[0]; // "YYYY-MM-DD" 형태로 포맷

	const calculateDays = (start: string, end: string) => {
		const startDate = new Date(start);
		const endDate = new Date(end);
		const diffTime = endDate.getTime() - startDate.getTime();
		return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
	};

	// API 호출
	useEffect(() => {
		const fetchBattleData = async () => {
			try {
				const accessToken = await AsyncStorage.getItem('accessToken');
				const response = await fetch(`http://172.16.4.171:8080/battlestatus?battleId=${battleId}`, {
					method: "GET",
					headers: {
						"Content-Type": "application/json",
						Authorization: `${accessToken}`,
					},
				});

				const data = await response.json();

				if (data.isSuccess) {
					setBattleData(data.result);
				} else {
					console.error("API 요청 실패:", data.message);
				}
			} catch (error) {
				console.error("API 호출 중 오류 발생:", error);
			} finally {
				setLoading(false);
			}
		};

		fetchBattleData();
	}, []);

	// 로딩 상태
	if (loading) {
		return (
			<SafeAreaView style={styles.container}>
				<ActivityIndicator size="large" color="#0000ff" />
			</SafeAreaView>
		);
	}

	// 데이터가 없는 경우 처리
	if (!battleData) {
		return (
			<SafeAreaView style={styles.container}>
				<Text>데이터를 가져오지 못했습니다.</Text>
			</SafeAreaView>
		);
	}

	return (
		<SafeAreaView style={styles.container}>
			<ScrollView style={styles.scrollView}>
				<View style={styles.column}>
					<View style={styles.column2}>
						<View style={styles.column3}>
							<View style={styles.column4}>

								<View style={styles.column5}>
									<View style={styles.row}>
										<Text style={styles.text}>
											{battleData.member1Name}
										</Text>
										<View style={styles.view2}>
											<View style={[
												styles.box,
												{
													width: `${battleData.member1AttainmentRate}%`,
												},]} />
										</View>

									</View>
									<Text style={styles.text2}>
										{`${battleData.member1AttainmentRate}%`}
									</Text>
									<View style={styles.row2}>
										<View style={styles.column6}>
											<Text style={styles.text3}>
												{"시작 몸무게"}
											</Text>
											<Text style={styles.text4}>
												{"목표 몸무게"}
											</Text>
										</View>
										<View style={styles.column7}>
											<Text style={styles.text3}>
												{battleData.member1StartWeight}kg
											</Text>
											<Text style={styles.text4}>
												{battleData.member1TargetWeight}kg
											</Text>
										</View>
										<View style={styles.column8}>
											<Image
												source={{ uri: "https://i.imgur.com/1tMFzp8.png" }}
												resizeMode={"stretch"}

											/>

										</View>
									</View>
								</View>

								<Text style={styles.absoluteText}>
									{"D-" + calculateDays(today, battleData.targetDay)}
								</Text>
							</View>

							<View style={styles.column5}>
								<View style={styles.row}>
									<Text style={styles.text}>
										{battleData.member2Name}
									</Text>
									<View style={styles.view2}>
										<View style={[
											styles.box,
											{
												width: `${battleData.member2AttainmentRate}%`,
											},]} />
									</View>
								</View>
								<Text style={styles.text2}>
									{`${battleData.member2AttainmentRate}%`}
								</Text>
								<View style={styles.row2}>
									<View style={styles.column6}>
										<Text style={styles.text3}>
											{"시작 몸무게"}
										</Text>
										<Text style={styles.text4}>
											{"목표 몸무게"}
										</Text>
									</View>
									<View style={styles.column7}>
										<Text style={styles.text3}>
											{battleData.member2StartWeight}kg
										</Text>
										<Text style={styles.text4}>
											{battleData.member2TargetWeight}kg
										</Text>
									</View>
									<View style={styles.column8}>
										<Image
											source={{ uri: "https://i.imgur.com/1tMFzp8.png" }}
											resizeMode={"stretch"}

										/>

									</View>
								</View>
							</View>

						</View>
						<View style={styles.column9}>
							<View style={styles.row4}>
								<Image
									source={{ uri: "https://i.imgur.com/1tMFzp8.png" }}
									resizeMode={"stretch"}
									style={styles.image3}
								/>
								<Image
									source={{ uri: "https://i.imgur.com/1tMFzp8.png" }}
									resizeMode={"stretch"}
									style={styles.image3}
								/>
								<Image
									source={{ uri: "https://i.imgur.com/1tMFzp8.png" }}
									resizeMode={"stretch"}
									style={styles.image3}
								/>
								<Image
									source={{ uri: "https://i.imgur.com/1tMFzp8.png" }}
									resizeMode={"stretch"}
									style={styles.image3}
								/>
								<Image
									source={{ uri: "https://i.imgur.com/1tMFzp8.png" }}
									resizeMode={"stretch"}
									style={styles.image3}
								/>
							</View>
							<View style={styles.row5}>
								<Text style={styles.text5}>
									{"기록"}
								</Text>
								<Text style={styles.text6}>
									{"대결"}
								</Text>
								<Text style={styles.text7}>
									{"홈"}
								</Text>
								<Text style={styles.text8}>
									{"타이머"}
								</Text>
								<Text style={styles.text9}>
									{"운동메이트"}
								</Text>
							</View>
							<View style={styles.box2}>
							</View>
						</View>
					</View>
					<View style={styles.absoluteColumn}>
						<View style={styles.row6}>
							<Text style={styles.text10}>
								{"9:41"}
							</Text>
							<View style={styles.row7}>
								<View style={styles.box3}>
								</View>
								<View style={styles.box4}>
								</View>
							</View>
							<Image
								source={{ uri: "https://i.imgur.com/1tMFzp8.png" }}
								resizeMode={"stretch"}
								style={styles.image4}
							/>
							<Image
								source={{ uri: "https://i.imgur.com/1tMFzp8.png" }}
								resizeMode={"stretch"}
								style={styles.image5}
							/>
							<View style={styles.view3}>
								<View style={styles.box5}>
								</View>
							</View>
							<View style={styles.box6}>
							</View>
						</View>
						<View style={styles.row8}>
							<Image
								source={{ uri: "https://i.imgur.com/1tMFzp8.png" }}
								resizeMode={"stretch"}
								style={styles.image6}
							/>
							<Text style={styles.text11}>
								{"대결 상태"}
							</Text>
						</View>
					</View>
				</View>
			</ScrollView>
		</SafeAreaView>
	)
}
export default BattleOtherState;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#FFFFFF",
	},
	absoluteColumn: {
		position: "absolute",
		top: -1,
		right: 0,
		left: 0,
		height: 135,
		backgroundColor: "#1D1B20",
		paddingRight: 32,
	},
	absoluteText: {
		position: "absolute",
		top: -42,
		left: 28,
		color: "#BEBAC5",
		fontSize: 48,
	},
	box: {
		width: 126,
		height: 24,
		backgroundColor: "#FFFFFF",
		borderRadius: 4,
	},
	box2: {
		height: 5,
		backgroundColor: "#FFFFFF",
		borderRadius: 100,
		marginHorizontal: 127,
	},
	box3: {
		width: 80,
		height: 37,
		backgroundColor: "#000000",
		borderRadius: 100,
	},
	box4: {
		width: 37,
		height: 37,
		backgroundColor: "#000000",
		borderRadius: 100,
	},
	box5: {
		height: 9,
		backgroundColor: "#FFFFFF",
		borderRadius: 2,
		marginTop: 2,
	},
	box6: {
		width: 1,
		height: 4,
		backgroundColor: "#FFFFFF",
	},
	column: {
		marginTop: 1,
	},
	column2: {
		backgroundColor: "#1D1B20",
		paddingTop: 214,
	},
	column3: {
		marginBottom: 9,
	},
	column4: {
		marginBottom: 22,
	},
	column5: {
		backgroundColor: "#6F6CFF80",
		borderRadius: 20,
		paddingVertical: 32,
		paddingRight: 24,
		marginTop: 30,
	},
	column6: {
		width: 90,
		marginRight: 19,
	},
	column7: {
		flex: 1,
		marginRight: 4,
	},
	column8: {
		width: 70,
		height: 70,
		backgroundColor: "#625E67",
		borderRadius: 10,
		paddingTop: 19,
		paddingBottom: 1,
	},
	column9: {
		backgroundColor: "#1D1B20",
		paddingTop: 28,
		paddingBottom: 8,
	},
	image: {
		height: 24,
		marginBottom: 7,
		marginHorizontal: 23,
	},
	image2: {
		height: 19,
		marginHorizontal: 10,
	},
	image3: {
		width: 27,
		height: 27,
	},
	image4: {
		width: 18,
		height: 12,
		marginRight: 8,
	},
	image5: {
		width: 17,
		height: 11,
		marginRight: 7,
	},
	image6: {
		width: 9,
		height: 19,
		marginRight: 119,
	},
	row: {
		flexDirection: "row",
		alignItems: "center",
		marginBottom: 5,
		marginLeft: 33,
	},
	row2: {
		flexDirection: "row",
		alignItems: "center",
		marginLeft: 33,
	},
	row3: {
		flexDirection: "row",
		alignItems: "center",
		marginBottom: 5,
		marginLeft: 34,
	},
	row4: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		marginBottom: 7,
		marginHorizontal: 29,
	},
	row5: {
		flexDirection: "row",
		alignItems: "center",
		marginBottom: 19,
		marginHorizontal: 21,
	},
	row6: {
		flexDirection: "row",
		alignItems: "center",
		marginTop: 11,
		marginBottom: 37,
		marginLeft: 57,
	},
	row7: {
		width: 125,
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		backgroundColor: "#000000",
		borderRadius: 100,
		marginRight: 23,
	},
	row8: {
		flexDirection: "row",
		alignItems: "center",
		marginLeft: 32,
	},
	scrollView: {
		flex: 1,
		backgroundColor: "#FFFFFF",
	},
	text: {
		color: "#FFFFFF",
		fontSize: 24,
		marginRight: 4,
		flex: 1,
	},
	text2: {
		color: "#FFFFFF",
		fontSize: 12,
		marginBottom: 12,
		marginLeft: 297,
	},
	text3: {
		color: "#FFFFFF",
		fontSize: 20,
		marginBottom: 14,
	},
	text4: {
		color: "#FFFFFF",
		fontSize: 20,
	},
	text5: {
		color: "#7C7C7C",
		fontSize: 10,
		marginRight: 4,
		flex: 1,
	},
	text6: {
		color: "#7C7C7C",
		fontSize: 10,
		marginRight: 66,
	},
	text7: {
		color: "#7161FF",
		fontSize: 10,
		marginRight: 62,
	},
	text8: {
		color: "#7C7C7C",
		fontSize: 10,
		marginRight: 44,
	},
	text9: {
		color: "#7C7C7C",
		fontSize: 10,
	},
	text10: {
		color: "#FFFFFF",
		fontSize: 16,
		marginRight: 4,
		flex: 1,
	},
	text11: {
		color: "#FFFFFF",
		fontSize: 20,
		flex: 1,
	},
	view: {
		height: 251,
		paddingHorizontal: 24,
	},
	view2: {
		width: 168,
		alignItems: "flex-start",
		backgroundColor: "#625F67",
		borderRadius: 4,
	},
	view3: {
		width: 25,
		borderColor: "#FFFFFF",
		borderRadius: 4,
		borderWidth: 1,
		paddingHorizontal: 2,
		marginRight: 1,
	},
});