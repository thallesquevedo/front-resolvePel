import { Button, Text, XStack } from 'tamagui';

interface IPagination {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination = ({ currentPage, totalPages, onPageChange }: IPagination) => {
  return (
    <XStack justifyContent="center" gap={6} marginTop={20}>
      <Button
        onPress={() => onPageChange(currentPage - 1)}
        disabled={currentPage <= 1}
        backgroundColor={currentPage <= 1 ? '#D1D1D1' : '#54187E'}
        fontSize={16}>
        &lsaquo;
      </Button>
      <XStack gap={2}>
        {[...Array(totalPages)].map((_, index) => (
          <Button
            key={index}
            onPress={() => onPageChange(index + 1)}
            backgroundColor={currentPage === index + 1 ? '#440F69' : '#54187E'}
            fontSize={16}>
            <Text color="#FFF">{index + 1}</Text>
          </Button>
        ))}
      </XStack>
      <Button
        onPress={() => onPageChange(currentPage + 1)}
        disabled={currentPage >= totalPages}
        backgroundColor={currentPage >= totalPages ? '#D1D1D1' : '#54187E'}
        fontSize={16}>
        &rsaquo;
      </Button>
    </XStack>
  );
};

export default Pagination;
