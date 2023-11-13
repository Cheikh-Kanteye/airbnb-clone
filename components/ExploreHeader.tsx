import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React, { useRef, useState } from "react";
import { Link } from "expo-router";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import Colors from "@/constants/Colors";
import * as Haptics from "expo-haptics";

type CATEGORY = {
  name: string;
  icon: keyof typeof MaterialIcons.glyphMap;
};

const categories: CATEGORY[] = [
  {
    name: "Tiny homes",
    icon: "home",
  },
  {
    name: "Cabins",
    icon: "house-siding",
  },
  {
    name: "Trending",
    icon: "local-fire-department",
  },
  {
    name: "Play",
    icon: "videogame-asset",
  },
  {
    name: "City",
    icon: "apartment",
  },
  {
    name: "Beachfront",
    icon: "beach-access",
  },
  {
    name: "Countryside",
    icon: "nature-people",
  },
];

interface Props {
  onCategoryChanged: (category: string) => void;
}

const Page = ({ onCategoryChanged }: Props) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollRef = useRef<ScrollView>(null);
  const tabRef = useRef<Array<TouchableOpacity | null>>([]);
  const tabContentRef = useRef<Array<View | null>>([]);

  const selecteCategory = (index: number) => {
    setActiveIndex(index);

    tabContentRef.current[index]?.measureLayout(
      tabRef.current[index]!,
      (top, left, width, height) => {
        scrollRef.current?.scrollTo({ x: width * index, y: 0, animated: true });
      }
    );

    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    onCategoryChanged(categories[index].name);
  };

  return (
    <View style={styles.container}>
      <View style={styles.actionRow}>
        <Link href={"/(modals)/booking"} asChild>
          <TouchableOpacity style={styles.searchBtn}>
            <Ionicons name="search" size={24} />
            <View>
              <Text style={{ fontFamily: "mon-sb" }}>Where to?</Text>
              <Text style={{ color: Colors.grey, fontFamily: "mon" }}>
                Anywhere · Any week
              </Text>
            </View>
          </TouchableOpacity>
        </Link>
        <TouchableOpacity style={styles.filterBtn}>
          <Ionicons name="options-outline" size={24} />
        </TouchableOpacity>
      </View>
      <ScrollView
        ref={scrollRef}
        horizontal
        showsHorizontalScrollIndicator={false}
        scrollEventThrottle={16}
        contentContainerStyle={{ gap: 20, paddingHorizontal: 16 }}
      >
        {categories.map((item, index) => {
          const activeTintColor =
            activeIndex == index ? Colors.dark : Colors.grey;
          return (
            <TouchableOpacity
              ref={(el) => (tabRef.current[index] = el)}
              onPress={() => selecteCategory(index)}
              key={index}
            >
              <View
                ref={(el) => (tabContentRef.current[index] = el)}
                style={{
                  ...styles.categoriesBtn,
                  borderBottomWidth: activeIndex == index ? 2 : 0,
                }}
              >
                <MaterialIcons
                  name={item.icon}
                  size={24}
                  color={activeTintColor}
                />
                <Text
                  style={{
                    ...styles.categoryText,
                    color: activeTintColor,
                  }}
                >
                  {item.name}
                </Text>
              </View>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
};

export default Page;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    height: 210,
    paddingTop: 40,
    elevation: 2,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 8,
    shadowOffset: {
      width: 1,
      height: 10,
    },
  },
  actionRow: {
    flexDirection: "row",
    padding: 16,
    justifyContent: "space-between",
    alignItems: "center",
  },
  searchBtn: {
    backgroundColor: "#fff",
    flexDirection: "row",
    gap: 10,
    padding: 14,
    alignItems: "center",
    width: 270,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: "#c2c2c2",
    borderRadius: 30,
    elevation: 5,
    shadowColor: "#000",
    shadowOpacity: 0.12,
    shadowRadius: 8,
    shadowOffset: {
      width: 1,
      height: 1,
    },
  },
  filterBtn: {
    padding: 10,
    borderWidth: 1,
    borderColor: "#A2A0A2",
    borderRadius: 24,
  },
  categoryText: {
    fontSize: 14,
    fontFamily: "mon-sb",
    color: Colors.grey,
  },
  categoriesBtn: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingBottom: 8,
    borderBottomColor: Colors.dark,
  },
});
