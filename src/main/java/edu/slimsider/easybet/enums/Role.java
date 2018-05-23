package edu.slimsider.easybet.enums;

public enum Role {
    PLAYER("PLAYER"),
    MANAGER("MANAGER"),
    ADMIN("ADMIN");

    private String value;

    Role(String s) {
        this.value = s;
    }

    public String getValue() {
        return this.value;
    }
}
