import { View } from "react-native";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { ListingDataType } from "@/assets/data/type";
import { FlatList } from "react-native-gesture-handler";
import listingData from "@/assets/data/airbnb-listings.json";
import ExploreHeader from "./ExploreHeader";
import { defaultStyles } from "@/constants/styles";
import RenderListing from "./RenderListing";

const Listings = () => {
  const [category, setCategory] = useState("Tiny homes");
  const items = useMemo(() => listingData as ListingDataType, []);

  const onDataChange = (cat: string) => {
    setCategory(cat);
  };
  const [loading, setLoading] = useState(false);
  const listRef = useRef<FlatList>(null);
  useEffect(() => {
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
    }, 200);
  }, [items]);

  return (
    <View style={defaultStyles.container}>
      <ExploreHeader onCategoryChanged={onDataChange} />
      <FlatList
        data={loading ? [] : items}
        ref={listRef}
        scrollEventThrottle={16}
        keyExtractor={(item) => item.id}
        renderItem={(props) => <RenderListing {...props} />}
      />
    </View>
  );
};

export default Listings;
