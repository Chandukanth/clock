import React from "react";
import { StatusBar, View, TouchableOpacity, Text, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";

const Layout = ({ children }) => {
    const navigation = useNavigation();

    return (
        <View style={{ flex: 1, backgroundColor: '#FFFFFF', marginTop: StatusBar.currentHeight }}>
            {children}
            {/* Bottom Toolbar */}
            <View style={styles.bottomToolBar}>
                <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("Home")}>
                    <Text style={styles.buttonText}>Home</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("History")}>
                    <Text style={styles.buttonText}>History</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    bottomToolBar: {
        flexDirection: "row",
        justifyContent: "space-around",
        backgroundColor: "#f8f8f8",
        paddingVertical: 10,
        borderTopWidth: 1,
        borderTopColor: "#ccc",
        position: "absolute",
        bottom: 0,
        width: "100%",
        
    },
    button: {
        padding: 10,
    },
    buttonText: {
        fontSize: 16,
        fontWeight: "bold",
        color: "black",
    },
});

export default Layout;
