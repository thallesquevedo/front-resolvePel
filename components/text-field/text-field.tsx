import React from 'react';
import { Input, Text, YStack } from 'tamagui';

type TextFieldProps = {
  label: string;
  placeholder?: string;
  secureTextEntry?: boolean;
};

const TextField = ({ label, ...inputProps }: TextFieldProps) => {
  return (
    <YStack gap={5}>
      <Text fontWeight="bold" color="#1A1A1A" fontSize={14}>
        {label}
      </Text>
      <Input
        color="#C5C5C5"
        borderColor="#ccc"
        borderWidth={1}
        borderRadius={5}
        paddingHorizontal={16}
        paddingVertical={12}
        backgroundColor="white"
        {...inputProps}
      />
    </YStack>
  );
};

export default TextField;
