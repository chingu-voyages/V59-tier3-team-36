import mongoose from "mongoose";
import { connectDB } from "./config/database.js";
import flashcards from "./data/flashcards.js";
import Role from "./models/roleModel.js";
import Question from "./models/questionModel.js";
import Sessions from "./models/sessionModel.js";
import fs from "fs";

connectDB();

const SESSIONS_JSON_PATH = "./data/mockData/mockSessionDocument.json";

const importData = async () => {
  try {
    //Load mock session document json
    const mockSessionDocument = JSON.parse(
      fs.readFileSync(SESSIONS_JSON_PATH, "utf-8")
    );
    // Clear existing data
    await Role.deleteMany();
    await Question.deleteMany();
    await Sessions.deleteMany();

    // Build questions and roles data based on flashcards JSON object
    const questionsData = [];
    const rolesData = [];

    flashcards.forEach((item) => {
      const { role, focus, flashcards: questions } = item;
      rolesData.push({ name: role, focus, questionCount: questions.length });

      questions.forEach((q) => {
        questionsData.push({
          question: q.question,
          role,
          options: q.options,
          answer: q.answer,
          rationale: q.rationale,
        });
      });
    });

    // Insert new data for roles and questions
    await Role.insertMany(rolesData);
    await Question.insertMany(questionsData);
    //Inser session document from JSON
    await Sessions.insertMany(mockSessionDocument);

    console.log("Roles, Questions and Sessions imported successfully!");
    process.exit();
  } catch (error) {
    console.log("Seed import error: ", error);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await Role.deleteMany();
    await Question.deleteMany();
    await Sessions.deleteMany();

    console.log("Roles,questions, sessions destroyed successfully!");

    process.exit();
  } catch (error) {
    console.log("Seed destroy error: ", error);
    process.exit(1);
  }
};

if (process.argv[2] === "-d") {
  destroyData();
} else {
  importData();
}
