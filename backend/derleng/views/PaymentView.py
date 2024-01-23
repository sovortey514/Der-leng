from rest_framework.views import APIView
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from backend.settings import STRIPE_SECRET_KEY

import stripe
stripe.api_key = STRIPE_SECRET_KEY

# class PaymentView(APIView):
#     def post(self, request):
#         request_data = request.data.copy()

@api_view(['POST'])
def test_payment(request):
    test_payment_intent = stripe.PaymentIntent.create(
        amount=1000, currency='pln', 
        payment_method_types=['card'],
        receipt_email='test@example.com')
    return Response(status=status.HTTP_200_OK, data=test_payment_intent)
        