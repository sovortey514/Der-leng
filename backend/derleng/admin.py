from django.contrib import admin

# Register your models here.

from django.contrib import admin
from .models import *

class UserAdmin(admin.ModelAdmin):
    list_display = ('id', 'username', 'fullname', 'email', 'Phone', 'last_login', 'is_active', 'created_at')
    search_fields = ('username', 'email', 'Phone')
    list_filter = ('is_active', 'created_at')

admin.site.register(User, UserAdmin)

class UserRoleAdmin(admin.ModelAdmin):
    list_display = ('id', 'name', 'description')
    search_fields = ('name', 'description')
    
admin.site.register(User_role, UserRoleAdmin)

class ProfilePictureAdmin(admin.ModelAdmin):
    list_display = ('id' , 'user_id' , 'type' , 'is_active' , 'created_at')
    list_filter = ('is_active', 'created_at' , 'type')

admin.site.register(Profile_picture , ProfilePictureAdmin)

class CategoryAdmin (admin.ModelAdmin):
    list_display = ('id' , 'name')
    search_fields=('name',)
    
admin.site.register(Category, CategoryAdmin)
    
class PackageAdmin (admin.ModelAdmin):
    list_display = ('id' , 'description' , 'user_id' , 'category_id', 'discount' , 'location_coordination' , 'video_url')
    search_fields = ( 'description' , )
admin.site.register(Package , PackageAdmin)

class PackageImageAdmin(admin.ModelAdmin):
    list_display = ('id' , 'package_id' , 'uri_image')
admin.site.register(Package_image , PackageImageAdmin)

class PackageScheduleAdmin(admin.ModelAdmin):
    list_display = ('id' , 'package_id' , 'destination' , 'start_time' , 'end_time')
    search_fields = ( 'destination' ,)
admin.site.register(Package_schedule , PackageScheduleAdmin)

class PackageServiceAdmin(admin.ModelAdmin):
    list_display = ('id' , 'name' , 'package_id' , 'price')
    search_fields = ('name',)
    list_filter = ( 'price' ,)
admin.site.register(package_service,PackageServiceAdmin)
    
    
class PaymentmethodAdmin(admin.ModelAdmin):
    list_display =('id' , 'type' , 'name' , 'number' , 'expire_date' , 'cvv')
    search_fields = ( 'name' , 'number')
    list_filter=('type' ,)

admin.site.register(Payment_method, PaymentmethodAdmin)

class CartAdmin(admin.ModelAdmin):
    list_display = ('id' , 'user_id' , 'service_id' , 'customer_ammount', 'booking_date' , 'created_at')
    list_filter = ('customer_ammount' , 'booking_date' , 'created_at')
    
admin.site.register(Cart , CartAdmin)

class BookingAdmin(admin.ModelAdmin):
    list_display = ('id' , 'cart_id' , 'is_accept' , 'created_at')
    list_filter = ('is_accept' , 'created_at')
    
admin.site.register(Booking , BookingAdmin)

class ReviewAdmin(admin.ModelAdmin):
    list_display=('id' ,'user_id' , 'package_id' , 'rating' , 'comment' , 'created_at')
    list_filter=('rating' , 'created_at')
admin.site.register(Review,ReviewAdmin)

class ThumbnailAdmin(admin.ModelAdmin):
    list_display = ( 'id' , 'name', 'uri_image' , 'order_number')
    search_fields = ( 'name' , 'order_number')
    
admin.site.register(Thumbnail, ThumbnailAdmin)
    


