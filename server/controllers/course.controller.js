import Course from '../models/course.model.js';
import AppError from '../utils/error.utils.js';
import cloudinary from 'cloudinary';
import fs from 'fs/promises';


const getAllCourses = async ( req, res, next ) => {
    try{
        const courses = await Course.find({}).select('-lectures');
    
        res.status(200).json({
            success : true,
            message : "All courses",
            courses,
        })

    }
    catch(e){
        return next(new AppError('Error in fetching all courses',400));
    }
}

const getLecturesByCourseId = async ( req, res, next ) => {
    try{
        const { id } = req.params;
        const course = await Course.findById(id);
        res.status(200).json({
            success:true,
            message:'Course Lectures fetched successfully',
            Lectures : course.lectures
        })
    }catch(e){
        return next(new AppError('Invalid Course id', 400));
    }
} 

const createCourse = async ( req, res, next ) => {
    const { title, description, category, createdBy } = req.body;
    if(!title || !description || !category || !createdBy){
        return next(new AppError("All fields are required"),400);
    }

    const course = await Course.create({
        title, description, category, createdBy,
        thumbnail : {
            public_id : 'DUMMY',
            secure_url :'DUMMY'
        }
    });

    if(!course){
        return next(new AppError("Could not create course, please try again"), 400);
    }

    if(req.file){
        const result = await cloudinary.v2.uploader.upload(req.file.path, {
            folder:'lms'
        });
        if(result){
            course.thumbnail.public_id = result.public_id;
            course.thumbnail.secure_url = result.secure_url;
        }

        fs.rm(`uploads/${req.file.filename}`);
    }

    await course.save();
    res.status(200).json({
        success:true,
        message:'Course Created successfully',
        course
    })
}

const updateCourse = async ( req, res, next) => {
    try{
        const { id } = req.params;
        const course = await Course.findByIdAndUpdate(
            id,
            {
                $set : req.body
            },
            {
                runValidators : true
            }
        );

        if(!course){
            return next(new AppError('Course with given id does not exist'), 500);
        }

        res.status(200).json({
            success:true,
            message:'Course updated successfully',
            course
        })
    }catch(e){
        return next(new AppError(e.message, 500));
    }
}

const removeCourse = async ( req, res, next ) => {
    try{
        const { id } = req.params;
        const course = await Course.findOne(id);
        
        if(!course){
            return next(new AppError('Course with given it doen not exits',500));
        }

        await Course.findByIdAndDelete(id);

        res.status(200).json({
            success:true,
            message:'Course deleted successfully'
        })

    }catch(e){
        return next(new AppError(e.message, 500));
    }
}

const addLecturesToCourseById = async(req, res, next) => {
    try{
        const { title, description } = req.body;
        const { id } = req.params;
    
        
        if(!title || !description ){
            return next(new AppError('All fields are required',400));
        }
        
        const course = await Course.findById(id);
    
        if(!course){
            return next(new AppError('Course with given id does not exits',400));
        }
    
        const lectureData = {
            title, description,lecture:{}
        };
    
        if(req.file){
            try{
                const result = await cloudinary.v2.uploader.upload(req.file.path, {
                    folder:'lms'
                });
                if(result){
                    lectureData.lecture.public_id = result.public_id;
                    lectureData.lecture.secure_url = result.secure_url;
                }
        
                fs.rm(`uploads/${req.file.filename}`);
            }catch(e){
                return next(new AppError(e.message,500));
            }
        }
        course.lectures.push(lectureData);
        course.numberOfLectures = course.lectures.length;
    
        await course.save();
    
        res.status(200).json({
            success:true,
            message:"Lecture successfully added to course",
            course
        })

    }catch(e){
        return next(new AppError(e.message,400));
    }

}

export {
    getAllCourses,
    getLecturesByCourseId,
    createCourse,
    updateCourse,
    removeCourse,
    addLecturesToCourseById
}