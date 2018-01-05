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
- `mysite/templates/rest_framework`
- `mysite/mysite/static`

## Deployment

Add additional notes about how to deploy this on a live system

## Built With

* [Dropwizard](http://www.dropwizard.io/1.0.2/docs/) - The web framework used
* [Maven](https://maven.apache.org/) - Dependency Management
* [ROME](https://rometools.github.io/rome/) - Used to generate RSS Feeds

## Contributing

Please read [CONTRIBUTING.md](https://gist.github.com/PurpleBooth/b24679402957c63ec426) for details on our code of conduct, and the process for submitting pull requests to us.

## Versioning

We use [SemVer](http://semver.org/) for versioning. For the versions available, see the [tags on this repository](https://github.com/your/project/tags).

## Authors

* **Billie Thompson** - *Initial work* - [PurpleBooth](https://github.com/PurpleBooth)

See also the list of [contributors](https://github.com/your/project/contributors) who participated in this project.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

## Acknowledgments

* Hat tip to anyone who's code was used
* Inspiration
* etc
