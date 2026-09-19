import type { FieldErrors, PredictRequest, PropertyFormState } from "../types/property";

interface NumericRule {
  key: keyof PropertyFormState;
  label: string;
  min?: number;
  max?: number;
  integer?: boolean;
}

const NUMERIC_RULES: NumericRule[] = [
  { key: "latitude", label: "Latitude", min: -90, max: 90 },
  { key: "longitude", label: "Longitude", min: -180, max: 180 },
  { key: "price", label: "Price", min: 0, max: 100000 },
  { key: "minimum_nights", label: "Minimum nights", min: 1, max: 365, integer: true },
  { key: "number_of_reviews", label: "Number of reviews", min: 0, max: 100000, integer: true },
  { key: "reviews_per_month", label: "Reviews per month", min: 0, max: 100 },
  {
    key: "calculated_host_listings_count",
    label: "Host listings count",
    min: 0,
    max: 5000,
    integer: true,
  },
  { key: "availability_365", label: "Availability", min: 0, max: 365, integer: true },
];

export function validateForm(form: PropertyFormState): FieldErrors {
  const errors: FieldErrors = {};

  if (!form.neighbourhood_group) {
    errors.neighbourhood_group = "Select a borough.";
  }

  if (!form.neighbourhood.trim()) {
    errors.neighbourhood = "Enter a neighbourhood.";
  } else if (form.neighbourhood.trim().length < 2) {
    errors.neighbourhood = "Neighbourhood name is too short.";
  }

  for (const rule of NUMERIC_RULES) {
    const raw = form[rule.key];
    if (raw.trim() === "") {
      errors[rule.key] = `Enter ${rule.label.toLowerCase()}.`;
      continue;
    }

    const value = Number(raw);
    if (Number.isNaN(value)) {
      errors[rule.key] = `${rule.label} must be a number.`;
      continue;
    }

    if (rule.integer && !Number.isInteger(value)) {
      errors[rule.key] = `${rule.label} must be a whole number.`;
      continue;
    }

    if (rule.min !== undefined && value < rule.min) {
      errors[rule.key] = `${rule.label} must be at least ${rule.min}.`;
      continue;
    }

    if (rule.max !== undefined && value > rule.max) {
      errors[rule.key] = `${rule.label} must be at most ${rule.max}.`;
    }
  }

  return errors;
}

export function isFormValid(form: PropertyFormState): boolean {
  return Object.keys(validateForm(form)).length === 0;
}

export function toPredictRequest(form: PropertyFormState): PredictRequest {
  return {
    neighbourhood_group: form.neighbourhood_group,
    neighbourhood: form.neighbourhood.trim(),
    latitude: Number(form.latitude),
    longitude: Number(form.longitude),
    price: Number(form.price),
    minimum_nights: Number(form.minimum_nights),
    number_of_reviews: Number(form.number_of_reviews),
    reviews_per_month: Number(form.reviews_per_month),
    calculated_host_listings_count: Number(form.calculated_host_listings_count),
    availability_365: Number(form.availability_365),
  };
}
