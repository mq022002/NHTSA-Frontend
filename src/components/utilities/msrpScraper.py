import time
from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.options import Options
from webdriver_manager.chrome import ChromeDriverManager
from concurrent.futures import ThreadPoolExecutor, as_completed
from queue import Queue

# Maximum number of WebDriver instances in the pool
MAX_POOL_SIZE = 5

class WebDriverPool:
    def __init__(self):
        self.pool = Queue(maxsize=MAX_POOL_SIZE)
        self.create_pool()

    def create_pool(self):
        for _ in range(MAX_POOL_SIZE):
            chrome_options = Options()
            chrome_options.add_argument("--headless")
            chrome_options.add_argument("--disable-gpu")
            chrome_options.add_argument("--window-size=1920,1080")
            chrome_options.add_argument("user-agent=Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/100.0.0.0 Safari/537.36")
            driver = webdriver.Chrome(service=Service(ChromeDriverManager().install()), options=chrome_options)
            self.pool.put(driver)

    def get_driver(self):
        return self.pool.get()

    def release_driver(self, driver):
        self.pool.put(driver)

# Initialize a WebDriver pool
driver_pool = WebDriverPool()

def findCarMSRP_sync(make, model, driver):
    try:
        url = f"https://www.edmunds.com/{make}/{model}/"
        driver.get(url)
        msrp_element = driver.find_element(By.CSS_SELECTOR, 'div[data-tracking-parent="msrp_range"] strong.size-20')
        msrp_text = msrp_element.text
        msrp_text_first_line = msrp_text.split('\n')[0]  
        msrp_info = {"MSRP": msrp_text_first_line}
    except Exception as e:
        msrp_info = {"MSRP": "Not Found"}
    return msrp_info

def scrape_link_sync(make, model, driver):
    try:
        url = f"https://www.edmunds.com/{make}/{model}/"
        driver.get(url)
        image_element = driver.find_element(By.CSS_SELECTOR, "img.photo.w-100")
        image_url = image_element.get_attribute('src')
        link_url = f'https://www.edmunds.com/inventory/srp.html?radius=50&make={make}&model={make}%7C{model}'
    except Exception as e:
        image_url = 'No image found'
        link_url = 'No link found'
    return {"image_url": image_url, "link_url": link_url}

def get_car_data(make, model):
    try:
        driver = driver_pool.get_driver()
        msrp_info = findCarMSRP_sync(make, model, driver)
        link_info = scrape_link_sync(make, model, driver)
        combined_results = {
            "msrp_info": msrp_info,
            "link_info": link_info
        }
        driver_pool.release_driver(driver)
        return combined_results
    except Exception as e:
        return {"error": str(e)}