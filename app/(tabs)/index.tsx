import { View } from "react-native";
import React, { useMemo, useState } from "react";
import { Stack } from "expo-router";
import ExploreHeader from "@/components/ExploreHeader";
import Listings from "@/components/Listings";
import listingData from "@/assets/data/airbnb-listings.json";
import { ListingDataType } from "@/assets/data/type";

const Explore = () => {
  const [category, setCategory] = useState("Tiny homes");
  const items = useMemo(() => listingData as ListingDataType, []);

  const onDataChange = (cat: string) => {
    setCategory(cat);
  };

  return (
    <View style={{ flex: 1, marginTop: 80 }}>
      <Stack.Screen
        options={{
          header: () => <ExploreHeader onCategoryChanged={onDataChange} />,
        }}
      />
      <Listings listings={items} category={category} />
    </View>
  );
};

export default Explore;
