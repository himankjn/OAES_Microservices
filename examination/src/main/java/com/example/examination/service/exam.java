package com.example.examination.service;

import java.io.IOException;
import java.util.ArrayList;

public abstract class exam {
    public int test_id=0;
    String exam_id="";

    //    abstract boolean get_list_tests();
    abstract ArrayList<test> get_list_tests();
    abstract ArrayList<question> get_questions(String test_id);
    abstract boolean submit_for_eval(eval_data eval);
}
