import React, { useState } from "react";
import { View, Text, TextInput, Pressable, StyleSheet } from "react-native";

function CityInfoScreen() {
  const [cityName, setCityName] = useState("");
  const [cityInfo, setCityInfo] = useState(null);
  const [searchError, setSearchError] = useState(null);

  const handleSearch = () => {
    // Appel de l'API
    fetch(`https://restcountries.com/v3.1/capital/${cityName}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Ville non trouvée");
        }
        return response.json();
      })
      .then((data) => {
        // La réponse de l'API est un tableau, nous prenons le premier élément
        const cityData = data[0];

        // Extraction des informations nécessaires
        const currency = cityData.currencies ? cityData.currencies.EUR : "";
        const officialName = cityData.name ? cityData.name.official : "";

        // Mise à jour de l'état avec les informations récupérées
        setCityInfo({
          name: cityName,
          currency: currency,
          officialName: officialName,
        });
        setSearchError(null); // Réinitialise l'état d'erreur
      })
      .catch((error) => {
        console.error(
          "Erreur lors de la récupération des informations de la ville",
          error
        );
        // Changement de l'état de l'erreur si aucune ville trouvée
        setSearchError("La ville n'existe pas ou n'est pas une capitale");
      });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>City Info</Text>

      <TextInput
        style={styles.input}
        placeholder="Entrez le nom d'une capitale"
        value={cityName}
        onChangeText={(text) => setCityName(text)}
      />

      <Pressable style={styles.button} onPress={handleSearch}>
        <Text style={styles.buttonText}>Rechercher</Text>
      </Pressable>

      {searchError && <Text style={styles.errorText}>{searchError}</Text>}

      {cityInfo && (
        <View style={styles.resultContainer}>
          <Text>Nom de la ville: {cityInfo.name}</Text>
          <Text>Monnaie: {cityInfo.currency?.name}</Text>
          <Text>Nom Officiel du Pays: {cityInfo.officialName}</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  header: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 16,
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 16,
    padding: 8,
    width: "100%",
  },
  button: {
    backgroundColor: "blue",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
  },
  resultContainer: {
    marginTop: 20,
  },
  errorText: {
    fontWeight: "bold",
    color: "red",
    marginTop: 10,
  },
});

export default CityInfoScreen;
