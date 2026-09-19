import { useState } from "react";
import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";
import PredictionForm from "./components/PredictionForm";
import PredictionPanel, { type PredictionState } from "./components/PredictionPanel";
import StatsCards from "./components/StatsCards";
import HowItWorks from "./components/HowItWorks";
import ModelPipeline from "./components/ModelPipeline";
import Footer from "./components/Footer";
import { useApiStatus } from "./hooks/useApiStatus";
import { ApiError, predictRoomType } from "./api/predictRoomType";
import { EMPTY_FORM_STATE, type FieldErrors, type PropertyFormState } from "./types/property";
import { isFormValid, toPredictRequest, validateForm } from "./utils/validation";

export default function App() {
  const apiStatus = useApiStatus();
  const [form, setForm] = useState<PropertyFormState>(EMPTY_FORM_STATE);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [prediction, setPrediction] = useState<PredictionState>({ status: "idle" });

  function handleFieldChange<K extends keyof PropertyFormState>(key: K, value: PropertyFormState[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
    if (errors[key]) {
      setErrors((prev) => ({ ...prev, [key]: undefined }));
    }
  }

  async function handlePredict() {
    const validation = validateForm(form);
    if (Object.keys(validation).length > 0) {
      setErrors(validation);
      return;
    }

    setPrediction({ status: "loading" });

    try {
      const result = await predictRoomType(toPredictRequest(form));
      setPrediction({ status: "success", prediction: result.prediction });
    } catch (err) {
      const message =
        err instanceof ApiError
          ? err.message
          : err instanceof Error
          ? err.message
          : "Something went wrong while contacting the model.";
      setPrediction({ status: "error", message });
    }
  }

  function handleReset() {
    setForm(EMPTY_FORM_STATE);
    setErrors({});
    setPrediction({ status: "idle" });
  }

  return (
    <div className="min-h-screen bg-canvas">
      <Navbar status={apiStatus} />
      <HeroSection />

      <main className="mx-auto max-w-6xl px-6 pb-6">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-5 lg:gap-7 lg:items-start">
          <div className="lg:col-span-3">
            <PredictionForm form={form} errors={errors} onFieldChange={handleFieldChange} />
          </div>
          <div className="lg:col-span-2">
            <PredictionPanel
              state={prediction}
              canSubmit={isFormValid(form)}
              onPredict={handlePredict}
              onReset={handleReset}
            />
          </div>
        </div>

        <StatsCards prediction={prediction.status === "success" ? prediction.prediction : null} />
      </main>

      <HowItWorks />
      <ModelPipeline />
      <Footer />
    </div>
  );
}
