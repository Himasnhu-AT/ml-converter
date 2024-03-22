interface MLModelConfiguration {
  model: {
    name: string;
    type: string;
  };
  dataset: {
    name: string;
    path: string;
    features: string[];
    target: string;
  };
  parameters: {
    algorithm: string;
    hyperparameters: {
      n_estimators: number;
      max_depth: number;
      min_samples_split: number;
    };
  };
  training: {
    test_size: number;
    random_state: number;
  };
  evaluation: {
    metrics: string[];
  };
}
