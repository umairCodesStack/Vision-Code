from rest_framework import viewsets, status, generics
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework_simplejwt.tokens import RefreshToken

from django.contrib.auth import get_user_model
from .serializers import UserSerializer, UserProfileSerializer
from .auth_serializers import SignupSerializer

User = get_user_model()

class SignupView(generics.CreateAPIView):
    serializer_class = SignupSerializer
    permission_classes = [AllowAny]


@api_view(["POST"])
@permission_classes([AllowAny])
def login_and_get_tokens(request):
    """
    Optional: you can use SimpleJWT views instead of custom.
    For simplicity we will just call token obtain from SimpleJWT in urls.
    """
    return Response({"detail": "Use /api/token/ to obtain tokens"}, status=400)


class UserViewSet(viewsets.ReadOnlyModelViewSet):
    """
    Admin-use or public user listing (read-only).
    """
    queryset = User.objects.all().order_by("id")
    serializer_class = UserSerializer
