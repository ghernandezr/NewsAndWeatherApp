package com.exercise.city.repository;

import com.exercise.city.domain.News;

import org.springframework.data.mongodb.repository.Query;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Spring Data MongoDB repository for the News entity.
 */
@SuppressWarnings("unused")
@Repository
public interface NewsRepository extends MongoRepository<News, String> {


    List<News> findAllByCityId(final String cityId);
}
