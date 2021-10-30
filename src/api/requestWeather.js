import axios from "axios"

import { LINK_CURRENT_WEATHER, LINK_HISTORY_WEATHER, KEY } from "../constants"

export const  requestCurrentWeather = async (searchWord) => {
    try {
        return await axios.get(`${LINK_CURRENT_WEATHER}q=${searchWord}&appid=${KEY}`)
    } catch (error) {
        return error
    }
}

export const requestCurrentWeatherByGeo = async (lon,lat) => {
    try {
        return await axios.get(`${LINK_CURRENT_WEATHER}lon=${lon}&lat=${lat}&appid=${KEY}`)
    } catch (error) {
        return error
    }
}

export const requestHistoryWeather = async (lon, lat, dt) => {
    try {
        return await axios.get(`${LINK_HISTORY_WEATHER}lon=${lon}&lat=${lat}&dt=${dt}&appid=${KEY}`)
    } catch (error) {
        return error
    }
}