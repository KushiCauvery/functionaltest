from django.urls import path
from .views import JiraUserStoryView, GenerateTestCasesView

urlpatterns = [
    path("jira-user-story/", JiraUserStoryView.as_view(), name="jira_user_story"),
    path("generate-test-cases/", GenerateTestCasesView.as_view(), name="generate_test_cases"),
]

