import React, { useEffect, useState } from "react";
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from "react-native";
import Layout from "../../components/layout";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { MaterialIcons } from "@expo/vector-icons";
import { Menu, MenuOptions, MenuOption, MenuTrigger } from "react-native-popup-menu";

const History = () => {
    const [history, setHistory] = useState([]);
    const [filteredHistory, setFilteredHistory] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState("All");

    // Load history from AsyncStorage
    useEffect(() => {
        const loadHistory = async () => {
            try {
                const storedHistory = await AsyncStorage.getItem("history");
                if (storedHistory) {
                    const parsedHistory = JSON.parse(storedHistory);
                    setHistory(parsedHistory);
                    setFilteredHistory(parsedHistory);
                }
            } catch (error) {
                console.error("Failed to load history:", error);
            }
        };

        loadHistory();
    }, []);

    // Filter history based on category
    const filterHistory = (category) => {
        setSelectedCategory(category);
        if (category === "All") {
            setFilteredHistory(history);
        } else {
            setFilteredHistory(history.filter(item => item.category === category));
        }
    };

    return (
        <Layout>
            <View style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.heading}>Timer History</Text>
                    <Menu>
                        <MenuTrigger>
                            <MaterialIcons name="filter-list" size={24} color="black" />
                        </MenuTrigger>
                        <MenuOptions>
                            <MenuOption onSelect={() => filterHistory("All")}>
                                <Text style={styles.menuItem}>All</Text>
                            </MenuOption>
                            <MenuOption onSelect={() => filterHistory("Workout")}> 
                                <Text style={styles.menuItem}>Workout</Text>
                            </MenuOption>
                            <MenuOption onSelect={() => filterHistory("Study")}>
                                <Text style={styles.menuItem}>Study</Text>
                            </MenuOption>
                            <MenuOption onSelect={() => filterHistory("Break")}>
                                <Text style={styles.menuItem}>Break</Text>
                            </MenuOption>
                        </MenuOptions>
                    </Menu>
                </View>
                {filteredHistory.length === 0 ? (
                    <Text style={styles.noHistory}>No timers completed yet.</Text>
                ) : (
                    <FlatList
                        data={filteredHistory}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={({ item }) => (
                            <View style={styles.historyItem}>
                                <Text style={styles.timerName}>{item.name}</Text>
                                <Text style={styles.category}>Category: {item.category}</Text>
                                <Text style={styles.completionTime}>Completed on: {item.completionTime}</Text>
                            </View>
                        )}
                    />
                )}
            </View>
        </Layout>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 10,
    },
    heading: {
        fontSize: 22,
        fontWeight: "bold",
    },
    menuItem: {
        fontSize: 16,
        padding: 10,
    },
    noHistory: {
        fontSize: 16,
        color: "gray",
        textAlign: "center",
        marginTop: 20,
    },
    historyItem: {
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: "#ddd",
    },
    timerName: {
        fontSize: 16,
        fontWeight: "bold",
    },
    category: {
        fontSize: 14,
        fontWeight: "bold",
        color: "blue",
    },
    completionTime: {
        fontSize: 14,
        color: "gray",
    },
});

export default History;