package com.exercise.city.service.mapper;


import com.exercise.city.domain.*;
import com.exercise.city.service.dto.NewsDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity {@link News} and its DTO {@link NewsDTO}.
 */
@Mapper(componentModel = "spring", uses = {})
public interface NewsMapper extends EntityMapper<NewsDTO, News> {



    default News fromId(String id) {
        if (id == null) {
            return null;
        }
        News news = new News();
        news.setId(id);
        return news;
    }
}
