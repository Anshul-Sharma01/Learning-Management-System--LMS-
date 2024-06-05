import { Router } from "express";
import { getAllCourses, getLecturesByCourseId, createCourse, updateCourse, removeCourse, addLecturesToCourseById } from "../controllers/course.controller";
import { authorizedRoles, isLoggedIn } from "../middlewares/auth.middleware";


const router = Router();


router.route("/")
    .get( getAllCourses)
    .post( isLoggedIn, authorizedRoles('ADMIN'), upload.single('thumbnail'), createCourse)

router.get("/:id")
    .get(isLoggedIn, getLecturesByCourseId)
    .put( isLoggedIn, authorizedRoles('ADMIN'), updateCourse)
    .delete( isLoggedIn, authorizedRoles('ADMIN'), removeCourse)
    .post(isLoggedIn, authorizedRoles('ADMIN'), upload.single('thumbnail'),addLecturesToCourseById) 

export default router;