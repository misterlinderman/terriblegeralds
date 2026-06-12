import zipcodes from 'zipcodes';

/** 4924 Grant St, Omaha, NE 68104 */
const DEFAULT_ORIGIN = {
  latitude: 41.2876,
  longitude: -96.0458,
};

const DEFAULT_MAX_DISTANCE_MILES = 40;

const EARTH_RADIUS_MILES = 3958.8;

function toRadians(degrees: number): number {
  return (degrees * Math.PI) / 180;
}

function haversineDistanceMiles(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number {
  const dLat = toRadians(lat2 - lat1);
  const dLon = toRadians(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRadians(lat1)) * Math.cos(toRadians(lat2)) * Math.sin(dLon / 2) ** 2;
  return EARTH_RADIUS_MILES * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

function getOrigin() {
  const latitude = Number(process.env.CATERING_ORIGIN_LAT ?? DEFAULT_ORIGIN.latitude);
  const longitude = Number(process.env.CATERING_ORIGIN_LNG ?? DEFAULT_ORIGIN.longitude);

  if (Number.isNaN(latitude) || Number.isNaN(longitude)) {
    return DEFAULT_ORIGIN;
  }

  return { latitude, longitude };
}

function getMaxDistanceMiles(): number {
  const configured = Number(process.env.CATERING_MAX_DISTANCE_MILES ?? DEFAULT_MAX_DISTANCE_MILES);
  return Number.isNaN(configured) ? DEFAULT_MAX_DISTANCE_MILES : configured;
}

export function normalizeZipCode(value: string): string {
  const digits = value.replace(/\D/g, '');
  if (digits.length === 9) {
    return digits.slice(0, 5);
  }
  return digits;
}

export function isValidUsZipFormat(zip: string): boolean {
  return /^\d{5}$/.test(normalizeZipCode(zip));
}

export interface ZipRadiusResult {
  valid: boolean;
  distanceMiles?: number;
  message?: string;
}

export function checkZipWithinTravelRadius(zipInput: string): ZipRadiusResult {
  const zip = normalizeZipCode(zipInput);

  if (!/^\d{5}$/.test(zip)) {
    return {
      valid: false,
      message: 'Please enter a valid 5-digit US zip code.',
    };
  }

  const location = zipcodes.lookup(zip);
  if (!location) {
    return {
      valid: false,
      message: 'We could not find that zip code. Please double-check it and try again.',
    };
  }

  const origin = getOrigin();
  const distanceMiles = haversineDistanceMiles(
    origin.latitude,
    origin.longitude,
    location.latitude,
    location.longitude
  );
  const maxDistanceMiles = getMaxDistanceMiles();

  if (distanceMiles > maxDistanceMiles) {
    return {
      valid: false,
      distanceMiles: Math.round(distanceMiles),
      message: `Sorry, we can only travel within ${maxDistanceMiles} miles of Omaha. Your event zip code is about ${Math.round(distanceMiles)} miles away.`,
    };
  }

  return {
    valid: true,
    distanceMiles: Math.round(distanceMiles * 10) / 10,
  };
}
