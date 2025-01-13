from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from jira import JIRA
import openai
from django.conf import settings

# Jira configuration
JIRA_SERVER = "https://genai3.atlassian.net"
JIRA_USERNAME = "kushi.badu@yahoo.com"
JIRA_API_TOKEN = settings.JIRA_API_TOKEN

openai.api_key = settings.OPENAI_API_KEY

class JiraUserStoryView(APIView):
    def post(self, request):
        
        # Get Jira issue ID from the request
        jira_id = request.data.get("jira_id")
        if not jira_id:
            return Response({"error": "Jira ID is required"}, status=status.HTTP_400_BAD_REQUEST)
        options = {
            "server": JIRA_SERVER,
            "verify": False  # Suppress SSL verification
        }
        # Connect to Jira and fetch user story
        try:
            print(jira_id)
            jira = JIRA(options=options, basic_auth=(JIRA_USERNAME, JIRA_API_TOKEN))
            issue = jira.issue(jira_id)
            print(issue)
            return Response({"user_story": issue.fields.description}, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

class GenerateTestCasesView(APIView):
    def post(self, request):
        # Get user story from the request
        user_story = request.data.get("user_story")
        print(user_story)
        if not user_story:
            return Response({"error": "User story is required"}, status=status.HTTP_400_BAD_REQUEST)

        # Generate test cases using OpenAI
        try:
            response = openai.ChatCompletion.create(
                model="gpt-4o-mini",
                messages=[
                    {"role": "user", "content": f"Generate functional test cases for the following user story:\n{user_story}"}
                ],
            )
            print(response)
            test_cases = response["choices"][0]["message"]["content"].split("\n")
            return Response({"test_cases": test_cases}, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
