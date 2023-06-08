import {ScrollView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import LinearGradient from 'react-native-linear-gradient';

const HomeScreen = () => {
  return (
    <LinearGradient
      colors={['#8866ff', '#a177f8', '#c47afb', '#d287fe']}
      start={{x: 0, y: 0}}
      end={{x: 1, y: 0}}
      style={styles.linearGradient}>
      <Text style={styles.headerText}>Welcome, Nazrin!</Text>
      <Text style={styles.subheaderText}>How are you feeling today?</Text>
      <ScrollView
        style={styles.scrollCategories}
        showsHorizontalScrollIndicator={false}
        horizontal={true}>
        <Text style={styles.categoryText}>🤯 Stress</Text>
        <Text style={styles.categoryText}>🥵 Anxiety</Text>
        <Text style={styles.categoryText}>😖 Depression</Text>
      </ScrollView>
      <View style={styles.primaryContent}></View>
    </LinearGradient>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  linearGradient: {
    paddingTop: 150,
  },
  primaryContent: {
    alignItems: 'center',
    rowGap: 8,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    borderWidth: 1,
    borderColor: '#fff',
    backgroundColor: '#fff',
    paddingVertical: 60,
    paddingBottom: 200,
    // height: '100%',
  },
  headerText: {
    marginHorizontal: 20,
    marginBottom: 10,
    fontSize: 26,
    color: '#fff',
    fontWeight: '500',
  },
  subheaderText: {
    color: '#fff',
    fontWeight: '300',
    marginHorizontal: 20,
    fontSize: 16,
    marginBottom: 20,
  },
  scrollCategories: {
    marginBottom: 20,
    paddingLeft: 20,
  },
  categoryText: {
    marginRight: 10,
    color: '#fff',
    borderWidth: 1,
    paddingVertical: 10,
    paddingHorizontal: 15,
    backgroundColor: 'rgba(255,255,255, 0.3)',
    borderColor: 'rgba(255,255,255, 0.1)',
    borderRadius: 20,
    overflow: 'hidden',
  },
});
