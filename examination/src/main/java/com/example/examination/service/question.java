package com.example.examination.service;

public class question {
    int id;
    String statement;
    String marks;
    String opt_a;
    String opt_b;
    String opt_c;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getStatement() {
        return statement;
    }

    public void setStatement(String statement) {
        this.statement = statement;
    }

    public String getMarks() {
        return marks;
    }

    public void setMarks(String marks) {
        this.marks = marks;
    }

    public String getOpt_a() {
        return opt_a;
    }

    public void setOpt_a(String opt_a) {
        this.opt_a = opt_a;
    }

    public String getOpt_b() {
        return opt_b;
    }

    public void setOpt_b(String opt_b) {
        this.opt_b = opt_b;
    }

    public String getOpt_c() {
        return opt_c;
    }

    public void setOpt_c(String opt_c) {
        this.opt_c = opt_c;
    }

    public String getOpt_d() {
        return opt_d;
    }

    public void setOpt_d(String opt_d) {
        this.opt_d = opt_d;
    }

    String opt_d;

    public question(int id, String statement, String marks, String opt_a, String opt_b, String opt_c, String opt_d) {
        this.id = id;
        this.statement = statement;
        this.marks = marks;
        this.opt_a = opt_a;
        this.opt_b = opt_b;
        this.opt_c = opt_c;
        this.opt_d = opt_d;
    }
}
