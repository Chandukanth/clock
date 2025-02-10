import React from "react";
import { View, StyleSheet } from "react-native";
import Modal from "react-native-modal";

const Popup = ({ isVisible, onClose, children, height }) => {
    const styles = StyleSheet.create({
        modalContainer: {
            justifyContent: "center",
            alignItems: "center",
            margin: 0,
        },
        container: {
            backgroundColor: "#fff",
            borderRadius: 10,
            height: height,
            width: "90%",
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.25,
            shadowRadius: 4,
            elevation: 5,
           
        },
    });
    return (
        <Modal
            isVisible={isVisible}
            onBackdropPress={onClose}
            swipeDirection="down"
            onSwipeComplete={onClose}
            propagateSwipe={true}
            style={styles.modalContainer}
            animationOut={'slideOutDown'}
        >
            <View style={styles.container}>
                {children}
            </View>
        </Modal>
    );
};



export default Popup;
