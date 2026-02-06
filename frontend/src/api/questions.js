//src/api/questions.js
/*
These are the roles in the database:
  'Python Developer',
  'Scrum Master',
  'Scrum Product Owner',
  'UI/UX Designer',
  'Web Developer'
  */
export const fetchQuestionsByRole = async (role) => {
  //1. role input
  console.log("function fetchQuestionsByRole called with role:", role);
  if (!role) {
    throw new Error("Role is needed to fetch questions");
  }

  //2. constructing url
  const BASE_URL = import.meta.env.VITE_API_BASE_URL;
  console.log("api base url:", BASE_URL);
  const url = `${BASE_URL}/api/questions?role=${encodeURIComponent(role)}`;
  console.log("Fetching questions from URL:", url);

  //3. make request
  const response = await fetch(url);

  //4. response object
  console.log("Fetch response object:", response);
  console.log("Response status:", response.status);
  console.log("Response ok:", response.ok);

  //5. throw error if response is not ok
  if (!response.ok) {
    throw new Error("Failed to fetch questions");
  }

  //6. parse response's json body
  const data = await response.json();
  console.log("Parsed questions data:", data);

  //7. return data
  return data;
};
