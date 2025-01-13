# configuring the django backend
take clone and make the following changes in testcase folder that has django app
create .env file in testcase project where you have your settings.py file
open .env file and add below line
OPENAI_API_KEY=<add your openai api key here>

#to install dependencies for django-python
create virtual environment [python -m venv venv]
activate the virtual environment [venv\Scripts\activate]
run the requirements file where you have all dependencies[pip install -r requirements.txt]

to start the python server [python manage.py runserver]

# configuring react frontend
install NodeJs in your system
make the following changes in reactapp folder
run npm install axios

start the reactapp using [npm start]
