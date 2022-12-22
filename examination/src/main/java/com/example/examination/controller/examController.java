package com.example.examination.controller;

import com.example.examination.service.eval_data;
import com.example.examination.service.exam_iiitb;
import com.example.examination.service.question;
import com.example.examination.service.test;
import jakarta.websocket.server.PathParam;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;

@CrossOrigin
@RestController
@RequestMapping("/exam")
public class examController {
    exam_iiitb exam;

    public examController(){
        exam = new exam_iiitb();
    }

    @GetMapping("/show_tests")
    public ResponseEntity<ArrayList<test>> get_test_list(){
        ArrayList<test> tests = exam.get_list_tests();

        return ResponseEntity.ok().header("Content-Type", "application/json").body(tests);
    }

    @GetMapping("/get_questions/{test_id}")
    public ResponseEntity<ArrayList<question>> get_questions(@PathVariable("test_id") String test_id){
        ArrayList<question> ques = exam.get_questions(test_id);

        return ResponseEntity.ok().header("Content-Type", "application/json").body(ques);
    }

    @PostMapping("/submit_for_eval")
    public ResponseEntity<Object> submit_for_eval(eval_data eval){
        if(exam.submit_for_eval(eval)){
            return ResponseEntity.ok().header("Content-Type", "application/json").body("Success");
        }
        return ResponseEntity.badRequest().header("Content-Type", "application/json").body("Failure while submitting for evaluation");
    }
}
