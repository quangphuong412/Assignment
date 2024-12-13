let { studetList, classList } = require('../model/data.js');
const express = require('express');
const ClassRouter = express.Router();

// Truy xuất thông tin Lớp theo ID
ClassRouter.get('/getClassById/:classId', (req, res) => {
    const { classId } = req.params;
    const getClassByID = classList.find((e) => e.classID == classId);
    if (getClassByID) {
        return res.status(200).json({ message: getClassByID });
    } else {
        return res.status(400).json({ message: 'Class does not Exist' });
    }
});

// Thêm Lớp
ClassRouter.post('/addClass', (req, res) => {
    const { className, classId } = req.body;
    const checkExistClass = classList.find(
        (e) => e.className == className || e.classID == classId,
    );
    if (!classId || !className) {
        return res.status(400).json({ message: 'Class ID or Class Name are not Empty!' });
    }
    if (checkExistClass) {
        return res.status(400).json({ message: 'Class Existed!' });
    }
    let newClass = {
        classID: classId,
        className: className,
    };
    classList.push(newClass);
    return res.status(200).json({ message: classList });
});

// Xóa Lớp (nếu lớp còn HS thì ko được phép xóa)
ClassRouter.delete('/deleteClass', (req, res) => {
    const { classID } = req.body;
    const checkStudentInClass = studetList.find((e) => e.classId == classID);
    if (!checkStudentInClass) {
        let newClassList = classList.filter((e) => e.classID !== classID);
        classList.splice(0, classList.length, ...newClassList);
        return res.status(200).json({ message: classList });
    } else {
        return res.status(400).json({ message: 'Student are still in the Class!' });
    }
});

// Update thông tin Lớp
ClassRouter.post('/updateClass', (req, res) => {
    const { classID, className } = req.body;
    const checkClassExist = classList.find((e) => e.classID == classID);
    if (checkClassExist) {
        checkClassExist.className = className
        return res.status(200).json({ message: classList });
    } else {
        return res.status(400).json({ message: 'Class does not Existed!' });
    }
});

module.exports = ClassRouter;
