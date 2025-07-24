import re
from playwright.sync_api import Page, expect, sync_playwright

def test_todo_crud_nth_item():
    print("Starting test_todo_crud_nth_item")
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=False)
        page = browser.new_page()
        page.goto("http://localhost:3001")
        print("Navigated to Todo App")

        # Login
        page.get_by_role("textbox", name="Username").fill("testuser")
        page.get_by_role("textbox", name="Password").fill("testpass")
        page.get_by_role("button", name="Login").click()
        print("Logged in as testuser")

        # Assert login success
        expect(page.get_by_role("heading", name="Todos")).to_be_visible()
        print("Login successful")
        # Take screenshot of homepage
        page.screenshot(path="screenshot.png", full_page=True)


        # Add new todo: "buy cake"
        page.get_by_role("textbox", name="Enter todo").fill("buy cake")
        page.get_by_role("button", name="Add").click()
        print("Added new todo: buy cake")

        # Assert new todo is visible
        expect(page.get_by_text("buy cake")).to_be_visible()
        print("Verified new todo is visible")

        # Edit the 4th todo to "buy chocolate"
        page.get_by_role("button", name="Edit").nth(3).click()
        page.get_by_role("textbox", name="Enter todo").fill("buy chocolate")
        page.get_by_role("button", name="Update").click()
        print("Edited 4th todo to 'buy chocolate'")

        # Assert updated todo is visible
        expect(page.get_by_text("buy chocolate")).to_be_visible()
        print("Verified updated todo is visible")

        # Delete the 4th todo
        page.get_by_role("button", name="Delete").nth(3).click()
        print("Deleted 4th todo")

        # Assert the deleted todo is gone
        expect(page.get_by_text("buy chocolate")).not_to_be_visible()
        print("Verified deleted todo is not visible")
        # Take screenshot of homepage
        #page.screenshot(path="homepage.png", full_page=True)

        browser.close()
        print("Finished test_todo_crud_nth_item\n")

def test_invalid_login():
    print("Starting test_invalid_login")
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=False)
        page = browser.new_page()
        page.goto("http://localhost:3001")
        print("Navigated to Todo App")
        # Enter wrong credentials
        page.get_by_role("textbox", name="Username").fill("wronguser")
        page.get_by_role("textbox", name="Password").fill("wrongpass")
        page.get_by_role("button", name="Login").click()
        print("Attempted login with invalid credentials")

        # Expect error message
        page.wait_for_timeout(1000)
        error = page.get_by_text("Invalid credentials")
        assert error.is_visible(), "Expected error message not shown"
        print("Verified error message is visible")
        # Take screenshot of homepage
        page.screenshot(path="screenshot.png", full_page=True)


        browser.close()
        print("Finished test_invalid_login\n")

def test_todo_crud():
    print("Starting test_todo_crud")
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=False)
        page = browser.new_page()
        page.goto("http://localhost:3001")
        print("Navigated to Todo App")

        page.get_by_role("textbox", name="Username").fill("testuser")
        page.get_by_role("textbox", name="Password").fill("testpass")
        page.get_by_role("button", name="Login").click()
        print("Logged in as testuser")

        # Assert login success
        expect(page.get_by_role("heading", name="Todos")).to_be_visible()
        print("Login successful")

        page.get_by_role("textbox", name="Enter todo").click()
        page.get_by_role("textbox", name="Enter todo").fill("take printout")
        page.get_by_role("button", name="Add").click()
        print("Added new todo: take printout")

        expect(page.get_by_text("take printout")).to_be_visible()
        print("Verified new todo is visible")

        page.get_by_role("button", name="Edit").nth(3).click()
        page.get_by_role("textbox", name="Enter todo").click()
        page.get_by_role("textbox", name="Enter todo").press("ArrowRight")
        page.get_by_role("textbox", name="Enter todo").fill("take printout of document")
        page.get_by_role("button", name="Update").click()
        print("Edited 4th todo to 'take printout of document'")

        expect(page.get_by_text("take printout of document")).to_be_visible()
        print("Verified updated todo is visible")

        page.get_by_role("button", name="Delete").nth(3).click()
        print("Deleted 4th todo")

        expect(page.get_by_text("take printout of document")).not_to_be_visible()
        print("Verified deleted todo is not visible")

        browser.close()
        print("Finished test_todo_crud\n")

