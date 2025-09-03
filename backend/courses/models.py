"""django standard lib for models"""
from django.db import models

class Tag(models.Model):
    """
    Tags here are used as if they were courses equivalents in VdoCipher, so just one tag for course
    """
    name = models.CharField(max_length=128)

class Course(models.Model):
    """
    Courses are the real model stored and used to validate subscriptions, list videos and so on.
    """
    title           = models.CharField(max_length=128)
    description     = models.CharField(max_length=128)
    created_at      = models.DateTimeField(auto_now=True)
    updated_at      = models.DateTimeField(auto_now_add=True)
    price           = models.PositiveIntegerField(blank=False, default=0)
    public          = models.BooleanField(default=False)

class MobileResolution(models.Model):
    """
    Resolutions available for one specific video in mobile devices
    """
    value = models.PositiveIntegerField(blank=False)

class Resolution(models.Model):
    """
    Resolutions available for one specific video in laptop devices
    """
    value = models.PositiveIntegerField(blank=False)

class Video(models.Model):
    """
    Product offered to customers as VOD Content
    """
    course          = models.ForeignKey(Course, on_delete=models.CASCADE)
    video_id        = models.CharField(max_length=1000)
    title           = models.CharField(max_length=128)
    description     = models.CharField(max_length=128)
    thumbUrl        = models.CharField(max_length=1000)
    upload_time     = models.BigIntegerField()
    length          = models.IntegerField()
    status          = models.CharField(max_length=128)
    public          = models.BooleanField(default=False)
    stream_type     = models.CharField(max_length=128)
    resolutions     = models.ManyToManyField(Resolution)
    mobile_reso     = models.ManyToManyField(MobileResolution)

class Poster(models.Model):
    """
    The tumbnails to use for q specific video
    """
    video           = models.ForeignKey(Video, on_delete=models.CASCADE)
    width           = models.IntegerField()
    height          = models.IntegerField()
    posterUrl       = models.CharField(max_length=1000)

class Chapter(models.Model):
    """
    Chapters to help students to navigate inside subject of classes
    """
    video           = models.ForeignKey(Video, on_delete=models.CASCADE)
    chapter_id      = models.CharField(max_length=1000)
    title           = models.CharField(max_length=128)
    startTime       = models.PositiveIntegerField(blank=False, default=0)

class OTP(models.Model):
    """
    OTP key to student be able to access content buyed 
    """
    video           = models.ForeignKey(Video, on_delete=models.CASCADE)
    ttl             = models.PositiveIntegerField(blank=False, default=0)
    forcedBitrate   = models.PositiveIntegerField(blank=False, default=0)
    annotate        = models.CharField(max_length=128)
    nocdn           = models.PositiveIntegerField(blank=False, default=0)
    whitelisthref   = models.CharField(max_length=128)
    ipGeoRules      = models.CharField(max_length=128)
