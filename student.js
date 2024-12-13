let { studetList, classList } = require('./data');
const express = require('express');
const StudentRouter = express.Router();

// Truy xuất tất cả danh sách học sinh
StudentRouter.get('/getAllStudent', (req, res) => {
    if (studetList?.studentId) {
        return res.status(400).json({ message: 'Student List is empty!.' });
    } else {
        return res.status(200).json({ message: studetList });
    }
});

// Truy xuất thông tin HS theo ID
StudentRouter.get('/getStudentById/:studentId', (req, res) => {
    const { studentId } = req.params;
    const getStudentById = studetList.find((e) => e.studentId == studentId);
    if (getStudentById) {
        return res.status(200).json({ message: getStudentById });
    } else {
        return res.status(400).json({ message: 'Student does not exist' });
    }
});

// Truy xuất thông tin HS theo Name (search LIKE)
StudentRouter.get('/getStudentByName', (req, res) => {
    const { stuName } = req.query;
    console.log(stuName)
    const getStudentByName = studetList.filter((e) => e.name.includes(stuName));
    if (getStudentByName) {
        return res.status(200).json({ message: getStudentByName });
    } else {
        return res.status(400).json({ message: 'Student does not Exist' });
    }
});

//Truy xất tất cả học sinh theo Class (sử dung Class Name).
StudentRouter.get('/getStudentByClass', (req, res) => {
    const { className } = req.query;
    const getClassByCNa = classList.find((e) => e.className == className);
    if (!getClassByCNa) {
        return res.status(400).json({ message: 'Class does not Exist!' });
    }
    let studentByclassName = studetList.filter(
        (e) => e.classId == getClassByCNa.classID,
    );
    return res.status(200).json({ message: studentByclassName });
});

// Link Html File
StudentRouter.get('/addStudent', (req, res) => {
    res.sendFile(__dirname + '/student.html');
});

// Thêm Học Sinh
StudentRouter.post('/addStudent', (req, res) => {
    const { studentName, studentId, classID } = req.body;
    const checkExistStudent = studetList.find(
        (e) => e.name == studentName || e.studentId == studentId,
    ); // Check Class ID, Class Name Existed
    const checkExistClass = classList.find((e) => e.classID == classID);
    if (!classID || !studentId || !studentName) {
        return res.status(400).json({ message: "Student's information is required" });
    }
    if (checkExistStudent) {
        return res.status(400).json({ message: 'Student Name or Student ID Existed!' });
    }
    if (!checkExistClass) {
        return res.status(400).json({ message: 'Class does not Existed!' });
    }
    let newStudent = {
        studentId: studentId,
        name: studentName,
        classId: classID,
    };
    studetList.push(newStudent);
    return res.status(200).json({ message: studetList });
});

// Xóa học sinh
StudentRouter.delete('/deleteStudent', (req, res) => {
    const { studentId } = req.body;
    let newStudent = studetList.filter((e) => e.studentId !== studentId);
    studetList.splice(0, studetList.length, ...newStudent);
    return res.status(200).json({ message: studetList });
});

// Update thông tin học sinh
StudentRouter.post('/updateStudent', (req, res) => {
    const { studentName, studentId, classID } = req.body;
    if (studentId) {
        const getStudentId = studetList.find((e) => e.studentId == studentId);
        if (getStudentId) {
            if (studentName) { const checkNameExist = studetList.find((e) => e.name == studentName,);
                if (checkNameExist) {
                    return res.status(400).json({ message: 'Student Name existed!.' });
                }
            }
            if (classID) {
                const checkClassExist = classList.find((e) => e.classID == classID);
                if (!checkClassExist) {
                    return res.status(400).json({ message: 'Class does not existed!.' });
                }
            }
            getStudentId.name = studentName || getStudentId.name; // IF user enter name => update. Not => Keep the same
            getStudentId.classId = classID || getStudentId.classId; // IF user enter class => update. Not => Keep the same
            return res.status(200).json({ message: studetList });
        }else{
            return res.status(400).json({ message: 'Student does not existed.' });
        }
    } else {
        return res.status(400).json({ message: 'Student ID is required.' });
    }
});

module.exports = StudentRouter;
