FROM python:3.12-alpine

RUN mkdir -p /home/app
WORKDIR /home/app
COPY . /home/app
RUN pip install -r requirements.txt
RUN export FLASK_APP=app.py

EXPOSE 5000

CMD ["python", "-u", "app.py"]