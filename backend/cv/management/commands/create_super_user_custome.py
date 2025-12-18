from django.core.management.base import BaseCommand
from django.contrib.auth import get_user_model

class Command(BaseCommand):
    help = 'Creates a superuser non-interactively if it does not exist'

    def handle(self, *args, **options):
        User = get_user_model()  # Get the custom user model
        if not User.objects.filter(username='ramin').exists():
            User.objects.create_superuser('ramin', 'ramin76yazdani@example.com', '1090')
            self.stdout.write(self.style.SUCCESS('Successfully created a new superuser'))
        else:
            self.stdout.write(self.style.WARNING('Superuser already exists.'))
