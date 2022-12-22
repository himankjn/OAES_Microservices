package com.example.student.service;

public abstract class student_intf {
    public String exam_id;
    public String name;
    public String email;
    public String uname;
    public String passwd;
    public String phone;
    public String roll_number;

    public boolean validate_email()
    {
        String regex = "^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$";

        //Matching the give email number with regular expression
        boolean result = this.email.matches(regex);
        if(result) {
            return true;
        }

        return false;
    }

    public boolean validate_phone()
    {
        String regex = "^\\d{10}$";

        //Matching the given phone number with regular expression
        boolean result = this.phone.matches(regex);
        if(result) {
            return true;
        }

        return false;
    }

    abstract public String generate_id();
    abstract public boolean validate(boolean e);
}
