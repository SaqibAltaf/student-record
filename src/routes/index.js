import express from "express";
const router = express.Router();

import { studentsController } from "../controllers";


router.get("/api/students", studentsController.get);
// http://localhost:8080/api/students
router.post("/api/register-student", studentsController.post);
// http://localhost:8080/api/register-student
router.get("/api/search/:key", studentsController.search); // search by first_name, last_name, city and state
// http://localhost:8080/api/search/abcd

router.get("/api/get-results", studentsController.getResults); // search by first_name, last_name, city and state
// http://localhost:8080/api/get-results

export default router;