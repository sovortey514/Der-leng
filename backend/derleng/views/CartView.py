
# from django.views.decorators.csrf import csrf_exempt
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from derleng.models import Cart , Package_service
from derleng.serializers import CartSerializer
from rest_framework.permissions import IsAuthenticated


class CartAPIView(APIView):
    permission_classes = [IsAuthenticated]
    def post(self, request):
        try:
            # user = request.user  # Assuming you have authentication set up
            # service_id = Package_service.objects.get(id=id)
            # print(service_id)
            # customer_amount = request.data.get('customer_amount', 1)
            # booking_date = request.data.get('booking_date')
            data = request.data.copy()
            print(data)
            # data['user'] = user.id
            # serializers = CartSerializer(data=data)
            # serializers.is_valid(raise_exception=True)
            # serializers.save()
            
            # Get the service
            # service = Cart.objects.get(id=service_id)

            # # Create a new item in the cart
            # cart_item = Cart.objects.create(
            #     user=user,
            #     service=service,
            #     customer_amount=customer_amount,
            #     booking_date=booking_date
            # )

            # Return a response with the added item details
            # serializer = CartSerializer(cart_item)
            response_data = {
                'message': 'Item added to cart successfully.',
                # 'cart_item_data': serializers.data
            }
            return Response(response_data, status=status.HTTP_200_OK)
        except Exception:
            return Response({'error': 'Service not found'}, status=status.HTTP_404_NOT_FOUND)
