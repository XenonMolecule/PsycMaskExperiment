import csv
from PIL import Image
import requests
from io import BytesIO
import numpy as np
import time
from pynput import keyboard
import psutil
import keras
from keras.models import load_model
from keras.preprocessing import image


START = 0
END = -1

model = load_model("./model_v6_23.hdf5")


def download_faces(start=START, end=END):
    print("Type (s) to save and (d) to delete and (q) to quit.  Always type enter afterwards.")
    with open('faceexp-comparison-data-train-public.csv') as csvfile:
        spamreader = csv.reader(csvfile)
        for i,row in enumerate(spamreader):
            if i < start:
                continue
            if i >= end and end != -1:
                break
            np_row = np.array(row[0:15])
            np_row = np_row.reshape((3,5))
            for data in np_row:
                response = requests.get(data[0])
                img = Image.open(BytesIO(response.content))
                img = img.crop((float(data[1]) * img.width,
                            float(data[3]) * img.height,
                            float(data[2]) * img.width,
                            float(data[4]) * img.height))
                print("Predicting emotion")
                time.sleep(0.01)
                predicted_class = np.argmax(model.predict(np.array(img)))
                print("DONE PREDICTING")
                print(predicted_class)
                if predicted_class != 3:
                    print(predicted_class)
                    break
                img.show()
                with keyboard.Events() as events:
                    for event in events:
                        if event.key == keyboard.Key.esc or event.key.char == 'q':
                            return
                        if event.key.char == 's':
                            print("SAVED")
                            break
                        if event.key.char == 'd':
                            break
                img.close()

download_faces()
