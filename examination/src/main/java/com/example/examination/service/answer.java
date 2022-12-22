package com.example.examination.service;

public class answer {
    int test_id;
    int que_id;
    String answer;

    answer(int test_id, int que_id, String ans) {
        this.test_id = test_id;
        this.que_id = que_id;
        this.answer = ans;
    }
}
