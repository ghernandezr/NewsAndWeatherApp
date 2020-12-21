package com.exercise.city.service.impl;

import com.exercise.city.domain.News;
import com.exercise.city.domain.User;
import com.exercise.city.repository.NewsRepository;
import com.exercise.city.service.NewsService;
import com.exercise.city.service.UserService;
import com.exercise.city.service.dto.NewsDTO;
import com.exercise.city.service.mapper.NewsMapper;
import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import java.util.stream.Collectors;

/**
 * Service Implementation for managing {@link News}.
 */
@Service
public class NewsServiceImpl implements NewsService {

    private final Logger log = LoggerFactory.getLogger(NewsServiceImpl.class);

    private final NewsRepository newsRepository;

    private final UserService userService;

    private final NewsMapper newsMapper;

    public NewsServiceImpl(NewsRepository newsRepository, UserService userService, NewsMapper newsMapper) {
        this.newsRepository = newsRepository;
        this.userService = userService;
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
//        news = newsRepository.save(settingNewsAuthorName(news));
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
            .map(this::settingNewsOwner)
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
            .map(this::settingNewsOwner)
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

    /**
     * Get all the news by cityId
     *
     * @param cityId The id of the city to be filtered
     * @return
     */
    @Override
    public Page<NewsDTO> findAllByCityId(String cityId, Pageable pageable) {
        log.debug("Request to get all  News : {}", cityId);
        List<NewsDTO> newsDTOList = newsRepository.findAllByCityId(cityId, pageable)
            .stream()
            .map(this::settingNewsOwner)
            .map(newsMapper::toDto)
            .collect(Collectors.toList());
        return new PageImpl<>(newsDTOList, pageable, newsDTOList.size());
    }

    private News settingNewsOwner(News news) {
        return Optional.of(news)
            .filter(news1 -> Objects.nonNull(news1.getAuthorId()))
            .map(news1 -> {
                User user = userService.getCurrenUser();
                if (Objects.nonNull(user) && Objects.nonNull(user.getId()) && StringUtils.equalsIgnoreCase(user.getId(), news1.getAuthorId()))
                    return news1.owner(true);
                else
                    return news1.owner(false);
            })
            .orElse(news);

    }
}
