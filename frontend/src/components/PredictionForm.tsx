import { NEIGHBOURHOOD_GROUPS, type FieldErrors, type PropertyFormState } from "../types/property";
import { NumberField, SelectField, TextField } from "./fields/FormFields";
import {
  IconCalendarCheck,
  IconCompass,
  IconDollar,
  IconMapPin,
  IconMoon,
  IconStar,
  IconTrendingUp,
  IconUsers,
} from "./icons";

interface PredictionFormProps {
  form: PropertyFormState;
  errors: FieldErrors;
  onFieldChange: <K extends keyof PropertyFormState>(key: K, value: PropertyFormState[K]) => void;
}

function SectionHeading({ children }: { children: string }) {
  return (
    <div className="mb-4 flex items-center gap-3">
      <h3 className="text-[12px] font-semibold uppercase tracking-[0.06em] text-ink-500">{children}</h3>
      <div className="h-px flex-1 bg-canvas-line" />
    </div>
  );
}

export default function PredictionForm({ form, errors, onFieldChange }: PredictionFormProps) {
  return (
    <section
      id="predict"
      className="animate-rise scroll-mt-24 rounded-xl3 border border-canvas-line bg-canvas-card p-6 shadow-panel sm:p-8"
    >
      <div className="mb-7">
        <h2 className="font-display text-[20px] font-semibold text-ink-950">Property Details</h2>
        <p className="mt-1 text-[13.5px] text-ink-500">Tell us about the Airbnb listing.</p>
      </div>

      <div className="space-y-8">
        <div>
          <SectionHeading>Location</SectionHeading>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <SelectField
              id="neighbourhood_group"
              label="Neighbourhood Group"
              icon={<IconMapPin />}
              value={form.neighbourhood_group}
              options={NEIGHBOURHOOD_GROUPS}
              placeholder="Select a borough"
              error={errors.neighbourhood_group}
              onChange={(v) => onFieldChange("neighbourhood_group", v as PropertyFormState["neighbourhood_group"])}
            />
            <TextField
              id="neighbourhood"
              label="Neighbourhood"
              icon={<IconCompass />}
              value={form.neighbourhood}
              placeholder="e.g. Williamsburg"
              error={errors.neighbourhood}
              onChange={(v) => onFieldChange("neighbourhood", v)}
            />
            <NumberField
              id="latitude"
              label="Latitude"
              icon={<IconMapPin />}
              value={form.latitude}
              step="0.00001"
              placeholder="40.71602"
              hint="Range: -90 to 90"
              error={errors.latitude}
              onChange={(v) => onFieldChange("latitude", v)}
            />
            <NumberField
              id="longitude"
              label="Longitude"
              icon={<IconMapPin />}
              value={form.longitude}
              step="0.00001"
              placeholder="-73.96248"
              hint="Range: -180 to 180"
              error={errors.longitude}
              onChange={(v) => onFieldChange("longitude", v)}
            />
          </div>
        </div>

        <div>
          <SectionHeading>Property</SectionHeading>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
            <NumberField
              id="price"
              label="Price per Night"
              icon={<IconDollar />}
              value={form.price}
              step="1"
              prefix="$"
              placeholder="130"
              error={errors.price}
              onChange={(v) => onFieldChange("price", v)}
            />
            <NumberField
              id="minimum_nights"
              label="Minimum Nights"
              icon={<IconMoon />}
              value={form.minimum_nights}
              step="1"
              suffix="nights"
              placeholder="2"
              error={errors.minimum_nights}
              onChange={(v) => onFieldChange("minimum_nights", v)}
            />
            <NumberField
              id="availability_365"
              label="Availability"
              icon={<IconCalendarCheck />}
              value={form.availability_365}
              step="1"
              suffix="days"
              placeholder="252"
              error={errors.availability_365}
              onChange={(v) => onFieldChange("availability_365", v)}
            />
          </div>
        </div>

        <div>
          <SectionHeading>Reviews &amp; Host</SectionHeading>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
            <NumberField
              id="number_of_reviews"
              label="Number of Reviews"
              icon={<IconStar />}
              value={form.number_of_reviews}
              step="1"
              placeholder="67"
              error={errors.number_of_reviews}
              onChange={(v) => onFieldChange("number_of_reviews", v)}
            />
            <NumberField
              id="reviews_per_month"
              label="Reviews per Month"
              icon={<IconTrendingUp />}
              value={form.reviews_per_month}
              step="0.01"
              placeholder="1.57"
              error={errors.reviews_per_month}
              onChange={(v) => onFieldChange("reviews_per_month", v)}
            />
            <NumberField
              id="calculated_host_listings_count"
              label="Host Listings Count"
              icon={<IconUsers />}
              value={form.calculated_host_listings_count}
              step="1"
              placeholder="3"
              error={errors.calculated_host_listings_count}
              onChange={(v) => onFieldChange("calculated_host_listings_count", v)}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
