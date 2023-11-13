FROM python:3.9

WORKDIR /code

RUN chown -R root:root /code

RUN chmod -R 777 /code

RUN mkdir -m 777 ./labeled 

RUN mkdir -m 777 ./unlabeled

COPY ./requirements.txt /code/requirements.txt

RUN apt-get update && apt-get install -y libgl1-mesa-glx

RUN pip install --no-cache-dir --upgrade -r /code/requirements.txt

COPY . /code/

CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
