import React, { useState } from "react";
import axios from "axios";
import './App.css';

function App() {
    const [jiraId, setJiraId] = useState("");
    const [userStory, setUserStory] = useState("");
    const [testCases, setTestCases] = useState([]);
    const [loading, setLoading] = useState(false);  // Track loading state

    const fetchUserStory = async () => {
        setLoading(true);  // Set loading to true when the request starts
        try {
            const response = await axios.post("http://127.0.0.1:8000/api/jira-user-story/", {
                jira_id: jiraId,
            });
            setUserStory(response.data.user_story);
        } catch (error) {
            alert(error.response?.data?.error || "Error fetching user story");
        } finally {
            setLoading(false);  // Set loading to false when the request completes (success or failure)
        }
    };

    const generateTestCases = async () => {
        setLoading(true);  // Set loading to true when the request starts
        try {
            const response = await axios.post("http://127.0.0.1:8000/api/generate-test-cases/", {
                user_story: userStory,
            });
            setTestCases(response.data.test_cases);
        } catch (error) {
            alert(error.response?.data?.error || "Error generating test cases");
        } finally {
            setLoading(false);  // Set loading to false when the request completes (success or failure)
        }
    };

    return (
        <div style={{ padding: "20px" }}>
            <h1>User Story to Test Case Generator</h1>
            
            <div>
                <h2>Step 1: Import User Story from Jira</h2>
                <input
                    type="text"
                    placeholder="Enter Jira ID"
                    value={jiraId}
                    onChange={(e) => setJiraId(e.target.value)}
                />
                <button onClick={fetchUserStory} disabled={loading}>
                    Fetch User Story
                </button>
            </div>
            
            <div>
                <h2>Step 2: Edit or Review User Story</h2>
                <textarea
                    rows="5"
                    cols="50"
                    value={userStory}
                    onChange={(e) => setUserStory(e.target.value)}
                ></textarea>
            </div>

            <div>
                <h2>Step 3: Generate Test Cases</h2>
                <button onClick={generateTestCases} disabled={loading}>
                    Generate
                </button>
            </div>

            {testCases.length > 0 && (
                <div>
                    <h2>Generated Test Cases</h2>
                    <ul>
                        {testCases.map((testCase, index) => (
                            <li key={index}>{testCase}</li>
                        ))}
                    </ul>
                </div>
            )}

            {/* Loading Modal */}
            {loading && (
                <div className="loading-overlay">
                    <div className="loading-modal">
                        <h3>Loading, please wait...</h3>
                        <div className="spinner"></div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default App;
