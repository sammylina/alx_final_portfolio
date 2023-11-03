# Amharic hand-written character recognition

This is ALX final webstack portfolio project that can recognize Amharic hand-written characters using **Convolutional Neural Network** architecture, **Fast API** backend and **React** frontend.

> The ML model has **89%** accuracy on test dataset

![predict_amharic_char](https://github.com/sammylina/alx_final_portfolio/assets/88908872/e6668152-20b2-49b0-88c5-9986d539c8eb)

[Project Demo Video](https://www.youtube.com/watch?v=iKe9svemECw)

## Installation

Clone the project
```bash
git clone https://github.com/sammylina/alx_final_portfolio.git
```

Setup backend (FastAPI)
```bash
cd app  # This is backend of the application`
pip install -r requirements.txt
uvicorn main:app --reload
```

Setup Frontend (React)
```bash
cd web_app
npm install
npm run dev
```

You can see the application running on `localhost:5173`

Model training

> [CNN_Amharic](https://colab.research.google.com/drive/1duMPyR_KrsdVZCZRtHooNjF763NdfvYv?usp=sharing)

## Usage

Send a request using `curl`
```bash
curl {host}:{backend_port}/predict -X POST -F "req=@{path_to_img}.png"
```
Backend API response

![curl_response](https://github.com/sammylina/alx_final_portfolio/assets/88908872/74d02771-bc9b-42a4-bbdf-a33e64d4ddc3)


## 
