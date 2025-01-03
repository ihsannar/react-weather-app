import React, { useState } from 'react';
import axios from 'axios';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState('');

  const fetchWeather = async () => {
    const apiKey = 'f75f7f9cfe5162a0619cda7f655e7574'; // OpenWeatherMap veya başka bir hava durumu API'si anahtarı
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    try {
      setError('');
      const response = await axios.get(apiUrl);
      setWeatherData(response.data);
    } catch (err) {
      setError('Şehir bulunamadı veya bir hata oluştu. Lütfen tekrar deneyin.');
      setWeatherData(null);
    }
  };

  const getBackgroundVideo = () => {
    if (!weatherData) return '/videos/default.mp4'; // Default video yolu
    const weatherCondition = weatherData.weather[0].main.toLowerCase();
    console.log('Weather condition:', weatherCondition); // Hangi değer döndüğünü görün
    if (weatherCondition.includes('rain')) return '/videos/yağmur.mp4';
    if (weatherCondition.includes('clear')) return '/videos/güneş.mp4';
    if (weatherCondition.includes('cloud')) return '/videos/bulutlu.mp4';
    if (weatherCondition.includes('snow')) return '/videos/kar.mp4';
    if (weatherCondition.includes('mist')) return '/videos/sis.mp4';
    if (weatherCondition.includes('fog')) return '/videos/sis.mp4';
    return '/videos/default.mp4';
  };
  
  

  return (
    <div className="app-container">
      <video
  autoPlay
  loop
  muted
  className="background-video"
  key={getBackgroundVideo()} // Video URL'sine göre yeniden yükleme sağlanır
>
  <source src={getBackgroundVideo()} type="video/mp4" />
  Your browser does not support the video tag.
</video>

      <div className="container py-4">
        <h1 className="text-center">Hava Durumu Uygulaması</h1>
        <div className="mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Şehir adı giriniz"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
        </div>
        <button className="btn btn-primary w-100" onClick={fetchWeather}>
          Hava Durumunu Getir
        </button>

        {error && <div className="alert alert-danger mt-3">{error}</div>}

        {weatherData && (
          <div className="weather-info mt-4">
            <h2 className="text-center">{weatherData.name}, {weatherData.sys.country}</h2>
            <p>Sıcaklık: {weatherData.main.temp} °C</p>
            <p>Nem: {weatherData.main.humidity} %</p>
            <p>Rüzgar Hızı: {weatherData.wind.speed} m/s</p>
            <p>Durum: {weatherData.weather[0].description}</p>
          </div>
        )}

        <button className="btn btn-secondary mt-3 w-100" onClick={() => alert('İhsan Nar, 2220780017.')}>
          Hakkında
        </button>
      </div>
    </div>
  );
};

export default App;
