import React from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import { ButtonGroup, ListItem } from 'react-native-elements';

const ALL_INDEX = 0;

const GREAT = 'sentiment-very-satisfied';
const GREAT_INDEX = 1;
const GREAT_COLOR = 'red'

const GOOD = 'sentiment-satisfied';
const GOOD_INDEX = 2;
const GOOD_COLOR = 'orange'

const POOR = 'sentiment-dissatisfied';
const POOR_INDEX = 3;
const POOR_COLOR = 'blue'

const allReviewsTmp = [
  {
    country: 'USA',
    dateFrom: 'Jan/15/2018',
    dateTo: 'Jan/25/2018',
    imageURIs: [
      require('../assets/add_image_placeholder.png'),
      require('../assets/add_image_placeholder.png'),
      require('../assets/add_image_placeholder.png'),
    ],
    rank: GREAT,
  },
  {
    country: 'USA',
    dateFrom: 'Feb/15/2018',
    dateTo: 'Feb/25/2018',
    imageURIs: [
      require('../assets/add_image_placeholder.png'),
      require('../assets/add_image_placeholder.png'),
      require('../assets/add_image_placeholder.png'),
    ],
    rank: GOOD,
  },
  {
    country: 'USA',
    dateFrom: 'Mar/15/2018',
    dateTo: 'Mar/25/2018',
    imageURIs: [
      require('../assets/add_image_placeholder.png'),
      require('../assets/add_image_placeholder.png'),
      require('../assets/add_image_placeholder.png'),
    ],
    rank: POOR,
  },
];

class HomeScreen extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      selectedIndex: ALL_INDEX
    }
  }

  onButtonGroupPress = (selectedIndex) => {
    this.setState({
      selectedIndex: selectedIndex
    });
  }

  renderReviews() {
    let reviewRank;

    switch (this.state.selectedIndex) {
      case GREAT_INDEX:
        reviewRank = GREAT;
        break;

      case GOOD_INDEX:
        reviewRank = GOOD;
        break;
  
      case POOR_INDEX:
        reviewRank = POOR;
        break;

      default:
        break;
    }

    let rankedReviews = [];

    if (this.state.selectedIndex === ALL_INDEX) {

      rankedReviews = allReviewsTmp;

    } else {

      for (let i = 0; i < allReviewsTmp.length; i++) {
        if (allReviewsTmp[i].rank === reviewRank) {
          rankedReviews.push(allReviewsTmp[i]);
        }
      }
    }

    onListItemPress = (selectedReview) => {
      this.props.navigation.navigate('detail')
    }

    return(
      <ScrollView>
        {rankedReviews.map((review, index) => {
            let reviewColor;

            switch (review.rank) {
              case GREAT:
                reviewColor = GREAT_COLOR;
                break;

              case GOOD:
                reviewColor = GOOD_COLOR;
                break;

              case POOR:
                reviewColor = POOR_COLOR;
                break;

              default:
                break;
            }

            return (
              <ListItem
                key={index}
                leftIcon={{ name: review.rank, color: reviewColor }}
                title={review.country}
                subtitle={`${review.dateFrom} ~ ${review.dateTo}`}
                onPress={() => onListItemPress(review)}
              />
            );
          })
        }
      </ScrollView>
    );
  }

  render() {
    let nGreat = 0; // "Number of Great" の略。値が変更され得るので`let`で宣言
    let nGood = 0; // "Number of Good" の略。値が変更され得るので`let`で宣言
    let nPoor = 0; // "Number of Poor" の略。値が変更され得るので`let`で宣言
    
    // `i` が0から1ずつ増えていって(`allReviewsTmp.length`-1)になるまでの
    // 計`allReviewsTmp.length`回分繰り返す
    for (let i = 0; i < allReviewsTmp.length; i++) {
      switch (allReviewsTmp[i].rank) { // もし`allReviewsTmp[i]`の`rank`が
        case GREAT: // `GREAT`だったら、
          nGreat++; // `nGreat`を1追加
          break; // 比較を終了して抜け出す

        case GOOD: // `GOOD`だったら、
          nGood++; // `nGood`を1追加
          break; // 比較を終了して抜け出す

        case POOR: // `POOR`だったら、
          nPoor++; // `nPoor`を1追加
          break; // 比較を終了して抜け出す

        default: // それ以外だったら、
          break; // (特に何もせず)抜け出す
      }
    }

    const buttonList = [
      `All (${allReviewsTmp.length})`, // ←バッククォート&テンプレート文字列に変更
      `Great (${nGreat})`, // ←バッククォート&テンプレート文字列に変更
      `Good (${nGood})`, // ←バッククォート&テンプレート文字列に変更
      `Poor (${nPoor})` // ←バッククォート&テンプレート文字列に変更
    ];

  
    return (
      <View style={{ flex: 1 }}>
        <ButtonGroup
          buttons={buttonList}
          selectedIndex={this.state.selectedIndex}
          onPress={this.onButtonGroupPress}
        />

        {this.renderReviews()}
      </View>
    );
  }
}


export default HomeScreen;