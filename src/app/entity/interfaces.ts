export interface Forecast {
    city: City;
    cnt: number;
    cod: string;
    list: ForecastItem[];
    message: number;
}

export interface City {
    coord: Coordinates;
    country: string;
    id: number;
    name: string;
    population: number;
    sunrise: number;
    sunset: number;
    timezone: number;
}

export interface Coordinates {
    lat: number;
    lon: number;
}

export interface ForecastItem {
    clouds: Clouds;
    dt: number;
    dt_txt: string;
    main: MainData;
    pop: number;
    rain: Record<string, string>;
    sys: Record<string, string>;
    visibility: number;
    weather: Weather[];
    wind: Wind;
}

export interface Clouds {
    all: number;
}

export interface Wind {
    speed: number;
    deg: number;
    gust: number;
}

export interface MainData {
    feels_like: number;
    grnd_level: number;
    humidity: number;
    pressure: number;
    sea_level: number;
    temp: number;
    temp_kf: number;
    temp_max: number;
    temp_min: number;
}

export interface Weather {
    description: string;
    icon: string;
    id: number;
    main: string;
}