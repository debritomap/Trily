"""
===========================================================
libs
===========================================================
 - standard user and group from django libs
 - Serializers (django rest framework)
"""
from rest_framework import serializers
from .models import Tag, Course, MobileResolution, Resolution, Video, Poster, Chapter, OTP

class TagSerializer(serializers.HyperlinkedModelSerializer):
    """ Tags here are used as if they were courses equivalents in VdoCipher,
    so just one tag for course """
    class Meta:
        """Meta"""
        model = Tag
        fields = ['name']

class CourseSerializer(serializers.HyperlinkedModelSerializer):
    """ Courses are the real model stored and used to validate subscriptions,
    list videos and so on. """
    class Meta:
        """Meta"""
        model = Course
        fields = ['title', 'description', 'created_at', 'updated_at', 'price', 'public']

class MobileResolutionSerializer(serializers.HyperlinkedModelSerializer):
    """ Resolutions available for one specific video in mobile devices """
    class Meta:
        """Meta"""
        model = MobileResolution
        fields = ['value']

class ResolutionSerializer(serializers.HyperlinkedModelSerializer):
    """ Resolutions available for one specific video in laptop devices """
    class Meta:
        """Meta"""
        model = Resolution
        fields = ['value']

class VideoSerializer(serializers.HyperlinkedModelSerializer):
    """ Product offered to customers as VOD Content """
    class Meta:
        """Meta"""
        model = Video
        fields = ['course', 'video_id', 'title', 'description',
                  'thumbUrl','upload_time','length','status',
                  'public','stream_type','resolutions','mobile_reso']

class PosterSerializer(serializers.HyperlinkedModelSerializer):
    """ The tumbnails to use for q specific video """
    class Meta:
        """Meta"""
        model = Poster
        fields = [ 'video', 'width', 'height', 'posterUrl']

class ChapterSerializer(serializers.HyperlinkedModelSerializer):
    """ Chapters to help students to navigate inside subject of classes """
    class Meta:
        """Meta"""
        model = Chapter
        fields = ['video', 'chapter_id', 'title', 'startTime']

class OTPSerializer(serializers.HyperlinkedModelSerializer):
    """ OTP key to student be able to access content buyed  """
    class Meta:
        """Meta"""
        model = OTP
        fields = [
            'video', 'ttl', 'forcedBitrate',
            'annotate', 'nocdn', 'whitelisthref', 'ipGeoRules' ]
