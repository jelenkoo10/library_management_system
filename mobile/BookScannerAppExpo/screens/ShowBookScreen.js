import React, { useState, useEffect } from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import { BarCodeScanner } from "expo-barcode-scanner";

const ShowBookScreen = ({ navigation }) => {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [scannedData, setScannedData] = useState(null);
  const [bookId, setBookId] = useState(null);

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  useEffect(() => {
    const showBook = async () => {
      try {
        const bookResponse = await fetch(
          `http://192.168.0.18:5000/api/books/barcode/${bookScannedData}`
        );
        const bookData = await bookResponse.json();
        console.log("Book Data:", bookData);

        setBookId(bookData.bookId);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    if (bookScannedData) {
      showBook();
    }
  }, [bookScannedData]);

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    setScannedData(data);
  };

  return (
    <View style={styles.container}>
      {hasPermission === null ? (
        <Text>Traženje dozvole za pristup kameri.</Text>
      ) : hasPermission === false ? (
        <Text>Nije dozvoljen pristup kameri.</Text>
      ) : (
        <View style={styles.scannerContainer}>
          <BarCodeScanner
            onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
            style={styles.scanner}
          />
          {scanned && (
            <View style={styles.scannedDataContainer}>
              <Text>Barkod: {scannedData}</Text>
              <Button
                title={"Skenirajte ponovo"}
                onPress={() => setScanned(false)}
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

export default ShowBookScreen;
