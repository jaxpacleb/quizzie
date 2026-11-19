import os
from dotenv import load_dotenv
from supabase import create_client, Client

# 1. I-load ang variables mula sa .env file
load_dotenv()

# 2. Kunin ang URL at Key
SUPABASE_URL: str = os.getenv("SUPABASE_URL")
SUPABASE_KEY: str = os.getenv("SUPABASE_KEY")

# 3. Validation check para malaman agad kung may kulang sa .env
if not SUPABASE_URL or not SUPABASE_KEY:
    raise ValueError("Kulang ang SUPABASE_URL o SUPABASE_KEY sa backend/.env file.")

# 4. Gumawa ng reusable Supabase client instance
supabase: Client = create_client(SUPABASE_URL, SUPABASE_KEY)