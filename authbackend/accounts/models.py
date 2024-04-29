from django.db import models

# Create your models here.
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin, BaseUserManager

class UserAccountManager(BaseUserManager):
    # create normal user
    def create_user(self, email, name, password=None):
        if not email:
            raise ValueError("Email must be provided")
        # will turn Mileslemi to mileslemi
        email = self.normalize_email(email)
        user = self.model(email=email, name=name)
        
        # hash password using inbuilt django fn
        user.set_password(password)
        user.save()
        
        return user
    
    # create superuser
    # def create_superuser
    
        

class UserAccount(AbstractBaseUser, PermissionsMixin):
    email = models.EmailField(max_length=255, unique=True)
    name = models.CharField(max_length=255)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    
    objects = UserAccountManager()
    
    # change default login, normally its username
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['name'] #email is requred by default as you've set it above as USERNAME_FIELD
    
    def get_full_name(self):
        return self.name
    
    def get_short_name(self):
        return self.name
    
    def __str__(self):
        return self.email