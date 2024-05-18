import React from 'react';
import { Input, Text, YStack } from 'tamagui';

type TextFieldProps = {
  label: string;
  placeholder?: string;
  value: string;
  onChangeText: (text: string) => void;
  secureTextEntry?: boolean;
};

const TextField = ({
  label,
  value,
  placeholder,
  onChangeText,
  secureTextEntry,
}: TextFieldProps) => {
  return (
    <YStack gap={5}>
      <Text fontWeight="bold" color="#1A1A1A" fontSize={14}>
        {label}
      </Text>
      <Input
        placeholderTextColor="#C5C5C5"
        borderColor="#ccc"
        borderWidth={1}
        borderRadius={5}
        paddingHorizontal={16}
        paddingVertical={12}
        backgroundColor="white"
        autoCorrect={false}
        value={value}
        onChangeText={onChangeText}
      />
    </YStack>
  );
};

export default TextField;
