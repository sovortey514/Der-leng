import os
import django
from django.core.management import call_command

# Set the Django settings module
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "backend.settings")

# Set up Django
django.setup()

# Flush the database
print("[...............................   Flushing database   ...............................]")
call_command("flush", "--noinput")
 
#  Apply datab  ase migrations
print("[...............................   Migrating database  ...............................] ")
call_command("migrate")

# Load initial data using loaddata command
print("[...............................   Seeding database    ...............................]" )
call_command("loaddata", "./database/latest_backup_data.json")
