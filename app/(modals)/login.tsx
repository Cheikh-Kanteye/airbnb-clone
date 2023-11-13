import {
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { useWarmUpBrowser } from "@/hooks/useWarmUpBrowser";
import { defaultStyles } from "@/constants/styles";
import Colors from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import { GlyphMap } from "@expo/vector-icons/build/createIconSet";
import { useOAuth } from "@clerk/clerk-expo";
import { useRouter } from "expo-router";

enum Strategy {
  Google = "oauth_google",
  Apple = "oauth_apple",
  Facebook = "oauth_facebook",
}

type SigninMethodsType = {
  id: string;
  icon: keyof typeof Ionicons.glyphMap;
  method: "phone" | "apple" | "google" | "facebook";
  strategy?: Strategy;
};

const SinginMethods: SigninMethodsType[] = [
  {
    id: "001",
    icon: "call-outline",
    method: "phone",
  },
  {
    id: "002",
    icon: "md-logo-apple",
    method: "apple",
    strategy: Strategy.Apple,
  },
  {
    id: "003",
    icon: "md-logo-google",
    method: "google",
    strategy: Strategy.Google,
  },
  {
    id: "004",
    icon: "md-logo-facebook",
    method: "facebook",
    strategy: Strategy.Facebook,
  },
];

const Page = () => {
  useWarmUpBrowser();
  const router = useRouter();
  const { startOAuthFlow: googleAuth } = useOAuth({ strategy: "oauth_google" });
  const { startOAuthFlow: appleAuth } = useOAuth({ strategy: "oauth_apple" });
  const { startOAuthFlow: facebokkAuth } = useOAuth({
    strategy: "oauth_facebook",
  });

  const onSelectAuth = async (strategy: Strategy) => {
    const selectedAuth = {
      [Strategy.Google]: googleAuth,
      [Strategy.Apple]: appleAuth,
      [Strategy.Facebook]: facebokkAuth,
    }[strategy];

    try {
      const { createdSessionId, setActive } = await selectedAuth();
      if (createdSessionId) {
        setActive!({ session: createdSessionId });
        router.back();
      }
    } catch (err) {
      console.error("OAuth error: ", err);
    }
  };
  return (
    <View style={styles.container}>
      <TextInput
        autoCapitalize="none"
        placeholder="Email"
        style={defaultStyles.inputField}
      />
      <TouchableOpacity style={defaultStyles.btn}>
        <Text style={defaultStyles.btnText}>Continue</Text>
      </TouchableOpacity>
      <View style={styles.separatorView}>
        <View style={styles.line} />
        <Text style={styles.smallText}>Or</Text>
        <View style={styles.line} />
      </View>
      <View style={{ rowGap: 16 }}>
        {SinginMethods.map((item) => {
          return (
            <TouchableOpacity
              key={item.id + item.method}
              style={styles.btnOutline}
              onPress={() => {
                if (item.strategy) {
                  onSelectAuth(item.strategy);
                }
              }}
            >
              <Ionicons
                name={item.icon}
                size={24}
                style={defaultStyles.btnIcon}
              />
              <Text style={styles.btOutlineText}>
                Continue with {item.method}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

export default Page;

const styles = StyleSheet.create({
  container: {
    ...defaultStyles.container,
    padding: 26,
    rowGap: 30,
  },
  separatorView: {
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
  },
  line: {
    flex: 1,
    borderBottomColor: "#000",
    borderTopWidth: StyleSheet.hairlineWidth,
  },
  smallText: {
    fontFamily: "mon-sb",
    color: Colors.grey,
  },
  btnOutline: {
    backgroundColor: "transparent",
    borderWidth: 1,
    borderColor: Colors.grey,
    height: 50,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    paddingHorizontal: 10,
  },
  btOutlineText: {
    color: "#000",
    fontSize: 16,
    fontFamily: "mon-sb",
  },
});
