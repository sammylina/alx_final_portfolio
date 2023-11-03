# Amharic hand-written character recognition

This is ALX final webstack portfolio project that can recognize Amharic hand-written characters using **Convolutional Neural Network** architecture, **Fast API** backend and **React** frontend for easy use

> The ML model has **89%** accuracy on test dataset

![img](https://drive.google.com/file/d/1hpE2opLnsdBOLHzpadhnskCUkSnT7cYC/view?usp=drive_link)

[Project Demo](https://www.youtube.com/watch?v=iKe9svemECw)

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

## Usage

Send request using `curl`
```bash
curl localhost:{backend_port}/predict -X POST -F "req=@{path_to_img}.png"
```
Sample reponse
[](https://drive.google.com/file/d/1_EIgsTD4Wma8fplZNPW00OvECCrxdd6A/view?usp=drive_link)

## Contributing
