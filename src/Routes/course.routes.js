import { Router } from 'express'


//Controllers
import { createCourse, getCourses, deleteCourse, updateCourse } from '../Controllers/course.controller.js'

//Middlewares
import { protectAdmin, protectSession } from '../Middlewares/auth.middleware.js'
import { createCourseValidators } from '../Middlewares/validator.middleware.js'
import { courseExists } from '../Middlewares/course.middleware.js'


//Utils
import upload from '../Utils/multer.util.js'


const courseRouter = Router();


courseRouter.use(protectSession);

courseRouter.get("/", getCourses);

courseRouter.use(protectAdmin)

courseRouter.post("/", upload.single('courseImg'), createCourseValidators, createCourse);

courseRouter.put("/:id", courseExists, updateCourse);

courseRouter.delete("/:id", courseExists, deleteCourse);





export default courseRouter;