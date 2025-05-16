#!/usr/bin/env bash
# Exit on error
set -o errexit

# Modify this line as needed for your package manager (pip, poetry, etc.)
pip install -r requirements.txt

# Convert static asset files
python manage.py collectstatic --no-input

# Apply any outstanding database migrations
python manage.py migrate

if [ -z "$DJANGO_SUPERUSER_PASSWORD" ]; then
  echo "Error: DJANGO_SUPERUSER_PASSWORD is not set."
  exit 1
fi

python manage.py shell -c "
from django.contrib.auth import get_user_model;
User = get_user_model();
username = 'ticoucke';
email = 'coucketimon@gmail.com';
password = '$DJANGO_SUPERUSER_PASSWORD';
if not User.objects.filter(username=username).exists():
    User.objects.create_superuser(username=username, email=email, password=password);
    print(f'Superuser \"{username}\" created.');
else:
    print(f'Superuser \"{username}\" already exists.');
"