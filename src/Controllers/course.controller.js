// Models
import Course from "../Models/course.model.js";


// Utils
import catchAsync from "../Utils/catchAsync.util.js";
import appError from "../Utils/appError.js";
import { deleteImg, getCoursesImgsUrls, uploadCourseImg } from '../Utils/firebase.util.js'
import { generateUniquedID } from "../Utils/function/function.util.js";
import imgCourse from "../Models/imgCourse.model.js";


export const createCourse = catchAsync(async (req, res, next) => {
    let { name, description, price, offerPrice, linkCourse } = req.body;
    const { sessionUser } = req

    const id = generateUniquedID('course');

    price = Number(price);

    const course = await Course.create({
        id,
        name,
        description,
        price,
        offerPrice: offerPrice ? offerPrice : 0,
        linkCourse,
        userId: sessionUser.id
    }
    );
    console.log(req.file);

    await uploadCourseImg(req.file, course.id);

    res.status(201).json({
        status: 'success',
        data: course
    })
})


export const getCourses = catchAsync(async (req, res, next) => {

    const courses = await Course.findAll({ where: { status: 'active' }, include: [{ model: imgCourse }] });

    await getCoursesImgsUrls(courses);

    res.status(200).json({
        status: 'success',
        data: courses
    })
})

export const updateCourse = catchAsync(async (req, res, next) => {
    const { course } = req;
    const { name, description, price, linkCourse } = req.body;

    await course.update({
        name,
        description,
        price,
        linkCourse
    })

    res.status(200).json({
        status: 'success',
        data: course
    })
})


export const deleteCourse = catchAsync(async (req, res, next) => {
    const { course } = req

    const img_course = await imgCourse.findOne({ where: { courseId: course.id } });

    await deleteImg(img_course.urlImagen);

    await img_course.destroy();

    await course.destroy();

    res.status(204).json({
        status: 'success'
    })
})