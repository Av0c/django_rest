from django.http import Http404
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework.reverse import reverse
from rest_framework import viewsets, status, generics, permissions
from .permissions import IsOwnerOrReadOnly, IsAdminOrReadOnly


from django.contrib.auth.models import User
from .models import Portfolio, Platform
from .serializers import PortfolioSerializer, PlatformSerializer, UserSerializer


@api_view(['GET'])
def api_root(request, format=None):
    return Response({
        'users': reverse('user-list', request=request, format=format),
        'portfolios': reverse('portfolio-list', request=request, format=format),
        'platforms': reverse('platform-list', request=request, format=format),
    })


class PlatformList(generics.ListCreateAPIView):
    """
    List all trading platforms (Only 'admin' can add a new one).
    """
    queryset = Platform.objects.all()
    serializer_class = PlatformSerializer
    permission_classes = (permissions.IsAuthenticatedOrReadOnly, IsAdminOrReadOnly,)


class PlatformDetail(generics.RetrieveUpdateDestroyAPIView):
    """
    Retrieve a platform (Only 'admin' can update or delete).
    """
    queryset = Platform.objects.all()
    serializer_class = PlatformSerializer
    permission_classes = (permissions.IsAuthenticatedOrReadOnly, IsAdminOrReadOnly,)


class PortfolioList(generics.ListCreateAPIView):
    """
    List all portfolios, or create a new one.
    """
    queryset = Portfolio.objects.all()
    serializer_class = PortfolioSerializer
    permission_classes = (permissions.IsAuthenticatedOrReadOnly, IsOwnerOrReadOnly,)
    # Redefine the create() method of our serializer to pass an additional 'owner' field, along with the validated data from the request.
    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)


class PortfolioDetail(generics.RetrieveUpdateDestroyAPIView):
    """
    Retrieve, update or delete a portfolio.
    """
    queryset = Portfolio.objects.all()
    serializer_class = PortfolioSerializer
    permission_classes = (permissions.IsAuthenticatedOrReadOnly, IsOwnerOrReadOnly,)


class UserList(generics.ListAPIView):
    """
    List all users.
    """
    queryset = User.objects.all()
    serializer_class = UserSerializer


class UserDetail(generics.RetrieveAPIView):
    """
    Retrieve a user.
    """
    queryset = User.objects.all()
    serializer_class = UserSerializer
