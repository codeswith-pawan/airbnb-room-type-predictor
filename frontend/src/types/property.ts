export const NEIGHBOURHOOD_GROUPS = [
  "Bronx",
  "Brooklyn",
  "Manhattan",
  "Queens",
  "Staten Island",
] as const;

export type NeighbourhoodGroup = (typeof NEIGHBOURHOOD_GROUPS)[number];

export const ROOM_TYPES = [
  "Entire home/apt",
  "Private room",
  "Shared room",
  "Hotel room",
] as const;

export type RoomType = (typeof ROOM_TYPES)[number];

// Raw form state — kept as strings so inputs can be empty/partial while typing.
export interface PropertyFormState {
  neighbourhood_group: NeighbourhoodGroup | "";
  neighbourhood: string;
  latitude: string;
  longitude: string;
  price: string;
  minimum_nights: string;
  number_of_reviews: string;
  reviews_per_month: string;
  calculated_host_listings_count: string;
  availability_365: string;
}

// Parsed, validated payload sent to the API — matches the FastAPI schema exactly.
export interface PredictRequest {
  neighbourhood_group: string;
  neighbourhood: string;
  latitude: number;
  longitude: number;
  price: number;
  minimum_nights: number;
  number_of_reviews: number;
  reviews_per_month: number;
  calculated_host_listings_count: number;
  availability_365: number;
}

export interface PredictResponse {
  prediction: RoomType | string;
}

export type FieldErrors = Partial<Record<keyof PropertyFormState, string>>;

export const EMPTY_FORM_STATE: PropertyFormState = {
  neighbourhood_group: "",
  neighbourhood: "",
  latitude: "",
  longitude: "",
  price: "",
  minimum_nights: "",
  number_of_reviews: "",
  reviews_per_month: "",
  calculated_host_listings_count: "",
  availability_365: "",
};
