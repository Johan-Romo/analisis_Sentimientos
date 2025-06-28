import torch
import pickle
import pandas as pd
import openpyxl
from flask import Flask, request, jsonify
from flask_cors import CORS
from transformers import BertTokenizer, BertForSequenceClassification

app = Flask(__name__)
CORS(app)  # Permite la comunicación con el frontend

# Cargar el modelo y el tokenizador previamente guardados
print("Cargando el modelo y el tokenizador...")
with open("modelo_y_tokenizador.pkl", "rb") as f:
    model, tokenizer = pickle.load(f)
print("✅ Modelo y tokenizador cargados correctamente.")

# Configurar el dispositivo
device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
model.to(device)  # Mover el modelo al dispositivo
model.eval()  # Modo evaluación

# Función para predecir el sentimiento de un comentario
def predecir_sentimiento(comentario):
    inputs = tokenizer(comentario, truncation=True, padding=True, max_length=128, return_tensors="pt")
    inputs = {key: val.to(device) for key, val in inputs.items()}
    outputs = model(**inputs)
    probs = torch.nn.functional.softmax(outputs.logits, dim=-1)
    pred = torch.argmax(probs, dim=1).item()
    etiquetas = {0: "Negativo", 1: "Positivo", 2: "Neutro"}
    return etiquetas[pred]

@app.route("/clasificar", methods=["POST"])
def clasificar():
    if "file" not in request.files:
        return jsonify({"error": "No se encontró ningún archivo"}), 400

    file = request.files["file"]
    df = pd.read_excel(file)
    
    if "Comentario" not in df.columns:
        return jsonify({"error": "El archivo debe contener la columna 'Comentario'"}), 400

    df["Sentimiento"] = df["Comentario"].apply(predecir_sentimiento)
    result = df.to_dict(orient="records")
    return jsonify({"predicciones": result})

@app.route("/clasificar_comentario", methods=["POST"])
def clasificar_comentario():
    data = request.get_json()
    if not data or "comentario" not in data:
        return jsonify({"error": "Se requiere un campo 'comentario' en el cuerpo de la solicitud"}), 400

    comentario = data["comentario"]
    sentimiento = predecir_sentimiento(comentario)
    return jsonify({"comentario": comentario, "sentimiento": sentimiento})

if __name__ == "__main__":
    print("🚀 Iniciando servidor Flask en http://127.0.0.1:5000")
    app.run(debug=True)