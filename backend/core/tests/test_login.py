# backend/core/tests/test_login.py
import json
import pytest
from django.test import Client
from django.contrib.auth import get_user_model

@pytest.mark.django_db
@pytest.mark.auth
def test_login_success():
    """
    test login request success with valid data
    """
    # Given: signed user
    user = get_user_model()
    user.objects.create_user(username="lucasreis", password="12345678")

    # When: send a POST request with valid data
    client = Client()
    response = client.post(
        "/auth/token/login/",
        data=json.dumps({"username": "lucasreis", "password": "12345678"}),
        content_type="application/json"
        )

    # Then: recebo 200 OK e um auth_token na resposta
    assert response.status_code == 200
    assert "auth_token" in response.json()

@pytest.mark.django_db
@pytest.mark.auth
def test_login_invalid_password():
    """
    test login request failure with invalid password
    """
    # Given: not signed user
    user = get_user_model()
    user.objects.create_user(username="lucasreis", password="12345678")

    # When: send a POST request with invalid data
    client = Client()
    response = client.post(
        "/auth/token/login/",
        data=json.dumps({"username": "johndoe", "password": "password"}),
        content_type="application/json"
        )

    # Then: receive a error message
    response_json = response.json()
    assert response.status_code == 400
    assert 'Impossível fazer login com as credenciais fornecidas.' in response_json["non_field_errors"]

@pytest.mark.django_db
@pytest.mark.auth
def test_login_invalid_body():
    """
    test login request failure with invalid parameters
    """
    # Given: not signed user
    user = get_user_model()
    user.objects.create_user(username="lucasreis", password="12345678")

    # When: send a POST request with invalid data
    client = Client()
    response = client.post(
        "/auth/token/login/",
        data=json.dumps({"other": "parameters"}),
        content_type="application/json"
        )

    # Then: receive a error message
    response_json = response.json()
    assert response.status_code == 400
    assert 'Impossível fazer login com as credenciais fornecidas.' in response_json["non_field_errors"]
