package com.exercise.city.service;

import com.exercise.city.CityNewsAndWeatherApp;
import com.exercise.city.domain.City;
import com.exercise.city.repository.CityRepository;
import org.junit.jupiter.api.BeforeEach;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.time.ZonedDateTime;

/**
 * Integration tests for {@link UserService}.
 */
@SpringBootTest(classes = CityNewsAndWeatherApp.class)
public class CityServiceIT {

    private static final ZonedDateTime UPDATED_REGISTERED = ZonedDateTime.now();
    @Autowired
    private CityRepository cityRepository;
    @Autowired
    private CityService cityService;

    private City city;

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
}
