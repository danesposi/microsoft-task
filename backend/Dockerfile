FROM python:3.7-slim
COPY . /project
WORKDIR /project
RUN pip install -r requirements.txt
CMD python ./microsoft-task-drf/manage.py runserver 0.0.0.0:8000