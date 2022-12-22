package com.example.student.dao;

import com.example.student.service.student_intf;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.Statement;

public class studentDAO {
    public String create_generate_id(student_intf st){
        st.exam_id = "IIITB"+"-"+st.roll_number;

        String query = "insert into Student (exam_id, roll_number, name, email, username, password, phone) values ('"+st.exam_id+"','"+st.roll_number+"','"+st.name+"','"+st.email+"','"+st.uname+"','"+st.passwd+"','"+st.phone+"')";
        System.out.println(query);

        try{
            Class.forName("com.mysql.cj.jdbc.Driver");
            Connection con= DriverManager.getConnection("jdbc:mysql://0.tcp.in.ngrok.io:19208/  final_project?createDatabaseIfNotExist=true","root","password");
            Statement stmt=con.createStatement();
            int rs=stmt.executeUpdate(query);
        } catch (Exception e){
            return "";
        }

        return st.exam_id;
    }

    public boolean validate(String email, String phone, String pass, boolean e)
    {
        String q="";
        if(e){
            q = "SELECT password from Student where email='"+email+"'";
        } else {
            q = "SELECT password from Student where phone='"+phone+"'";
        }

        System.out.println(q);
        try{
            Class.forName("com.mysql.cj.jdbc.Driver");
            Connection con=DriverManager.getConnection("jdbc:mysql://0.tcp.in.ngrok.io:19208/final_project","root","password");
            Statement stmt=con.createStatement();
            ResultSet rs=stmt.executeQuery(q);

            while (rs.next()){
                String passwd = rs.getString("password");
                System.out.println(passwd + " "+pass);
                if(passwd.equals(pass)){
                    return true;
                }
            }
        } catch (Exception err){
            System.out.println(err);
        }

        return false;
    }
}
