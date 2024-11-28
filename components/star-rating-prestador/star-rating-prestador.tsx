import { FontAwesome } from '@expo/vector-icons';
import { XStack } from 'tamagui';

const StarRatingPrestador = ({ rating }: any) => {
  const roundedRating = Math.round(rating);
  return (
    <XStack>
      {Array.from({ length: 5 }, (_, index) => (
        <FontAwesome
          key={index}
          name={index < roundedRating ? 'star' : 'star-o'}
          size={32}
          style={{ marginRight: 5 }}
          color={index < roundedRating ? '#4B1970' : '#C5C5C5'}
        />
      ))}
    </XStack>
  );
};

export default StarRatingPrestador;
