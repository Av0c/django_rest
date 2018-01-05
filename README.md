# CryptoCurrency Portfolio Manager

A Django project implementing the **REST_framework** that allows a group to share and manage their cryptocurrency trading portfolios.

## Getting Started

These instructions will (hopefully) get you up and running the project in no time :)

### Prerequisites

This project was developed with **[Django](https://docs.djangoproject.com/en/2.0/topics/install/#installing-official-release)** using the **[Django_REST_framework](http://www.django-rest-framework.org/tutorial/quickstart/)**. Make sure you have both installed.

Versions used for project:
- python==3.6.4
- djangorestframework==3.7.7
- Django==2.0.1

(Lower version will probably work but it's recommend to get the latest version)

```
pip install django
pip install djangorestframework
```

## Usage

Now it's time to run the project !

### Starting

Start the local server with the project

```
python manage.py runserver
```

### Users

There're currently 3 users:
- 'admin' (have extra privileges)
- 'dd'
- 'whale'

All users have the same password `password123`

You can easily create a new user using

```
python manage.py createsuperuser
```

### Concepts

There are 3 available tables:
- 'users'
- 'portfolios'
- 'platforms'

A user can see all portfolios of all users and can create portfolios of their own.
A user can only update, delete portfolios they own.

Each user can have multiple portfolios, on multiple platforms.

All available platforms are readable to all users but only writable to 'admin'.

The JSON data is hyperlinked, with which you can use to explore relationships between datas.

### Extras

Template and CSS-styling customizations are used, both can be found at:
- `mysite/templates/rest_framework/api.html`
- `mysite/mysite/static/custom.css`

For **Django** to be able to allow customizations, `settings.py` has been edited:
```
...
TEMPLATES = [
    {
        ...
        'DIRS': [os.path.join(BASE_DIR, 'templates')],
    },
]
STATIC_URL = '/static/'
STATICFILES_DIRS = (
    os.path.join(BASE_DIR, 'mysite/static'),
)
```

## About

This project was made as an school assignment at [VAMK](http://www.puv.fi/en/).

### Author

- **Quyen Duong** - [av0c](https://github.com/Av0c)


### Acknowledgments

Special thanks to..

* My teacher **Timo Kankaanpää** for introducing me to the framework - [timojkankaanpaa](https://github.com/timojkankaanpaa)https://github.com/timojkankaanpaa
* The [Django REST framework tutorial](http://www.django-rest-framework.org/tutorial/1-serialization/) whose typos forced me to figure things out for myself
* **Stackoverflow !**
* Deadlines.
