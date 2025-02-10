import React, { useState, useEffect } from "react";
import { View, Text, TextInput, Button, FlatList, StyleSheet, Alert, TouchableOpacity, ScrollView } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ProgressBar } from "react-native-paper";
import Layout from "../../components/layout";
import Popup from "../../components/popup";
import { useNavigation } from "@react-navigation/native";
import { SelectList } from "react-native-dropdown-select-list";

const items = [
    { key: '1', value: 'Workout' },
    { key: '2', value: 'Study' },
    { key: '3', value: 'Break' },
]

const HomeScreen = () => {
    const [name, setName] = useState("");
    const [duration, setDuration] = useState("");
    const [category, setCategory] = useState("");
    const [timers, setTimers] = useState([]);
    const [expandedCategories, setExpandedCategories] = useState({});
    const [completedTimer, setCompletedTimer] = useState(null);
    const [halfwayAlert, setHalfwayAlert] = useState(null);
    const [alertPercentage, setAlertPercentage] = useState("");
    const navigation = useNavigation();

    useEffect(() => {
        loadTimers();
    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            setTimers(prevTimers => prevTimers.map(timer => {
                if (timer.status === "Running" && timer.remainingTime > 0) {
                    const newRemainingTime = timer.remainingTime - 1;

                    if (timer.alertPercentage && newRemainingTime === Math.floor(timer.duration * (timer.alertPercentage / 100))) {
                        setHalfwayAlert(timer);
                    }

                    return { ...timer, remainingTime: newRemainingTime };
                } else if (timer.status === "Running" && timer.remainingTime === 0) {
                    setCompletedTimer(timer);
                    saveToHistory(timer);
                    return { ...timer, status: "Completed" };
                }
                return timer;
            }));
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    const saveTimer = async () => {
        if (!name || !duration || !category) {
            Alert.alert("Error", "Please fill all fields");
            return;
        }
        const newTimer = {
            id: Date.now().toString(),
            name,
            duration: parseInt(duration),
            category,
            alertPercentage: alertPercentage ? parseInt(alertPercentage) : null,
            status: "Paused",
            remainingTime: parseInt(duration)
        };
        const updatedTimers = [...timers, newTimer];
        setTimers(updatedTimers);
        await AsyncStorage.setItem("timers", JSON.stringify(updatedTimers));
        setName("");
        setDuration("");
        setCategory("");
        setAlertPercentage('')
    };

    const loadTimers = async () => {
        // await AsyncStorage.clear()
        const storedTimers = await AsyncStorage.getItem("timers");
        if (storedTimers) {
            setTimers(JSON.parse(storedTimers));
        }
    };

    const toggleCategory = (category) => {
        setExpandedCategories(prevState => ({
            ...prevState,
            [category]: !prevState[category]
        }));
    };

    const startAllTimers = (category) => {
        setTimers(prevTimers => prevTimers.map(timer =>
            timer.category === category ? { ...timer, status: "Running" } : timer
        ));
    };

    const pauseAllTimers = (category) => {
        setTimers(prevTimers => prevTimers.map(timer =>
            timer.category === category ? { ...timer, status: "Paused" } : timer
        ));
    };

    const resetAllTimers = (category) => {
        setTimers(prevTimers => prevTimers.map(timer =>
            timer.category === category ? { ...timer, remainingTime: timer.duration, status: "Paused" } : timer
        ));
    };


    const startTimer = (id) => {
        setTimers(prevTimers => prevTimers.map(timer =>
            timer.id === id ? { ...timer, status: "Running" } : timer
        ));
    };

    const pauseTimer = (id) => {
        setTimers(prevTimers => prevTimers.map(timer =>
            timer.id === id ? { ...timer, status: "Paused" } : timer
        ));
    };

    const saveToHistory = async (timer) => {
        const history = await AsyncStorage.getItem('history');
        const completedEntry = { category: timer.category, name: timer.name, completionTime: new Date().toLocaleString() };
        const updatedHistory = history ? JSON.parse(history).concat(completedEntry) : [completedEntry];
        await AsyncStorage.setItem("history", JSON.stringify(updatedHistory));
    };

    const resetTimer = (id, duration) => {
        setTimers(prevTimers => prevTimers.map(timer =>
            timer.id === id ? { ...timer, remainingTime: duration, status: "Paused" } : timer
        ));
    };

    const groupedTimers = timers.reduce((acc, timer) => {
        if (!acc[timer.category]) {
            acc[timer.category] = [];
        }
        acc[timer.category].push(timer);
        return acc;
    }, {});

    return (
        <Layout>
            <ScrollView>
                <View style={styles.container}>
                    <Text style={styles.heading}>Add Timer</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Timer Name"
                        value={name}
                        onChangeText={setName}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Duration (seconds)"
                        keyboardType="numeric"
                        value={duration}
                        onChangeText={setDuration}
                    />
                    <View style={{ marginTop: 20 }} />
                    <SelectList
                        setSelected={(val) => setCategory(val)}
                        data={items}
                        save="value"
                        placeholder="Category"
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Alert Percentage (optional)"
                        keyboardType="numeric"
                        value={alertPercentage}
                        onChangeText={setAlertPercentage}
                    />

                    <TouchableOpacity onPress={saveTimer} style={{ width: '100%', height: 40, borderWidth: 1, borderColor: 'black', marginTop: 20, borderRadius: 20, justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={{ fontWeight: 'bold' }}>Submit</Text>

                    </TouchableOpacity>

                    {/* <Button title="Save Timer" onPress={saveTimer} /> */}
                    <Text style={styles.heading}>Saved Timers</Text>
                    {Object.keys(groupedTimers).map((category) => (
                        <View key={category}>
                            <TouchableOpacity onPress={() => toggleCategory(category)}>
                                <Text style={styles.categoryHeading}>{category}</Text>
                            </TouchableOpacity>

                            {expandedCategories[category] && (
                                <>
                                    <View style={{ flexDirection: "row", justifyContent: "space-around", marginVertical: 5 }}>
                                        <Button color={'green'} title="Start All" onPress={() => startAllTimers(category)} />
                                        <Button color={'red'} title="Pause All" onPress={() => pauseAllTimers(category)} />
                                        <Button title="Reset All" onPress={() => resetAllTimers(category)} />
                                    </View>
                                    <FlatList
                                        data={groupedTimers[category]}
                                        keyExtractor={(item) => item.id}
                                        renderItem={({ item }) => (
                                            <View style={styles.timerItem}>
                                                <Text>{item.name} - {item.remainingTime}s ({item.status})</Text>
                                                <ProgressBar progress={item.remainingTime / item.duration} color="red" style={styles.progressBar} />
                                                <Button color={'green'} title="Start" onPress={() => startTimer(item.id)} disabled={item.status === "Running" || item.status === "Completed"} />
                                                <Button color={'red'} title="Pause" onPress={() => pauseTimer(item.id)} disabled={item.status !== "Running"} />
                                                <Button title="Reset" onPress={() => resetTimer(item.id, item.duration)} />

                                            </View>
                                        )}
                                    />
                                </>
                            )}
                        </View>
                    ))}
                    <Popup height={100} isVisible={!!halfwayAlert} onClose={() => setHalfwayAlert(null)}>
                        <View style={{ justifyContent: 'center', alignItems: 'center', height: 100 }}>
                            <Text style={{ fontWeight: 'bold' }}>Alert! {halfwayAlert?.name} is at {halfwayAlert?.alertPercentage}% completion.</Text>
                        </View>
                    </Popup>
                    <Popup height={100} isVisible={!!completedTimer} onClose={() => setCompletedTimer(null)}>
                        <View style={{ justifyContent: 'center', alignItems: 'center', height: 100 }}>
                            <Text style={{ fontWeight: 'bold' }}>Congratulations! {completedTimer?.name} has completed.</Text>
                        </View>
                    </Popup>
                </View>
            </ScrollView>
        </Layout>
    );
};

export default HomeScreen;
const styles = StyleSheet.create({
    container: { padding: 20 },
    heading: { fontSize: 18, fontWeight: "bold", marginVertical: 10, textAlign: 'center' },
    input: { borderWidth: 1, padding: 10, marginVertical: 5, borderRadius: 8, marginTop: 20 },
    timerItem: { padding: 10, borderBottomWidth: 1, marginBottom: 30 },
    categoryHeading: { fontSize: 16, fontWeight: "bold", paddingVertical: 5, marginBottom: 20 },
    progressBar: { height: 5, marginVertical: 5 },
    bulkActions: { flexDirection: "row", justifyContent: "space-around", marginVertical: 5 },
    modalContainer: { flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "rgba(0,0,0,0.5)" }
});