FROM python:3

ENV PYTHONUNBUFFERED=1
WORKDIR /code

COPY requirements.txt /code/

RUN apt-get update &&\
    apt-get install -y binutils libproj-dev gdal-bin libgdal-dev
RUN apt-get install -y python3-gdal
RUN pip install -r requirements.txt

COPY . /code/