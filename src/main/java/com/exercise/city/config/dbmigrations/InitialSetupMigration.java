package com.exercise.city.config.dbmigrations;

import com.exercise.city.domain.*;
import com.exercise.city.security.AuthoritiesConstants;
import com.github.mongobee.changeset.ChangeLog;
import com.github.mongobee.changeset.ChangeSet;
import com.google.gson.*;
import org.apache.logging.log4j.LogManager;
import org.springframework.core.io.ClassPathResource;
import org.springframework.data.mongodb.core.MongoTemplate;

import java.io.IOException;
import java.io.InputStreamReader;
import java.time.Instant;
import java.time.LocalDate;
import java.time.ZonedDateTime;
import java.util.Objects;
import java.util.function.Consumer;

/**
 * Creates the initial database setup.
 */
@ChangeLog(order = "001")
public class InitialSetupMigration {

    @ChangeSet(order = "01", author = "initiator", id = "01-addAuthorities")
    public void addAuthorities(MongoTemplate mongoTemplate) {
        Authority adminAuthority = new Authority();
        adminAuthority.setName(AuthoritiesConstants.ADMIN);
        Authority userAuthority = new Authority();
        userAuthority.setName(AuthoritiesConstants.USER);
        Authority visitorAuthority = new Authority();
        visitorAuthority.setName(AuthoritiesConstants.ANONYMOUS);
        mongoTemplate.save(adminAuthority);
        mongoTemplate.save(userAuthority);
    }

    @ChangeSet(order = "02", author = "initiator", id = "02-addUsers")
    public void addUsers(MongoTemplate mongoTemplate) {
        Authority adminAuthority = new Authority();
        adminAuthority.setName(AuthoritiesConstants.ADMIN);
        Authority userAuthority = new Authority();
        userAuthority.setName(AuthoritiesConstants.USER);

        Authority visitorAuthority = new Authority();
        visitorAuthority.setName(AuthoritiesConstants.ANONYMOUS);


        User anonymousUser = new User();
        anonymousUser.setId("user-1");
        anonymousUser.setLogin("anonymoususer");
        anonymousUser.setPassword("$2a$10$j8S5d7Sr7.8VTOYNviDPOeWX8KcYILUVJBsYV83Y5NtECayypx9lO");
        anonymousUser.setFirstName("Anonymous");
        anonymousUser.setLastName("User");
        anonymousUser.setEmail("anonymous@localhost.com");
        anonymousUser.setActivated(true);
        anonymousUser.setLangKey("es");
        anonymousUser.setCreatedBy("adminDausbel");
        anonymousUser.setCreatedDate(Instant.now());
        anonymousUser.getAuthorities().add(visitorAuthority);
        mongoTemplate.save(anonymousUser);

        User visitor = new User();
        visitor.setId("user-3");
        visitor.setLogin("visitor");
        visitor.setPassword("$2a$10$eGAiqNOa2iq6UGNElgJblOKvuQD5GK4HEZnbVRplfyezkegRkvGXy");
        visitor.setFirstName("Visitor");
        visitor.setLastName("User");
        visitor.setEmail("visitor@localhost.com");
        visitor.setActivated(true);
        visitor.setLangKey("es");
        visitor.setCreatedBy("adminDausbel");
        visitor.setCreatedDate(Instant.now());
        visitor.getAuthorities().add(visitorAuthority);
        mongoTemplate.save(visitor);

        User adminUser = new User();
        adminUser.setId("user-2");
        adminUser.setLogin("admin");
        adminUser.setPassword("$2a$10$gSAhZrxMllrbgj/kkK9UceBPpChGWJA7SYIb1Mqo.n5aNLq1/oRrC");
        adminUser.setFirstName("admin");
        adminUser.setLastName("Administrator");
        adminUser.setEmail("admin@localhost.com");
        adminUser.setActivated(true);
        adminUser.setLangKey("es");
        adminUser.setCreatedBy("adminDausbel");
        adminUser.setCreatedDate(Instant.now());
        adminUser.getAuthorities().add(adminAuthority);
        adminUser.getAuthorities().add(userAuthority);
        mongoTemplate.save(adminUser);
    }

    @ChangeSet(order = "03", author = "initiator", id = "03-addCities")
    public void addDefaultCities(MongoTemplate repository) {
        try {
            executeSeedingFromJson("seeding/city.json", elem -> {
                JsonObject seedEntry = elem.getAsJsonObject();
                City cities = new City();
                cities.setName(seedEntry.get("name").getAsString());
                if (!Objects.isNull(seedEntry.get("_id"))) {
                    cities.setId(seedEntry.get("_id").getAsString());
                }
                cities.setCountryCode(seedEntry.get("countryCode").getAsString());
                cities.setRegistered(ZonedDateTime.now());
                cities.setUpdated(ZonedDateTime.now());
                repository.save(cities);
            });
        } catch (IOException ex) {
            LogManager.getLogger(InitialSetupMigration.class).error("Default cities seeding fail", ex);
        }
    }

    @ChangeSet(order = "04", author = "initiator", id = "04-addAuthor")
    public void addDefaultAuthor(MongoTemplate repository) {
        try {
            executeSeedingFromJson("seeding/author.json", elem -> {
                JsonObject seedEntry = elem.getAsJsonObject();
                Author author = new Author();
                author.setName(seedEntry.get("name").getAsString());
                if (!Objects.isNull(seedEntry.get("_id"))) {
                    author.setId(seedEntry.get("_id").getAsString());
                }
                author.setEmail(seedEntry.get("email").getAsString());
                author.setPhone(seedEntry.get("phone").getAsString());
                author.setRegistered(ZonedDateTime.now());
                author.setUpdated(ZonedDateTime.now());
                repository.save(author);
            });
        } catch (IOException ex) {
            LogManager.getLogger(InitialSetupMigration.class).error("Default author seeding fail", ex);
        }
    }

    @ChangeSet(order = "05", author = "initiator", id = "05-addNews")
    public void addDefaultNews(MongoTemplate repository) {
        try {
            executeSeedingFromJson("seeding/news.json", elem -> {
                JsonObject seedEntry = elem.getAsJsonObject();
                News news = new News();
                news.setAuthorId(seedEntry.get("authorId").getAsString());
                news.setAuthorName(seedEntry.get("author_name").getAsString());
                if (!Objects.isNull(seedEntry.get("_id"))) {
                    news.setId(seedEntry.get("_id").getAsString());
                }
                news.setTitle(seedEntry.get("title").getAsString());
                news.setDescription(seedEntry.get("description").getAsString());
                news.setCityId(seedEntry.get("cityId").getAsString());
                news.setCreateAt(LocalDate.now());
                news.setRegistered(ZonedDateTime.now());
                news.setUpdated(ZonedDateTime.now());
                repository.save(news);
            });
        } catch (IOException ex) {
            LogManager.getLogger(InitialSetupMigration.class).error("Default news seeding fail", ex);
        }
    }

    private void executeSeedingFromJson(String jsonPath, Consumer<JsonElement> seedingAction) throws IOException {
        ClassPathResource cpr = new ClassPathResource(jsonPath);

        Gson gson = new GsonBuilder()
            .disableHtmlEscaping()
            .create();
        JsonElement je = gson.fromJson(new InputStreamReader(cpr.getInputStream()), JsonElement.class);
        JsonArray data = je.getAsJsonObject().get("data").getAsJsonArray();
        data.forEach(seedingAction);
    }
}
