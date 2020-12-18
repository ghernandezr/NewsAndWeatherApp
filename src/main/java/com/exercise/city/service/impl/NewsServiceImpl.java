package com.exercise.city.service.impl;

import com.exercise.city.service.NewsService;
import com.exercise.city.domain.News;
import com.exercise.city.repository.NewsRepository;
import com.exercise.city.service.dto.NewsDTO;
import com.exercise.city.service.mapper.NewsMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.Optional;

/**
 * Service Implementation for managing {@link News}.
 */
@Service
public class NewsServiceImpl implements NewsService {

    private final Logger log = LoggerFactory.getLogger(NewsServiceImpl.class);

    private final NewsRepository newsRepository;

    private final NewsMapper newsMapper;

    public NewsServiceImpl(NewsRepository newsRepository, NewsMapper newsMapper) {
        this.newsRepository = newsRepository;
        this.newsMapper = newsMapper;
    }

    /**
     * Save a news.
     *
     * @param newsDTO the entity to save.
     * @return the persisted entity.
     */
    @Override
    public NewsDTO save(NewsDTO newsDTO) {
        log.debug("Request to save News : {}", newsDTO);
        News news = newsMapper.toEntity(newsDTO);
        news = newsRepository.save(news);
        return newsMapper.toDto(news);
    }

    /**
     * Get all the news.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    @Override
    public Page<NewsDTO> findAll(Pageable pageable) {
        log.debug("Request to get all News");
        return newsRepository.findAll(pageable)
            .map(newsMapper::toDto);
    }


    /**
     * Get one news by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Override
    public Optional<NewsDTO> findOne(String id) {
        log.debug("Request to get News : {}", id);
        return newsRepository.findById(id)
            .map(newsMapper::toDto);
    }

    /**
     * Delete the news by id.
     *
     * @param id the id of the entity.
     */
    @Override
    public void delete(String id) {
        log.debug("Request to delete News : {}", id);
        newsRepository.deleteById(id);
    }
}
