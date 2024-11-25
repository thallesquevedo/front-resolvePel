import { fireEvent, render } from '@testing-library/react-native';
import { TamaguiProvider } from 'tamagui';
import Pagination from '~/components/pagination/pagination';
import config from '~/tamagui.config';

describe('Pagination Component', () => {
  const mockOnPageChange = jest.fn();

  const renderPagination = (currentPage: number, totalPages: number) => {
    return render(
      <TamaguiProvider config={config}>
        <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={mockOnPageChange} />
      </TamaguiProvider>
    );
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render the pagination buttons correctly', () => {
    const { getByText } = renderPagination(1, 5);

    // Verifica se os botões de páginas estão sendo renderizados corretamente
    expect(getByText('1')).toBeTruthy();
    expect(getByText('2')).toBeTruthy();
    expect(getByText('3')).toBeTruthy();
    expect(getByText('4')).toBeTruthy();
    expect(getByText('5')).toBeTruthy();
  });


  it('should call onPageChange with the correct page number when a page button is clicked', () => {
    const { getByText } = renderPagination(1, 5);

    const pageButton = getByText('3');
    fireEvent.press(pageButton);

    expect(mockOnPageChange).toHaveBeenCalledWith(3);
  });

  it('should call onPageChange with the correct page number when the "previous" button is clicked', () => {
    const { getByText } = renderPagination(3, 5);

    const previousButton = getByText('‹'); // Ajuste para o símbolo correto
    fireEvent.press(previousButton);

    expect(mockOnPageChange).toHaveBeenCalledWith(2);
  });

  it('should call onPageChange with the correct page number when the "next" button is clicked', () => {
    const { getByText } = renderPagination(3, 5);

    const nextButton = getByText('›'); // Ajuste para o símbolo correto
    fireEvent.press(nextButton);

    expect(mockOnPageChange).toHaveBeenCalledWith(4);
  });

});
