import requests
import sys
from datetime import datetime
import json

class FootballClubAPITester:
    def __init__(self, base_url="https://fussballverein.preview.emergentagent.com/api"):
        self.base_url = base_url
        self.tests_run = 0
        self.tests_passed = 0
        self.test_results = []

    def run_test(self, name, method, endpoint, expected_status, data=None, expected_fields=None):
        """Run a single API test"""
        url = f"{self.base_url}/{endpoint}" if endpoint else self.base_url
        headers = {'Content-Type': 'application/json'}

        self.tests_run += 1
        print(f"\n🔍 Testing {name}...")
        print(f"   URL: {url}")
        
        try:
            if method == 'GET':
                response = requests.get(url, headers=headers, timeout=10)
            elif method == 'POST':
                response = requests.post(url, json=data, headers=headers, timeout=10)

            success = response.status_code == expected_status
            
            if success:
                self.tests_passed += 1
                print(f"✅ Passed - Status: {response.status_code}")
                
                # Check response content if expected_fields provided
                if expected_fields and response.content:
                    try:
                        response_data = response.json()
                        if isinstance(response_data, list) and len(response_data) > 0:
                            # Check first item in list
                            item = response_data[0]
                            for field in expected_fields:
                                if field not in item:
                                    print(f"⚠️  Warning: Expected field '{field}' not found in response")
                        elif isinstance(response_data, dict):
                            for field in expected_fields:
                                if field not in response_data:
                                    print(f"⚠️  Warning: Expected field '{field}' not found in response")
                    except json.JSONDecodeError:
                        print("⚠️  Warning: Response is not valid JSON")
                
                self.test_results.append({
                    "test": name,
                    "status": "PASSED",
                    "response_code": response.status_code
                })
                return True, response.json() if response.content else {}
            else:
                print(f"❌ Failed - Expected {expected_status}, got {response.status_code}")
                if response.content:
                    print(f"   Response: {response.text[:200]}...")
                self.test_results.append({
                    "test": name,
                    "status": "FAILED",
                    "expected_code": expected_status,
                    "actual_code": response.status_code,
                    "error": response.text[:200] if response.content else "No response content"
                })
                return False, {}

        except requests.exceptions.RequestException as e:
            print(f"❌ Failed - Network Error: {str(e)}")
            self.test_results.append({
                "test": name,
                "status": "FAILED",
                "error": f"Network Error: {str(e)}"
            })
            return False, {}

    def test_root_endpoint(self):
        """Test API root endpoint"""
        return self.run_test("API Root", "GET", "", 200)

    def test_get_teams(self):
        """Test getting all teams"""
        success, response = self.run_test(
            "Get All Teams", 
            "GET", 
            "teams", 
            200,
            expected_fields=["id", "name", "coaches", "players"]
        )
        if success and isinstance(response, list):
            print(f"   Found {len(response)} teams")
            team_ids = [team.get('id') for team in response]
            print(f"   Team IDs: {team_ids}")
            return team_ids
        return []

    def test_get_team_details(self, team_id):
        """Test getting specific team details"""
        success, response = self.run_test(
            f"Get Team Details ({team_id})",
            "GET",
            f"teams/{team_id}",
            200,
            expected_fields=["id", "name", "coaches", "players"]
        )
        if success:
            print(f"   Team: {response.get('name', 'Unknown')}")
            print(f"   Coaches: {len(response.get('coaches', []))}")
            print(f"   Players: {len(response.get('players', []))}")
        return success

    def test_get_news(self):
        """Test getting news"""
        success, response = self.run_test(
            "Get News",
            "GET",
            "news",
            200,
            expected_fields=["id", "title", "content"]
        )
        if success and isinstance(response, list):
            print(f"   Found {len(response)} news items")
        return success

    def test_get_contact_persons(self):
        """Test getting contact persons"""
        success, response = self.run_test(
            "Get Contact Persons",
            "GET",
            "contact-persons",
            200,
            expected_fields=["id", "name", "role"]
        )
        if success and isinstance(response, list):
            print(f"   Found {len(response)} contact persons")
        return success

    def test_send_contact_message(self):
        """Test sending contact message"""
        test_message = {
            "name": f"Test User {datetime.now().strftime('%H%M%S')}",
            "email": "test@example.com",
            "subject": "Test Message",
            "message": "This is a test message from the automated test suite."
        }
        
        success, response = self.run_test(
            "Send Contact Message",
            "POST",
            "contact",
            200,
            data=test_message,
            expected_fields=["id", "name", "email", "subject", "message"]
        )
        if success:
            print(f"   Message ID: {response.get('id', 'Unknown')}")
        return success

    def test_club_info(self):
        """Test getting club info"""
        success, response = self.run_test(
            "Get Club Info",
            "GET",
            "club-info",
            200,
            expected_fields=["name", "founded", "address"]
        )
        if success:
            print(f"   Club: {response.get('name', 'Unknown')}")
            print(f"   Founded: {response.get('founded', 'Unknown')}")
        return success

def main():
    print("🏈 Starting SG Siemens München Ost API Tests")
    print("=" * 50)
    
    tester = FootballClubAPITester()
    
    # Test API root
    tester.test_root_endpoint()
    
    # Test teams endpoints
    team_ids = tester.test_get_teams()
    
    # Test individual team details for known teams
    expected_teams = ["erste-mannschaft", "zweite-mannschaft", "traditionsmannschaft"]
    for team_id in expected_teams:
        tester.test_get_team_details(team_id)
    
    # Test news endpoint
    tester.test_get_news()
    
    # Test contact persons endpoint
    tester.test_get_contact_persons()
    
    # Test contact message submission
    tester.test_send_contact_message()
    
    # Test club info
    tester.test_club_info()
    
    # Print final results
    print("\n" + "=" * 50)
    print(f"📊 Test Results: {tester.tests_passed}/{tester.tests_run} tests passed")
    
    if tester.tests_passed == tester.tests_run:
        print("🎉 All tests passed!")
        return 0
    else:
        print("❌ Some tests failed!")
        print("\nFailed Tests:")
        for result in tester.test_results:
            if result["status"] == "FAILED":
                print(f"  - {result['test']}: {result.get('error', 'Unknown error')}")
        return 1

if __name__ == "__main__":
    sys.exit(main())