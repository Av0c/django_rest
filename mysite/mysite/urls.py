from django.conf.urls import url, include
from rest_framework.urlpatterns import format_suffix_patterns
from portfolio import views


urlpatterns = format_suffix_patterns([
    url(r'^$', views.api_root),
    url(r'^users/current_user', views.CurrentUser.as_view(), name='current-user'),
    url(r'^portfolios/$', views.PortfolioList.as_view(), name='portfolio-list'),
    url(r'^portfolios/(?P<pk>[0-9]+)/$', views.PortfolioDetail.as_view(), name='portfolio-detail'),
    url(r'^users/$', views.UserList.as_view(), name='user-list'),
    url(r'^users/(?P<pk>[0-9]+)/$', views.UserDetail.as_view(), name='user-detail'),
    url(r'^platforms/$', views.PlatformList.as_view(), name='platform-list'),
    url(r'^platforms/(?P<pk>[0-9]+)/$', views.PlatformDetail.as_view(), name='platform-detail'),
    url(r'^api-auth/', include('rest_framework.urls')),
])
