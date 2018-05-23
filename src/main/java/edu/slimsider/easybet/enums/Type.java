package edu.slimsider.easybet.enums;

public enum Type {
    UNDER_OVER("UNDER_OVER"),
    FINAL_TIME("FINAL_TIME"),
    HALF_TIME("HALF_TIME");

    private String value;

    Type(String s) {
        this.value = s;
    }

    public String getValue() {
        return this.value;
    }
}
