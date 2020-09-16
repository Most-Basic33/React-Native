import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  requireNativeComponent,
} from "react-native";
import axios from "axios";
import * as LocalAuthentication from "expo-local-authentication";

import Constants from "expo-constants";

// let url = "";
let url = `http://${Constants.manifest.extra.SERVER_HOST}:${Constants.manifest.extra.SERVER_PORT}/api`;
export default function Login({ navigation }) {
  console.log("LOGIN URL", url);
  console.log("extra", Constants.manifest.extra);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  console.log(email, "email");
  console.log(password, "password");

  useEffect(() => {}, []);

  const login = () => {
    console.log("login requested");
    let body = { email, password };

    axios
      .post(`${url}/login`, body)
      .then(() => {
        navigation.navigate("Video");
      })
      .catch((err) => {
        console.log(err.request.response, "errors pimp");
      });
  };

  return (
    <View style={styles.container}>
      <Text onPress={() => navigation.navigate("Register")}>
        Click To Register
      </Text>
      <Text></Text>
      <View style={styles.login_parent}>
        <View style={styles.login_child}>
          <TextInput
            clearButtonMode="always"
            style={styles.textInput}
            value={email}
            onChangeText={(text) => setEmail(text)}
          />
          <TextInput
            value={password}
            onChangeText={(text) => setPassword(text)}
            textContentType="password"
            style={styles.textInput}
          />
        </View>
        <View style={styles.butt}>
          <Button
            title="Login"
            onPress={() => {
              login();
            }}
          />
          <Button
            style={styles.butt}
            onPress={() =>
              LocalAuthentication.authenticateAsync()
                ? navigation.navigate("Video")
                : navigation.navigate("Login")
            }
            title="Use BioMetrics"
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  login_parent: {},
  login_child: {},
  textInput: {
    padding: 10,
    borderWidth: 3,
    margin: 5,
    fontSize: 20,
    height: 50,
    width: 200,
    borderColor: "#bbb",
  },
  butt: {
    alignContent: "center",
    height: 100,
    width: 200,
    justifyContent: "space-between",
  },
});
