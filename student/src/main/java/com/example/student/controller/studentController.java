package com.example.student.controller;

import com.example.student.service.student_factory;
import com.example.student.service.student_iiitb;

import jakarta.ws.rs.*;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.student.service.student_intf;

class response {
    String message;
    String status;

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    @Override
    public String toString() {
        return "Response{" +
                "status=" + status +
                ", message='" + message + '\'' +
                '}';
    }
}

@CrossOrigin
@RestController
@RequestMapping(value = "/student")
public class studentController {
    student_factory stdFactory;

    public studentController(){
        this.stdFactory = new student_factory();
    }

    @PostMapping ("/register")
    public ResponseEntity<Object> authorize_student(@RequestBody student_iiitb s){
        // Validate email
        if(!s.validate_email()){
            return ResponseEntity.badRequest().header("Content-Type", "application/json").body("Email is not valid");
        }

        // Validate phone
        if(!s.validate_phone()){
            return ResponseEntity.badRequest().header("Content-Type", "application/json").body("Phone number is not valid");
        }

        // Generate exam ID
        String std_id = s.generate_id();
        response res = new response();
        if(std_id=="") {
            res.setStatus("Failure");
            ResponseEntity.badRequest().body(res);
        }
        res.setStatus("Success");
        res.setMessage(std_id);
        return ResponseEntity.ok().header("Content-Type", "application/json")
                .body(res);
    }

    @PostMapping("/login")
    public ResponseEntity<Object> authenticate_student(@RequestBody student_iiitb s){
        boolean flag;
        response res = new response();

        if((s.email== null && s.phone==null) || (s.email== "" && s.phone=="")){
            res.setStatus("Failure");
            return ResponseEntity.badRequest().header("Content-Type", "application/json").body(res);
        }

        if(s.email!=null && s.email!=""){
            flag = true;
        } else if(s.phone!=null && s.phone!="") {
            flag = false;
        } else {
            res.setStatus("Failure");
            return ResponseEntity.badRequest().header("Content-Type", "application/json").body(res);
        }


        if(s.validate(flag)){
            res.setStatus("Success");
            res.setMessage("Authentication Successful");
            return ResponseEntity.ok().header("Content-Type", "application/json").body(res);
        }
        res.setStatus("Failure");
        return ResponseEntity.badRequest().header("Content-Type", "application/json").body(res);
    }
}
