package com.example.student.service;

import com.example.student.dao.studentDAO;

public class student_iiitb extends student_intf {
    studentDAO studentDao;
    student_iiitb(){
        studentDao=new studentDAO();
    }

    public String generate_id(){
        return studentDao.create_generate_id(this);
    }

    public boolean validate(boolean flag)
    {
        return studentDao.validate(this.email,this.phone,this.passwd,flag);
    }
}
