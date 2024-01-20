from django.urls import include, path

from .views import ThumbnailView, PackageView

from rest_framework.routers import DefaultRouter

viewsetRouter = DefaultRouter()
viewsetRouter.register(r'packages', PackageView.PackageViewSet, basename='package')

urlpatterns = [
    path('', include(viewsetRouter.urls), name='viewset'),
    path('thumbnails' , ThumbnailView.ThumbnailAPIView.as_view() , name=''),
    path('thumbnails/<uuid:pk>' , ThumbnailView.ThumbnailAPIView.as_view() , name=''),
    path('category' , ThumbnailView.CategoryAPIView.as_view(), name=''),
    path('category/<uuid:pk>' , ThumbnailView.CategoryAPIView.as_view(), name=''),
]