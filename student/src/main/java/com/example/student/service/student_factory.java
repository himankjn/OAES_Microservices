package com.example.student.service;

public class student_factory {
    public student_intf create_student(String type){
        student_intf std = null;
        if(type=="iiitb"){
            std = new student_iiitb();
        }
        return std;
    }
}
