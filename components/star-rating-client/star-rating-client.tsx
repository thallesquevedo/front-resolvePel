import { FontAwesome } from '@expo/vector-icons';
import React, { useState } from 'react';
import { TouchableOpacity } from 'react-native';
import { XStack, YStack } from 'tamagui';

const StarRatingClient = ({ maxStars = 5, rating, setRating }: any) => {
  const [currentRating, setCurrentRating] = useState(rating);

  const handleStarPress = (star: any) => {
    setCurrentRating(star);
    setRating(star);
  };

  return (
    <YStack>
      <XStack>
        {Array.from({ length: maxStars }, (_, index) => (
          <TouchableOpacity key={index} onPress={() => handleStarPress(index + 1)}>
            <FontAwesome
              name={index < currentRating ? 'star' : 'star-o'}
              size={32}
              style={{ marginRight: 5 }}
              color={index < currentRating ? '#4B1970' : '#C5C5C5'}
            />
          </TouchableOpacity>
        ))}
      </XStack>
    </YStack>
  );
};

export default StarRatingClient;
