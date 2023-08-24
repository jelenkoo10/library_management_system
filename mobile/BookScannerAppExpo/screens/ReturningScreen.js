import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { BarCodeScanner } from "expo-barcode-scanner";

const ReturningScreen = ({ navigation }) => {
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

  useEffect(() => {
    const returnBook = async () => {
      try {
        const bookResponse = await fetch(
          `http://192.168.0.18:5000/api/books/barcode/${bookScannedData}`
        );
        const bookData = await bookResponse.json();
        console.log("Book Data:", bookData);

        const userResponse = await fetch(
          `http://192.168.0.18:5000/api/users/barcode/${userScannedData}`
        );
        const userData = await userResponse.json();
        console.log("User Data:", userData);

        setBookId(bookData.bookId);
        setUserId(userData.userId);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    if (bookScannedData && userScannedData) {
      returnBook();
    }
  }, [bookScannedData, userScannedData]);

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
              <TouchableOpacity
                style={styles.button}
                onPress={() => {
                  setBookScannedData(null);
                  setStep("book");
                }}
              >
                <Text style={styles.buttonText}>Skenirajte knjigu ponovo</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.button}
                onPress={() => {
                  setUserScannedData(null);
                  setStep("user");
                }}
              >
                <Text style={styles.buttonText}>
                  Skenirajte barkod korisnika
                </Text>
              </TouchableOpacity>
            </View>
          )}
          {userScannedData && step == "user" && (
            <View style={styles.scannedDataContainer}>
              <Text>Barkod: {userScannedData}</Text>
              <TouchableOpacity
                style={styles.button}
                onPress={() => {
                  setUserScannedData(null);
                  setStep("user");
                }}
              >
                <Text style={styles.buttonText}>
                  Skenirajte korisnika ponovo
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.button}
                onPress={() => {
                  setBookScannedData(null);
                  setUserScannedData(null);
                  setStep("book");
                }}
              >
                <Text style={styles.buttonText}>Skenirajte barkod knjige</Text>
              </TouchableOpacity>
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
  button: {
    backgroundColor: "#C75D2C",
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginVertical: 10,
    borderColor: "#D76D3C",
    borderWidth: 2,
    borderRadius: 3,
    borderStyle: "solid",
  },
  buttonText: {
    fontWeight: "bold",
    color: "#fff",
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

export default ReturningScreen;
