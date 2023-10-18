#!/usr/bin/env python
"""data_prep module
"""

import cv2
from torchvision import transforms
import torch
import os


class DataPrep:
    def __init__(self, valid_ext=['png']):
        self.valid_ext = valid_ext 
        self.transform = transforms.Compose([
            transforms.ToTensor(),
            transforms.Normalize((0.5, ), (0.5, ))
        ])
        self.save_labeled_dir = 'labeled'
        self.save_unlabeled_dir = 'unlabeled'

        if not os.path.exists(self.save_labeled_dir):
            os.makedirs(self.save_labeled_dir)
            print('directory created for labeled')
        if not os.path.exists(self.save_unlabeled_dir):
            os.makedirs(self.save_unlabeled_dir)
            print('directory created for unlabled')

    def valid_img(self, img_path):
        return img_path.split('.')[-1] in self.valid_ext

    def img_to_mnist(self, img):
        image = cv2.imdecode(img, cv2.IMREAD_GRAYSCALE)
        #_ ,image = cv2.threshold(image, 128, 0, cv2.THRESH_BINARY_INV)
        #image = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)

        cv2.imwrite('original.jpg', image)
        print('original image shpe: ', image.shape)

        size = min(image.shape)
        size = size if size >= 28 else 28
        resized_img = cv2.resize(image, (size, size), interpolation=cv2.INTER_LINEAR)
        resized_img = cv2.resize(resized_img, (28, 28), interpolation=cv2.INTER_LINEAR)


        cv2.imwrite('resized.jpg', resized_img)
        print("img shape: ", resized_img.shape)

        resized_img = cv2.bitwise_not(resized_img)

        return resized_img

    def transform_input(self, img):

        return self.transform(img)

    def store_img(self, img, acc, label):
        print('type of label: ', type(label), label)
        pth = f'{label:03}_img.png'
        print('path first time: ', pth)
        if acc > 0.9:
            pth = os.path.join(self.save_labeled_dir, pth)
        else:
            pth = os.path.join(self.save_unlabeled_dir, pth)

        image = cv2.imdecode(img, cv2.IMREAD_GRAYSCALE)
        try:
            cv2.imwrite(pth, image)
            print('IMage saved succesfuly, at', pth)
        except Exception as e:
            print("can't save or write image")
