from rest_framework import serializers
from .models import User
from rest_framework.validators import ValidationError


class SignupSerializer(serializers.ModelSerializer):
    email = serializers.EmailField(max_length=80)
    username = serializers.CharField(max_length=45)
    fullname = serializers.CharField(max_length=250)
    password = serializers.CharField(write_only=True)
    confirm_password = serializers.CharField(style={'input_type': 'password'}, write_only=True) # confirm_password added to the serializer, marked as write_only to prevent it from being included in responses.

    class Meta:
        model = User 
        fields = ['email', 'username', 'fullname', 'password', 'confirm_password', 'profile_picture']
        # extra_kwargs = {
        # 'password': {'write_only': True}
        # }

    
    def validate(self, attrs):
        email_exists = User.objects.filter(email=attrs['email']).exists()
        username_exists = User.objects.filter(username=attrs['username']).exists()

        if email_exists:
            raise ValidationError('Email has already been used.')
        
        if username_exists:
            raise ValidationError('Username has already been used.')

        if attrs['password'] != attrs['confirm_password']:
            raise ValidationError("Passwords do not match.")
        
        
        return super().validate(attrs)
    

    def create(self, validated_data):
        validated_data.pop('confirm_password') # remove the confirm_password so that it does not interfare with the model creation since the model does not have the confirm_password field. 
        password = validated_data.pop('password')

        user = super().create(validated_data)

        user.set_password(password)

        user.save()

        return user 
    


class LogoutSerializer(serializers.Serializer):
    refresh = serializers.CharField(required=True)