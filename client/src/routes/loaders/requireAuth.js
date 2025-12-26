import { fetchAuth } from "@/features/auth";

async function requireGuest() {
  try {
    const res = await fetchAuth();
    console.log(res)
  } catch (error) {
    
  }
}

export default requireGuest;