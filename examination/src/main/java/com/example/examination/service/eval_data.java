package com.example.examination.service;

import java.util.ArrayList;

public class eval_data {
    String exam_id;
    ArrayList<answer> answers = null;

    eval_data(String exam_id) {
        this.exam_id = exam_id;
        this.answers = new ArrayList<answer>();
    }
}
