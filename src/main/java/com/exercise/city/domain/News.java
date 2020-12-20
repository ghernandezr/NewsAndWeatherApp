package com.exercise.city.domain;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

import java.io.Serializable;
import java.time.LocalDate;
import java.time.ZonedDateTime;

/**
 * A News.
 */
@Document(collection = "news")
public class News implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    private String id;

    @Field("author_id")
    private String authorId;

    @Field("title")
    private String title;

    @Field("description")
    private String description;

    @Field("city_id")
    private String cityId;

    @Field("author_name")
    private String authorName;

    private boolean owner;

    @Field("create_at")
    private LocalDate createAt;

    @Field("updated")
    private ZonedDateTime updated;

    @Field("registered")
    private ZonedDateTime registered;

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getAuthorId() {
        return authorId;
    }

    public void setAuthorId(String authorId) {
        this.authorId = authorId;
    }

    public News authorId(String authorId) {
        this.authorId = authorId;
        return this;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public News title(String title) {
        this.title = title;
        return this;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public News description(String description) {
        this.description = description;
        return this;
    }

    public String getCityId() {
        return cityId;
    }

    public void setCityId(String cityId) {
        this.cityId = cityId;
    }

    public News cityId(String cityId) {
        this.cityId = cityId;
        return this;
    }

    public LocalDate getCreateAt() {
        return createAt;
    }

    public void setCreateAt(LocalDate createAt) {
        this.createAt = createAt;
    }

    public News createAt(LocalDate createAt) {
        this.createAt = createAt;
        return this;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here


    public boolean isOwner() {
        return owner;
    }

    public void setOwner(boolean owner) {
        this.owner = owner;
    }

    public News owner(boolean owner) {
        this.owner = owner;
        return this;
    }

    public String getAuthorName() {
        return authorName;
    }

    public void setAuthorName(String authorName) {
        this.authorName = authorName;
    }

    public News authorName(String authorName) {
        this.authorName = authorName;
        return this;
    }

    public ZonedDateTime getUpdated() {
        return updated;
    }

    public void setUpdated(ZonedDateTime updated) {
        this.updated = updated;
    }

    public News updated(ZonedDateTime updated) {
        this.updated = updated;
        return this;
    }

    public ZonedDateTime getRegistered() {
        return registered;
    }

    public void setRegistered(ZonedDateTime registered) {
        this.registered = registered;
    }

    public News registered(ZonedDateTime registered) {
        this.registered = registered;
        return this;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof News)) {
            return false;
        }
        return id != null && id.equals(((News) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "News{" +
            "id=" + getId() +
            ", authorId='" + getAuthorId() + "'" +
            ", title='" + getTitle() + "'" +
            ", description='" + getDescription() + "'" +
            ", cityId='" + getCityId() + "'" +
            ", createAt='" + getCreateAt() + "'" +
            "}";
    }
}
