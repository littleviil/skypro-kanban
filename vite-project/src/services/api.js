import axios from "axios";

const API_BASE_URL = "https://wedev-api.sky.pro/api";
const KANBAN_API_URL = `${API_BASE_URL}/kanban`;

const validateJSON = (data) => {
  try {
    if (typeof data === "string") {
      const parsed = JSON.parse(data);
      if (parsed && typeof parsed === "object") {
        return parsed;
      }
      throw new Error("Parsed JSON is not an object");
    }
    return data;
  } catch (e) {
    throw new Error(`Invalid JSON: ${e.message}`);
  }
};

const handleApiError = (error) => {
  if (error.response) {
    try {
      const errorData = validateJSON(error.response.data);
      const message =
        errorData.message ||
        errorData.error ||
        `HTTP Error ${error.response.status}`;
      throw new Error(message);
    } catch {
      throw new Error(`Server error: ${error.response.status}`);
    }
  }
  throw error;
};

const kanbanAPI = {
  fetchTasks: async ({ token }) => {
    try {
      const response = await axios.get(KANBAN_API_URL, {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        transformResponse: [validateJSON],
      });
      return validateJSON(response.data).tasks || [];
    } catch (error) {
      throw handleApiError(error);
    }
  },
};

export const fetchKanbanTasks = kanbanAPI.fetchTasks;