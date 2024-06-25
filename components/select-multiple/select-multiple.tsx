import { useNavigation } from 'expo-router';
import { useEffect, useState } from 'react';
import { FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { Text, View, YStack } from 'tamagui';
const options1 = [
  { id: 1, label: 'Item 1' },
  { id: 2, label: 'Item 2' },
  { id: 3, label: 'Item 3' },
  { id: 4, label: 'Item 4' },
  { id: 5, label: 'Item 5' },
];

const SelectMultiple = ({ options, onChange, label, initialSelect = [] }) => {
  const [visible, setVisible] = useState(false);
  const [itemsId, setItemsId] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    setVisible(false);
  }, [navigation]);

  console.log('itemsId', itemsId);

  function renderItem(item: string) {
    return (
      <TouchableOpacity style={styles.items} onPress={() => toggleSelection(item)}>
        <Text>{item}</Text>
        <Text>checked</Text>
      </TouchableOpacity>
    );
  }

  function toggleSelection(item: any) {
    const itemId = itemsId.findIndex((i) => i?.id === item?.id);
    const arrSelected = [...itemsId];
    if (itemId !== -1) {
      arrSelected.splice(itemId, 1);
    } else {
      arrSelected.push(item.id);
    }
    setItemsId(arrSelected);
  }

  return (
    <YStack>
      <YStack gap={5}>
        <Text fontSize={14} fontWeight="bold">
          {label}
        </Text>
        <TouchableOpacity
          style={visible ? [styles.container, styles.containerVisible] : styles.container}
          onPress={() => setVisible(!visible)}>
          <Text>Item 1</Text>
          <Text>+</Text>
        </TouchableOpacity>
      </YStack>
      <YStack>
        {visible && (
          <View>
            <FlatList
              style={styles.flatListContainer}
              data={options1}
              renderItem={({ item }) => renderItem(item.label)}
              keyExtractor={(item) => item.id.toString()}
            />
          </View>
        )}
      </YStack>
    </YStack>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 44,
    position: 'relative',
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: '#C5C5C5',
    backgroundColor: 'white',
    borderRadius: 5,
  },
  containerVisible: {
    borderBottomWidth: 0,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
  },
  flatListContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: 100,
    width: '100%',
    // paddingHorizontal: 16,
    // paddingVertical: 12,
    borderWidth: 1,
    borderColor: '#C5C5C5',
    backgroundColor: 'white',
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    borderTopWidth: 0,
    borderRadius: 5,
  },
  items: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 6,
    fontSize: 16,
    height: 25,
    // backgroundColor: 'purple',
    paddingHorizontal: 16,
  },
});

export default SelectMultiple;
