#===============================================> Django
from django.views.decorators.csrf import csrf_exempt

#===============================================> Framework Import
from rest_framework.views import APIView
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated

#===============================================> Local Import
from backend.settings import STRIPE_SECRET_KEY

import stripe

from derleng.serializers import BasicPayment_methodSerializer, Payment_methodSerializer
stripe.api_key = STRIPE_SECRET_KEY

class Payment_methodAPIView(APIView):
    permission_classes = [IsAuthenticated]

    @csrf_exempt
    def post(self, request):
        try:
            request_data = request.data.copy()
            serializer = Payment_methodSerializer(data=request_data)
            serializer.is_valid(raise_exception=True)
            # serializer.save()
            return Response(BasicPayment_methodSerializer(data=serializer.data).data, status=status.HTTP_200_OK)
        except Exception as error:
            return Response({"error": error}, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
def test_payment(request):
    test_payment_intent = stripe.PaymentIntent.create(
        amount=1000, currency='pln', 
        payment_method_types=['card'],
        receipt_email='test@example.com')
    return Response(status=status.HTTP_200_OK, data=test_payment_intent)
        