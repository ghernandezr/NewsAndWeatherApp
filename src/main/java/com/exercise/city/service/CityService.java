package com.exercise.city.service;

import com.exercise.city.domain.City;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing {@link City}.
 */
public interface CityService {

    /**
     * Save a city.
     *
     * @param city the entity to save.
     * @return the persisted entity.
     */
    City save(City city);

    /**
     * Get all the cities.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    Page<City> findAll(Pageable pageable);


    /**
     * Get all the cities.
     *
     * @return the list of entities.
     */
    List<City> findAll();


    /**
     * Get the "id" city.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<City> findOne(String id);

    /**
     * Delete the "id" city.
     *
     * @param id the id of the entity.
     */
    void delete(String id);
}
