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
    path('categorys' , CategoryView.CategoryAPIView.as_view(), name=''),
    path('categorys/<uuid:pk>' , CategoryView.CategoryAPIView.as_view(), name=''),
    path('reviews' , ReviewView.ReviewAPIView.as_view(), name=''),
    path('reviews/<uuid:pk>' , ReviewView.ReviewAPIView.as_view(), name='review-detail'),
    path('test-payment/', PaymentView.test_payment, name="test_payment"),
]