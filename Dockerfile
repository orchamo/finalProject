FROM python:3.11.4-slim-bullseye

WORKDIR /back

COPY requirements.txt requirements.txt

RUN pip3 install -r requirements.txt

COPY ./back .

EXPOSE 8000

CMD [ "python", "manage.py", "runserver", "0.0.0.0:8000" ]


