import React, { useState, useEffect } from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import { BarCodeScanner } from "expo-barcode-scanner";

const AssigningScreen = ({ navigation }) => {
  const [hasPermission, setHasPermission] = useState(null);
  const [step, setStep] = useState("book");
  const [bookScannedData, setBookScannedData] = useState(null);
  const [userScannedData, setUserScannedData] = useState(null);

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  const handleBarCodeScanned = ({ type, data }) => {
    if (step === "book") {
      setBookScannedData(data);
    } else if (step === "user") {
      setUserScannedData(data);
      // Implementiraj logiku za zaduživanje koristeći bookScannedData i userScannedData
      // Resetuj stanja nakon zaduživanja
      // setBookScannedData(null);
      // setUserScannedData(null);
      // setStep("book");
    }
  };

  return (
    <View style={styles.container}>
      {hasPermission === null ? (
        <Text>Traženje dozvole za pristup kameri.</Text>
      ) : hasPermission === false ? (
        <Text>Nije dozvoljen pristup kameri.</Text>
      ) : (
        <View style={styles.scannerContainer}>
          {step === "book" && (
            <BarCodeScanner
              onBarCodeScanned={
                bookScannedData ? undefined : handleBarCodeScanned
              }
              style={styles.scanner}
            />
          )}
          {step === "user" && (
            <BarCodeScanner
              onBarCodeScanned={
                userScannedData ? undefined : handleBarCodeScanned
              }
              style={styles.scanner}
            />
          )}
          {bookScannedData && step == "book" && (
            <View style={styles.scannedDataContainer}>
              <Text>Barkod: {bookScannedData}</Text>
              <Button
                title={"Skenirajte ponovo"}
                onPress={() => {
                  setBookScannedData(null);
                  setStep("book");
                }}
              />
              <Button
                title={"Skenirajte barkod korisnika"}
                onPress={() => {
                  setUserScannedData(null);
                  setStep("user");
                }}
              />
            </View>
          )}
          {userScannedData && step == "user" && (
            <View style={styles.scannedDataContainer}>
              <Text>Barkod: {userScannedData}</Text>
              <Button
                title={"Skenirajte ponovo"}
                onPress={() => {
                  setUserScannedData(null);
                  setStep("user");
                }}
              />
              <Button
                title={"Skenirajte barkod knjige"}
                onPress={() => {
                  setBookScannedData(null);
                  setStep("book");
                }}
              />
            </View>
          )}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  scannerContainer: {
    flex: 1,
    width: "100%",
    aspectRatio: 1,
    overflow: "hidden",
  },
  scanner: {
    ...StyleSheet.absoluteFillObject,
  },
  scannedDataContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    padding: 20,
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    backgroundColor: "rgba(255, 255, 255, 0.8)",
  },
});

export default AssigningScreen;
