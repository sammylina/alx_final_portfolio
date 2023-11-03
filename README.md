# Amharic hand-written character recognition

This is ALX final webstack portfolio using that can recognize Amharic hand-written characters using **Convolutional Neural Network** architecture and **Fast API** backend and **React** frontend for easy use

> The model has 89% accuracy on test dataset

![Project Demo](https://www.youtube.com/watch?v=iKe9svemECw)

## Installation

Clone the project
> `git clone git@github.com:sammylina/alx_final_portfolio.git`
	> 
Setup backend (FastAPI)
>    `cd app  # This is backend of the application`
	>	`pip install -r requirements.txt`
	>   `uvicorn main:app --reload`

Setup Frontend (React)
>  `cd web_app`
	>  `npm install`
	> `npm run dev`
	> 
You can see the application running on `localhost:5173`

## Usage

Send request using `curl`
> `curl localhost:{backend_port}/predict -X POST -F "req=@{path_to_img}png"`  

## Contributing
