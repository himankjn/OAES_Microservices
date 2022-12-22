package com.example.examination.dao;

import com.example.examination.service.question;
import com.example.examination.service.test;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.Statement;
import java.util.ArrayList;

public class examinationDAO {
    public ArrayList<test> get_list_tests() {
        ResultSet rs=null;
        try{
            Class.forName("com.mysql.cj.jdbc.Driver");
            Connection con= DriverManager.getConnection("jdbc:mysql://0.tcp.in.ngrok.io:19208/final_project","root","password");

            Statement stmt = con.createStatement();
            rs = stmt.executeQuery("SELECT * FROM tests");
        } catch (Exception err){
            System.out.println("Error while connecting with SQL server to get the list of tests "+err);
        }

        System.out.println("  id    course      date     status");
        ArrayList<test> tests=new ArrayList<>();
        try{
            if(rs!=null){
                while (rs.next()) {
                    int id = rs.getInt("id");
                    String course = rs.getString("course");
                    String date = rs.getString("date");
                    String status=rs.getString("status");

                    test t = new test(id, course, date, status);
                    tests.add(t);
                }
            } else {
                System.out.println("No active tests to display");
            }
        } catch (Exception err){
            System.out.println("Error while getting list of tests "+err);
        }

        return tests;
    }
    public ArrayList<question> get_questions(String testid) {

        ResultSet rs = null;

        try {
            Class.forName("com.mysql.cj.jdbc.Driver");
            Connection con = DriverManager.getConnection("jdbc:mysql://0.tcp.in.ngrok.io:19208/final_project","root","password");
            Statement stmt = con.createStatement();
            System.out.println(testid);
            rs = stmt.executeQuery("SELECT * FROM question_bank where test_id=" + testid);
        } catch (Exception e) {
            System.out.println("Error while connecting with SQL server to get the list of questions " + e);
            return null;
        }

        ArrayList<question> Ques = new ArrayList<>();
        try {
            while (rs.next()) {
                int id = rs.getInt("id");
                String question = rs.getString("statement");
                String marks = rs.getString("marks");
                String a = rs.getString("option A");
                String b = rs.getString("option B");
                String c = rs.getString("option C");
                String d = rs.getString("option D");

                question q = new question(id, question, marks, a, b, c, d);
                Ques.add(q);
            }
        } catch (Exception err) {
            System.out.println("Error while getting questions " + err);
            return null;
        }

        return Ques;
    }
}
