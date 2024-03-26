import asyncio
import time
from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.options import Options
from webdriver_manager.chrome import ChromeDriverManager
import json

async def findCarMSRP(make, model):
    base_url = "https://www.edmunds.com"
    selected_url = f"{base_url}/{make}/{model}/"

    loop = asyncio.get_event_loop()
    msrp_info = await loop.run_in_executor(None, lambda: scrapeMSRP(selected_url))
    return msrp_info

def scrapeMSRP(selected_url):
    chrome_options = Options()
    chrome_options.add_argument("--headless")
    chrome_options.add_argument("--disable-gpu")
    chrome_options.add_argument("--window-size=1920,1080")
    chrome_options.add_argument("user-agent=Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/100.0.0.0 Safari/537.36")

    driver = webdriver.Chrome(service=Service(ChromeDriverManager().install()), options=chrome_options)
    driver.get(selected_url)

    time.sleep(2)  

    try:
        msrp_element = driver.find_element(By.CSS_SELECTOR, 'div[data-tracking-parent="msrp_range"] span.font-weight-bold')
        msrp_text = msrp_element.text
        msrp_text_first_line = msrp_text.split('\n')[0]  
        msrp = {"MSRP": msrp_text_first_line}
    except Exception as e:
        msrp = "MSRP not found"
        print(f"Error while scraping MSRP: {e}")

    driver.quit()
    return msrp