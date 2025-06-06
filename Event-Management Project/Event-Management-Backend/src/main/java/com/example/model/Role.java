package com.example.model;

public enum Role {
	ADMIN(1),
    USER(0);

    private final int value;

    Role(int value) {
        this.value = value;
    }

    public int getValue() {
        return value;
    }

}
