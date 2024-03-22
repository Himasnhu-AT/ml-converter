import { MLModelConfiguration } from "../types/mlconverter.types";

export const RenderCode = (JSONData: MLModelConfiguration) => {
  const { model, dataset, parameters, training, evaluation } = JSONData;
  const { name, type } = model;
  const { name: datasetName, path, features, target } = dataset;
  const { algorithm, hyperparameters } = parameters;
  const { test_size, random_state } = training;
  const { metrics } = evaluation;

  const initializationMlModel = `
  # Import necessary libraries
  from sklearn.ensemble import ${algorithm}
  from sklearn.model_selection import train_test_split
  from sklearn.metrics import ${metrics.join(", ")}
  import pandas as pd
  
  # Load the dataset
  dataset = pd.read_csv("${path}")
  
  # Split dataset into features and target variable
  X = dataset[${JSON.stringify(features)}]
  y = dataset["${target}"]
  `;

  const getTrainAndTestSplit = `
  # Split dataset into training and testing sets
  X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=${test_size}, random_state=${random_state})
  `;

  // ? EXPECTED: model = RandomForestClassifier(n_estimators=100, max_depth=5, min_samples_split=2)
  // ! GETTING:  model = RandomForestClassifier({n_estimators:100,max_depth:5,min_samples_split:2})
  const trainModel = `
  # Initialize and train the model
  model = ${algorithm}(${JSON.stringify(hyperparameters).replace(/"/g, "")})
  model.fit(X_train, y_train)
  `;

  // ? Expected accuracy = metrics.accuracy_score(y_test, y_pred)
  // ? Expected precision = metrics.precision_score(y_test, y_pred, average='micro')
  // ? Expected recall = metrics.recall_score(y_test, y_pred, average='micro')
  // ? Expected f1_score = metrics.f1_score(y_test, y_pred, average='micro')
  // TODO Also return all these stats
  // ! Getting accuracy = metrics.accuracy(y_test, y_pred)
  // ! Getting precision = precision(y_test, y_pred)
  // ! Getting recall = recall(y_test, y_pred)
  // ! Getting f1_score = f1_score(y_test, y_pred)
  const evaluateModel = `
  # Make predictions on the test set
  y_pred = model.predict(X_test)
  
  # Evaluate the model
  ${metrics
    .map((metric) => {
      return `${metric} = ${metric}(y_test, y_pred)`;
    })
    .join("\n")}
  `;

  const saveModel = `
  # Save the model
  import joblib
  joblib.dump(model, '${name}_model.pkl')
  `;

  const loadModel = `
  # Load the model
  loaded_model = joblib.load('${name}_model.pkl')
  `;

  const predictModel = `
  # Make predictions using the loaded model
  # Assuming you have new data stored in 'new_data.csv'
  new_data = pd.read_csv("new_data.csv")
  predictions = loaded_model.predict(new_data)
  `;

  const fileContent = `
  ${initializationMlModel}
  ${getTrainAndTestSplit}
  ${trainModel}
  ${evaluateModel}
  ${saveModel}
  ${loadModel}
  ${predictModel}
  `;

  return fileContent;
};
