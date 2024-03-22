import { RenderCode } from "./src/renderCode";
import { MLModelConfiguration } from "./types/mlconverter.types";

// longitude	latitude	housing_median_age	total_rooms	total_bedrooms	population	households	median_income	median_house_value
const mlModelConfiguration: MLModelConfiguration = {
  model: {
    name: "Example Model",
    type: "classification",
  },
  dataset: {
    name: "Example Dataset",
    path: "/content/sample_data/california_housing_train.csv",
    features: [
      "longitude",
      "latitude",
      "housing_median_age",
      "total_rooms",
      "total_bedrooms",
      "population",
      "households",
      "median_income",
      "median_house_value",
    ],
    target: "target_variable",
  },
  parameters: {
    algorithm: "RandomForestClassifier",
    hyperparameters: {
      n_estimators: 100,
      max_depth: 5,
      min_samples_split: 2,
    },
  },
  training: {
    test_size: 0.2,
    random_state: 42,
  },
  evaluation: {
    metrics: ["accuracy", "precision", "recall", "f1_score"],
  },
};

console.log(RenderCode(mlModelConfiguration));
