import React from 'react';
import { View, StyleSheet } from 'react-native';

export default function ProgressBar({ progress }) {
  return (
    <View style={styles.container}>
      <View style={[styles.progressBar, { width: `${progress}%` }]} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { height: 10, width: '100%', backgroundColor: '#ccc', borderRadius: 5 },
  progressBar: { height: 10, backgroundColor: 'blue', borderRadius: 5 }
});