from django.contrib.auth import get_user_model
from django.core.exceptions import ValidationError

import re

User = get_user_model()

def is_valid_email(email):
    regex = r'\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,7}\b'
    if(re.fullmatch(regex, email)):
        return True
    return False

def is_valid_password(password):
    if len(password) < 8:
        return False
    
    if not re.search(r"[a-zA-Z]", password):
        return False
    
    if not re.search(r"[\d]", password):
        return False
    
    return True

def is_valid_username(username):
    # Use a regular expression to check if the username contains only letters, digits, and underscores
    # ^ and $ ensure that the entire string matches the pattern
    if re.match("^[a-zA-Z0-9_]+$", username):
        return True
    else:
        return False

def user_validation(data):
    username = data['username'].strip()
    email = data['email'].strip()
    password = data['password'].strip()

    errors = {}

    if not username or User.objects.filter(username=username).exists():
        errors['username'] = ['This username already token. Please choose another one.']

    if not is_valid_password(password):
        errors['password'] = ['Your password must be at least 8 charectors long, one letter and one digit.']
    
    if not is_valid_email(email):
        errors['email'] = ['Please provide a valid email address']

    if errors:
        raise ValidationError(errors)
    
    return data
    