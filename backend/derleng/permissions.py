
from rest_framework.permissions import BasePermission

SAFE_METHODS = ("GET", "HEAD", "OPTIONS")

def is_admin(self, request):
    return bool( request.user and request.user.is_authenticated and request.user.role.name == "admin" )

def is_staff(self, request):
    return bool( request.user and request.user.is_authenticated and request.user.role.name == "staff" )

def is_tour_guide(self, request):
    return bool( request.user and request.user.is_authenticated and request.user.role.name == "tour_guide" )

class Is_Admin_Or_Staff_Or_TourGuide_Or_ReadOnly(BasePermission):
    def has_permission(self, request, view):
        return bool(
            request.method in SAFE_METHODS or
            is_admin or is_staff or is_tour_guide
        )