from django.contrib.auth.models import User
from rest_framework import serializers
from .models import Portfolio, Platform

# Custom listing for display only

class PortfolioListing(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Portfolio
        fields = ('url', 'ticker', 'amount')

class UserListing(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = User
        fields = ('url', 'username')


# Actual serializers

class PlatformSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Platform
        fields = ('url', 'name', 'based')


class PortfolioSerializer(serializers.HyperlinkedModelSerializer):
    owner = UserListing(many=False, read_only=True)
    platform = serializers.HyperlinkedRelatedField(many=False, view_name='platform-detail', queryset=Platform.objects.all(), allow_null=True)

    class Meta:
        model = Portfolio
        fields = ('url', 'id', 'ticker', 'name', 'amount', 'platform', 'owner')


class UserSerializer(serializers.HyperlinkedModelSerializer):
    portfolio = PortfolioListing(many=True, read_only=True)

    class Meta:
        model = User
        fields = ('url', 'id', 'username', 'portfolio')
