package com.exercise.city.service;

import com.exercise.city.domain.News;
import com.exercise.city.service.dto.NewsDTO;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing {@link com.exercise.city.domain.News}.
 */
public interface NewsService {

    /**
     * Save a news.
     *
     * @param newsDTO the entity to save.
     * @return the persisted entity.
     */
    NewsDTO save(NewsDTO newsDTO);

    /**
     * Get all the news.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    Page<NewsDTO> findAll(Pageable pageable);


    /**
     * Get the "id" news.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<NewsDTO> findOne(String id);

    /**
     * Delete the "id" news.
     *
     * @param id the id of the entity.
     */
    void delete(String id);

    /**
     * Get all cities "cityId"
     *
     * @param cityId The id of the city to be filtered
     * @return
     */
    Page<NewsDTO> findAllByCityId(final String cityId, Pageable pageable);
}
