import React, { useEffect, useState } from 'react';
import { View, Text, Button, Picker } from 'react-native';

export default function DashboardScreen({ navigation }) {
  const [data, setData] = useState({ temperature: null, humidity: null });
  const [selectedOption, setSelectedOption] = useState("temperature");

  useEffect(() => {
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=Franca,BR&appid=YOUR_API_KEY`)
      .then(response => response.json())
      .then(json => setData({
        temperature: json.main.temp,
        humidity: json.main.humidity
      }))
      .catch(error => console.error(error));
  }, []);

  return (
    <View>
      <Text>Temperatura: {data.temperature}°C</Text>
      <Text>Umidade: {data.humidity}%</Text>
      <Picker selectedValue={selectedOption} onValueChange={(itemValue) => setSelectedOption(itemValue)}>
        <Picker.Item label="Temperatura" value="temperature" />
        <Picker.Item label="Umidade" value="humidity" />
      </Picker>
      <Button
        title="Abrir Tela"
        onPress={() => {
          selectedOption === "temperature"
            ? navigation.navigate("Temperature")
            : navigation.navigate("Humidity");
        }}
      />
    </View>
  );
}
