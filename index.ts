const mlModelConfiguration: MLModelConfiguration = {
  model: {
    name: "Example Model",
    type: "classification",
  },
  dataset: {
    name: "Example Dataset",
    path: "/path/to/dataset.csv",
    features: ["feature1", "feature2", "feature3"],
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
