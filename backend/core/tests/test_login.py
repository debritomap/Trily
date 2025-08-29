# backend/core/tests/test_login.py
import json
import pytest
from django.test import Client
from django.contrib.auth import get_user_model


@pytest.fixture
def client():
    """
    create a client to use in requests
    """
    return Client()

@pytest.fixture
def login_url():
    """
    url to login tests
    """
    return "/auth/token/login/"

@pytest.fixture
def user():
    """
    create an user for tests
    """
    model_user = get_user_model()
    return model_user.objects.create_user(username="lucasreis", password="12345678")

@pytest.mark.auth
def login_request(login_url, client, user, payload, success = True):
    """
    test login request success with valid data
    """
    # When: send a POST request with valid data
    response = client.post(
        login_url,
        data=json.dumps(payload),
        content_type="application/json"
        )

    # Then: recebo 200 OK e um auth_token na resposta
    assert response.status_code == (200 if success else 400)
    assert ("auth_token" if success else "non_field_errors") in response.json()

@pytest.mark.django_db
@pytest.mark.auth
def test_login_success(login_url, client, user):
    """
    test login request success with signed user valid data
    """
    payload = {"username": "lucasreis", "password": "12345678"}
    login_request(login_url, client, user, payload=payload, success=True)

@pytest.mark.django_db
@pytest.mark.auth
def test_login_invalid_password(login_url, client, user):
    """
    test login request failure with invalid password
    """
    payload = {"username": user.username, "password": user.password + "_wrong"}
    login_request(login_url, client, user, payload=payload, success = False)

@pytest.mark.django_db
@pytest.mark.auth
def test_login_invalid_body(login_url, client, user):
    """
    test login request failure with invalid payload
    """
    payload = {"garbage": "non_sense_parameters"}
    login_request(login_url, client, user, payload=payload, success = False)
