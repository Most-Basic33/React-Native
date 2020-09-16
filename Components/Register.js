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

const { EXPO_SERVER_HOST, EXPO_SERVER_PORT } = process.env;

export default function Register({ navigation }) {
  let url = `http://${EXPO_SERVER_HOST}:${EXPO_SERVER_PORT}/api/`;

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  console.log(email, "email");
  console.log(password, "password");

  useEffect(() => {}, []);

  const register = () => {
    console.log("attempting to register user at url:", url);
    let body = { email, password };
    // console.log(body)
    axios
      .post(`${url}/register`, body)
      .then(() => {
        navigation.navigate("Landing");
        console.log("done");
      })
      .catch((err) => {
        console.log(err, "written error");
      });
  };
  return (
    <View style={styles.container}>
      <Text
        style={{ fontSize: 20, paddingBottom: 20 }}
        onPress={() => navigation.navigate("Login")}
      >
        Click To Login
      </Text>

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
          <Button title="Register" onPress={register} />
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
});
