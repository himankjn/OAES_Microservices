package com.example.examination.service;

import com.example.examination.dao.examinationDAO;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.ArrayList;

public class exam_iiitb extends exam {
    @Autowired
    examinationDAO examDao;

    public exam_iiitb(){
        examDao=new examinationDAO();
    }

    public ArrayList<test> get_list_tests() {
        return examDao.get_list_tests();
    }

    public ArrayList<question> get_questions(String test_id) {
        return examDao.get_questions(test_id);
    }

    public boolean submit_for_eval(eval_data eval) {
        return true;
    }
}
