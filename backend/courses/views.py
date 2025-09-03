"""
===========================================================
libs
===========================================================
 - standard user and group from django libs
 - Serializers (django rest framework)
 - ViewSets (django rest framework)
"""
from django.contrib.auth.models import Group, User
from rest_framework import permissions, viewsets
from .models import Course, Video, Chapter, OTP
from .serializers import CourseSerializer, VideoSerializer, ChapterSerializer, OTPSerializer

class CourseViewSet(viewsets.ModelViewSet):
    """
    Endpoint for Courses
    """
    queryset = Course.objects.all().order_by('-title')
    serializer_class = CourseSerializer
    permission_classes = [permissions.IsAuthenticated]

class VideoViewSet(viewsets.ModelViewSet):
    """
    Endpoint for Courses
    """
    queryset = Video.objects.all().order_by('-title')
    serializer_class = VideoSerializer
    permission_classes = [permissions.IsAuthenticated]

class ChapterViewSet(viewsets.ModelViewSet):
    """
    Endpoint for Courses
    """
    queryset = Chapter.objects.all().order_by('-title')
    serializer_class = ChapterSerializer
    permission_classes = [permissions.IsAuthenticated]
