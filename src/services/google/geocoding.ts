import axios from "axios";

const baseURL = "https://maps.googleapis.com/maps/api/geocode/json?address=";

interface GeocodingOutput {
  lat: number;
  lng: number;
}

export class GeocodingService {
  static async getGeocodingByAddress(
    address: String
  ): Promise<GeocodingOutput> {
    try {
      const googleKey = import.meta.env.VITE_GOOGLE_KEY;

      let geocoding = (
        await axios.get(
          `${baseURL}${address.replaceAll(" ", "+")}&key=${googleKey}`
        )
      ).data;

      let location = geocoding.results[0].geometry.location;

      return {
        lat: location.lat,
        lng: location.lng,
      };
    } catch (error) {
      console.log(">>> getGeocodingByAddress.error: ", error);
      throw error;
    }
  }
}
