#!/usr/bin/env python
"""App module
"""

from fastapi import FastAPI, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from data_prep import DataPrep
from torchvision import transforms
import numpy as np
import cv2
import torch
import os
import logging as logger

app = FastAPI()
prep = DataPrep(['png', 'jpg'])
from model import load_model, inference

origins = ['*']
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=['*'],
    allow_headers=['*']
)

checkpoint = 'best_model_89.pth'
classifier = load_model(checkpoint)
print(classifier)
mnist_img_path = 'mnist.png'

FORMAT = "%(img_name)s - %(char)s - %(label)s - %(acc)s"
log_file = f"{checkpoint.split('.')[0]}_output.log"
logger.basicConfig(filename=log_file, format=FORMAT, level=logger.INFO)

@app.get('/')
async def ping():
    return {'status': 'working'}

@app.post('/predict')
async def predict(req: UploadFile = File(...)):
    content = await req.read()

    np_array = np.frombuffer(content, np.uint8)

    img = prep.img_to_mnist(np_array)
    transformed_img = prep.transform(img)
    transforms.ToPILImage()(transformed_img).save(mnist_img_path)
    output = classifier(transformed_img)

    response = inference(output)
    p = response[0]
    
    prep.store_img(np_array, p['certainity'], p['label'])
    logger.info('msg', extra={'img_name': f'{p["label"]:03}_img.png', 'char': p['character'], 'label': p['label'], 'acc': p['certainity']})
        
    return {'res': response}
