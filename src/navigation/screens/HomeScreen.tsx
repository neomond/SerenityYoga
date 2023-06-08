import {
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React from 'react';
import LinearGradient from 'react-native-linear-gradient';

const DATA = [
  {
    category: 'Try this',
    data: [
      {
        key: '1',
        title: 'Item 1',
        duration: '25:00',
        image: require('../../assets/imgsample.png'),
      },
      {
        key: '2',
        title: 'Item 2',
        duration: '25:00',
        image: require('../../assets/imgsample.png'),
      },
      {
        key: '3',
        title: 'Item 3',
        duration: '25:00',
        image: require('../../assets/imgsample.png'),
      },
    ],
  },
  {
    category: 'Meditate',
    data: [
      {
        key: '4',
        title: 'Item 4',
        duration: '25:00',
        image: require('../../assets/imgsample.png'),
      },
      {
        key: '5',
        title: 'Item 5',
        duration: '25:00',
        image: require('../../assets/imgsample.png'),
      },
      {
        key: '6',
        title: 'Item 6',
        duration: '25:00',
        image: require('../../assets/imgsample.png'),
      },
    ],
  },
];

const HomeScreen = () => {
  const renderItem = ({item}: any) => (
    <View style={styles.renderItemCont}>
      <View style={styles.renderItemContSecond}>
        <Text style={styles.categoryHeader}>{item.category}</Text>
        <Text style={styles.categoryHeaderSecond}>View All</Text>
      </View>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {item.data.map((dataItem: any) => (
          <View key={dataItem.key} style={styles.imageContainer}>
            <Image source={dataItem.image} style={styles.image} />
            <Text style={styles.imageTitle}>{dataItem.title}</Text>
            <Text style={[styles.imageTitle, {top: 10}]}>
              {dataItem.duration}
            </Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );

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
        <Text style={styles.categoryText}>😨 Fear</Text>
        <Text style={styles.categoryText}>😢 Sadness</Text>
        <Text style={styles.categoryText}>😡 Anger</Text>
        <Text style={styles.categoryText}>😌 Calmness</Text>
        <Text style={styles.categoryText}>😄 Happiness</Text>
      </ScrollView>
      <View style={styles.primaryContent}>
        <FlatList
          data={DATA}
          renderItem={renderItem}
          keyExtractor={item => item.category}
          //   stickyHeaderIndices={[0]}
        />
      </View>
    </LinearGradient>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  linearGradient: {
    paddingTop: 150,
  },
  primaryContent: {
    rowGap: 8,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    borderWidth: 1,
    borderColor: '#fff',
    backgroundColor: '#fff',
    paddingVertical: 40,
    paddingBottom: 200,
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
  imageContainer: {
    marginRight: 10,
  },
  image: {
    width: 280,
    height: 150,
    borderRadius: 10,
  },
  imageTitle: {
    marginTop: 5,
    position: 'absolute',
    bottom: 15,
    left: 15,
    color: '#fff',
    fontWeight: '500',
  },
  sectionHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    padding: 10,
    color: 'black',
  },
  renderItemCont: {
    paddingLeft: 20,
    paddingBottom: 20,
  },
  renderItemContSecond: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginBottom: 15,
  },
  categoryHeader: {
    fontSize: 20,
    fontWeight: '500',
  },
  categoryHeaderSecond: {
    color: '#929292',
    fontWeight: '400',
    paddingRight: 20,
  },
});
