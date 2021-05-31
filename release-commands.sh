#!/bin/bash
python manage.py collectstatic --clear
python manage.py migrate
