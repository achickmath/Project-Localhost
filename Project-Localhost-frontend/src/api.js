const API_BASE_URL = "http://localhost:5001";

export const fetchUserProfile = async (email) => {
    try {
        const response = await fetch(`${API_BASE_URL}/profile/${email}`);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error fetching user profile:", error);
        return { success: false };
    }
};
