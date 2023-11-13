import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { useLocalSearchParams } from "expo-router";

const Page = () => {
  const { id } = useLocalSearchParams<{ id: string }>();
  console.log("🚀  ~ file: [id].tsx: ~ Page ~ id:", id);

  return (
    <View>
      <Text>Listing Details</Text>
    </View>
  );
};

export default Page;

const styles = StyleSheet.create({});
