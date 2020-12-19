package com.exercise.city.service;

import com.exercise.city.CityNewsAndWeatherApp;
import com.exercise.city.domain.City;
import com.exercise.city.repository.CityRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.time.ZonedDateTime;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;

/**
 * Integration tests for {@link UserService}.
 */
@SpringBootTest(classes = CityNewsAndWeatherApp.class)
public class CityServiceIT {

    private static final ZonedDateTime UPDATED_REGISTERED = ZonedDateTime.now();
    private static final String DEFAULT_NAME = "Munich";
    @Autowired
    private CityRepository cityRepository;
    @Autowired
    private CityService cityService;

    private City city;

    public static City createEntity() {
        City city = new City()
            .name(DEFAULT_NAME)
            .countryCode("DE");

        return city;
    }

    @BeforeEach
    public void init() {
        cityRepository.deleteAll();
        city = new City();
        city.countryCode("CU")
            .name("Habana");
        city.setRegistered(UPDATED_REGISTERED);
        city.setUpdated(UPDATED_REGISTERED);
        cityService.save(city);
        city = new City();
        city.countryCode("DO")
            .name("Santo");
        city.setRegistered(UPDATED_REGISTERED);
        city.setUpdated(UPDATED_REGISTERED);
        cityService.save(city);

    }

    @Test
    public void assertThatCityNoEmpty() {
        int databaseSizeBeforeCreate = cityService.findAll().size();
        List<City> cityList = cityService.findAll();
        assertThat(cityList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    public void assertThatCityCreate() {
        int databaseSizeBeforeCreate = cityService.findAll().size();
        city = createEntity();
        cityService.save(city);
        List<City> cityList = cityService.findAll();
        assertThat(cityList).hasSize(databaseSizeBeforeCreate + 1);
    }
}
