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
    resp = client.post(
        "/auth/token/login/",
        data=json.dumps({"username": "lucasreis", "password": "12345678"}),
        content_type="application/json"
        )

    # Then: recebo 200 OK e um auth_token na resposta
    assert resp.status_code == 200
    assert "auth_token" in resp.json()
