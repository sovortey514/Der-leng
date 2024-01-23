from django.urls import include, path

from derleng.views import PaymentView

from .views import ThumbnailView, PackageView, ReviewView, CategoryView

from rest_framework.routers import DefaultRouter

viewsetRouter = DefaultRouter()
viewsetRouter.register(r'packages', PackageView.PackageViewSet, basename='package')

urlpatterns = [
    path('', include(viewsetRouter.urls), name='viewset'),
    path('thumbnails' , ThumbnailView.ThumbnailAPIView.as_view() , name=''),
    path('thumbnails/<uuid:pk>' , ThumbnailView.ThumbnailAPIView.as_view() , name=''),
    path('category' , CategoryView.CategoryAPIView.as_view(), name=''),
    path('category/<uuid:pk>' , CategoryView.CategoryAPIView.as_view(), name=''),
    path('review' , ReviewView.ReviewAPIView.as_view(), name=''),
    path('review/<uuid:pk>' , ReviewView.ReviewAPIView.as_view(), name=''),
    path('test-payment/', PaymentView.test_payment, name="test_payment"),
]