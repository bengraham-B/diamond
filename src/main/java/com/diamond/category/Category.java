package com.diamond.category;

import java.util.UUID;

public class Category {
    private UUID id;
    private String name;
    private String details;
    private UUID account_id;

    public Category(String name, String details, UUID account_id) {
        this.name = name;
        this.details = details;
        this.account_id = account_id;
    }

    public UUID getId() {
        return id;
    }

    public void setId(UUID id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDetails() {
        return details;
    }

    public void setDetails(String details) {
        this.details = details;
    }

    public UUID getAccount_id() {
        return account_id;
    }

    public void setAccount_id(UUID account_id) {
        this.account_id = account_id;
    }
}
