import {
  ListRenderItem,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { ListingData } from "@/assets/data/type";
import { Ionicons } from "@expo/vector-icons";
import { Link } from "expo-router";
import { Image } from "expo-image";
import Animated, { FadeInRight, FadeInLeft } from "react-native-reanimated";
import { blurhash } from "@/constants/styles";

const RenderListing: ListRenderItem<ListingData> = ({ item, index }) => {
  return (
    <Link href={`/listing/${item.id}`} asChild>
      <TouchableOpacity>
        <Animated.View
          entering={FadeInRight}
          exiting={FadeInLeft}
          style={styles.listing}
        >
          <Image
            source={{ uri: item.medium_url }}
            placeholder={blurhash}
            style={styles.image}
          />
          <TouchableOpacity
            style={{ position: "absolute", right: 30, top: 30 }}
          >
            <Ionicons name="heart-outline" size={24} color="#000" />
          </TouchableOpacity>
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <Text style={{ fontSize: 14, fontFamily: "mon-sb" }}>
              {item.name}
            </Text>
            <View style={{ flexDirection: "row", gap: 4 }}>
              <Ionicons name="star" size={16} />
              <Text style={{ fontFamily: "mon-sb" }}>
                {item.review_scores_rating! / 20}
              </Text>
            </View>
          </View>
          <Text style={{ fontFamily: "mon" }}>{item.room_type}</Text>
          <View style={{ flexDirection: "row", gap: 4 }}>
            <Text style={{ fontFamily: "mon-sb" }}>€ {item.price}</Text>
            <Text style={{ fontFamily: "mon" }}>night</Text>
          </View>
        </Animated.View>
      </TouchableOpacity>
    </Link>
  );
};

export default RenderListing;

const styles = StyleSheet.create({
  listing: {
    padding: 16,
    gap: 10,
    marginVertical: 16,
  },
  image: {
    width: "100%",
    height: 300,
    borderRadius: 10,
  },
});
